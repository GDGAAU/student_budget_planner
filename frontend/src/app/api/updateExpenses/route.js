import prisma from '../../lib/prisma.js';

export async function PUT(req) {
  try {
    const body = await req.json();
    const { expenseId, amount, categoryId } = body;

    // Input validation
    if (!expenseId) {
      return new Response(JSON.stringify({ error: 'expenseId is required.' }), {
        status: 400,
      });
    }

    if (amount !== undefined && typeof amount !== 'number') {
      return new Response(
        JSON.stringify({ error: 'Amount must be a number.' }),
        {
          status: 400,
        },
      );
    }

    if (categoryId !== undefined && typeof categoryId !== 'number') {
      return new Response(
        JSON.stringify({ error: 'categoryId must be a number.' }),
        {
          status: 400,
        },
      );
    }

    // Check if the expense exists
    const existingExpense = await prisma.expense.findUnique({
      where: { id: expenseId },
    });

    if (!existingExpense) {
      return new Response(JSON.stringify({ error: 'Expense not found.' }), {
        status: 404,
      });
    }

    // Check if the new category exists (if categoryId is provided)
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        return new Response(JSON.stringify({ error: 'Category not found.' }), {
          status: 404,
        });
      }
    }

    const oldAmount = existingExpense.amount;

    // Update the expense
    const updatedExpense = await prisma.expense.update({
      where: { id: expenseId },
      data: {
        amount: amount !== undefined ? amount : existingExpense.amount,
        categoryId:
          categoryId !== undefined ? categoryId : existingExpense.categoryId,
        date: new Date(),
      },
    });

    // Update the user's budget
    const user = await prisma.user.findUnique({ where: { id: 1 } });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found.' }), {
        status: 404,
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: 1 },
      data: {
        budget: user.budget - oldAmount + (amount || oldAmount),
      },
    });

    return new Response(
      JSON.stringify({
        message: 'Expense updated successfully',
        expense: updatedExpense,
        updatedBudget: updatedUser.budget,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating expense:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

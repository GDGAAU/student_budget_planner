import prisma from '../../lib/prisma.js';

export async function POST(req) {
  try {
    const body = await req.json();
    const { categoryId, amount } = body;

    // Input validation
    if (!categoryId || typeof amount !== 'number') {
      return new Response(JSON.stringify({ error: 'Invalid input data.' }), {
        status: 400,
      });
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { id: 1 } });
    if (!user)
      return new Response(JSON.stringify({ error: 'User not found.' }), {
        status: 404,
      });

    // Check if the category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category)
      return new Response(JSON.stringify({ error: 'Category not found.' }), {
        status: 404,
      });

    // Check if the user has sufficient budget
    if (user.budget + amount < 0) {
      return new Response(JSON.stringify({ error: 'Insufficient budget.' }), {
        status: 400,
      });
    }

    // Create the expense
    const newExpense = await prisma.expense.create({
      data: { amount, categoryId, userId: 1 },
    });

    // Update the user's budget
    const updatedUser = await prisma.user.update({
      where: { id: 1 },
      data: { budget: user.budget + amount },
    });

    return new Response(
      JSON.stringify({
        message: 'Expense created successfully',
        expense: newExpense,
        updatedBudget: updatedUser.budget,
      }),
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating expense:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

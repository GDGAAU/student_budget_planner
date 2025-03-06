import prisma from '../lib/prisma.js';

/**
 * Create a new expense.
 * @param {number} userId - The ID of the user creating the expense.
 * @param {number} categoryId - The ID of the category for the expense.
 * @param {number} amount - The amount of the expense.
 * @returns {Promise<Object>} - The created expense object or an error message.
 */
export const createExpense = async (userId, categoryId, amount) => {
  // Input validation
  if (!userId || !categoryId || !amount) {
    throw new Error('userId, categoryId, and amount are required.');
  }

  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error('Amount must be a positive number.');
  }

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    // Check if the category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error('Category not found.');
    }

    // Create the expense
    const newExpense = await prisma.expense.create({
      data: {
        amount,
        categoryId,
        userId,
        // `date` is automatically set to `now()` by Prisma (default value in schema)
      },
    });

    console.log('Expense created successfully:', newExpense);
    return newExpense;
  } catch (error) {
    console.error('Error creating expense:', error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

/**
 * Update an existing expense.
 * @param {number} expenseId - The ID of the expense to update.
 * @param {number} [amount] - The new amount of the expense (optional).
 * @param {number} [categoryId] - The new category ID of the expense (optional).
 * @returns {Promise<Object>} - The updated expense object or an error message.
 */
export const updateExpense = async (expenseId, amount, categoryId) => {
  // Input validation
  if (!expenseId) {
    throw new Error('expenseId is required.');
  }

  if (amount && (typeof amount !== 'number' || amount <= 0)) {
    throw new Error('Amount must be a positive number.');
  }

  if (categoryId && typeof categoryId !== 'number') {
    throw new Error('categoryId must be a number.');
  }

  try {
    // Check if the expense exists
    const existingExpense = await prisma.expense.findUnique({
      where: { id: expenseId },
    });

    if (!existingExpense) {
      throw new Error('Expense not found.');
    }

    // Check if the new category exists (if categoryId is provided)
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        throw new Error('Category not found.');
      }
    }

    // Update the expense
    const updatedExpense = await prisma.expense.update({
      where: { id: expenseId },
      data: {
        amount: amount !== undefined ? amount : existingExpense.amount,
        categoryId:
          categoryId !== undefined ? categoryId : existingExpense.categoryId,
      },
    });

    console.log('Expense updated successfully:', updatedExpense);
    return updatedExpense;
  } catch (error) {
    console.error('Error updating expense:', error.message);
    throw error; // Re-throw the error for the caller to handle
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
};

export const deleteExpense = async (id) => {
  if (!id) {
    throw new Error('id is required');
  }
  try {
    const expense = await prisma.expense.delete({
      where: { id },
    });
    console.log('Expense deleted successfully', expense);
  } catch (error) {
    console.error('Error deleting expense');
  }
};

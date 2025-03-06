import prisma from '../lib/prisma.js';

/**
 * Create a new plan.
 * @param {number} userId - The ID of the user creating the plan.
 * @param {number} categoryId - The ID of the category for the plan.
 * @param {number} amount - The amount of the plan.
 * @param {Date} date - The date of the plan (optional, defaults to current date).
 * @returns {Promise<Object>} - The created plan object or an error message.
 */
const createPlan = async (userId, categoryId, amount, date = new Date()) => {
  // Input validation
  if (!userId || !categoryId || !amount) {
    throw new Error('userId, categoryId, and amount are required.');
  }

  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error('Amount must be a positive number.');
  }

  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date.');
  }

  // Check if the date is in the future
  const currentDate = new Date();
  if (date < currentDate) {
    throw new Error('Date must be in the future.');
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

    // Create the plan
    const newPlan = await prisma.plan.create({
      data: {
        amount,
        categoryId,
        userId,
        date,
      },
    });

    console.log('Plan created successfully:', newPlan);
    return newPlan;
  } catch (error) {
    console.error('Error creating plan:', error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

// Example usage
(async () => {
  try {
    const plan = await createPlan(1, 2, 500.0); // userId: 1, categoryId: 2, amount: 500.0
    console.log('Created Plan:', plan);
  } catch (error) {
    console.error('Failed to create plan:', error.message);
  }
})();

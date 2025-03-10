'use server';
import prisma from '../lib/prisma.js';

/**
 * Create a new plan.
 * @param {number} userId - The ID of the user creating the plan.
 * @param {number} categoryId - The ID of the category for the plan.
 * @param {number} amount - The amount of the plan.
 * @param {Date} date - The date of the plan (optional, defaults to current date).
 * @returns {Promise<Object>} - The created plan object or an error message.
 */
export const createPlan = async (categoryId, amount, date = new Date()) => {
  // Input validation
  if (!categoryId || !amount) {
    throw new Error('userId, categoryId, and amount are required.');
  }

  if (typeof amount !== 'number') {
    throw new Error('Amount must be a number.');
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
      where: { id: 1 },
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
        userId: 1,
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

/**
 * Update an existing plan.
 * @param {number} planId - The ID of the plan to update.
 * @param {number} [amount] - The new amount of the plan (optional).
 * @param {number} [categoryId] - The new category ID of the plan (optional).
 * @param {Date} [date] - The new date of the plan (optional, must be in the future).
 * @returns {Promise<Object>} - The updated plan object or an error message.
 */
export const updatePlan = async (planId, amount, categoryId, date) => {
  // Input validation
  if (!planId) {
    throw new Error('planId is required.');
  }

  if (amount && (typeof amount !== 'number' || amount <= 0)) {
    throw new Error('Amount must be a positive number.');
  }

  if (categoryId && typeof categoryId !== 'number') {
    throw new Error('categoryId must be a number.');
  }

  if (date && (!(date instanceof Date) || isNaN(date.getTime()))) {
    throw new Error('Invalid date.');
  }

  // Check if the date is in the future (if provided)
  if (date) {
    const currentDate = new Date();
    if (date <= currentDate) {
      throw new Error('Date must be in the future.');
    }
  }

  try {
    // Check if the plan exists
    const existingPlan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!existingPlan) {
      throw new Error('Plan not found.');
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

    // Update the plan
    const updatedPlan = await prisma.plan.update({
      where: { id: planId },
      data: {
        amount: amount !== undefined ? amount : existingPlan.amount,
        categoryId:
          categoryId !== undefined ? categoryId : existingPlan.categoryId,
        date: date !== undefined ? date : existingPlan.date,
      },
    });

    console.log('Plan updated successfully:', updatedPlan);
    return updatedPlan;
  } catch (error) {
    console.error('Error updating plan:', error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

/**
 * Delete an existing plan.
 * @param {number} planId - The ID of the plan to delete.
 * @returns {Promise<Object>} - The deleted plan object or an error message.
 */
export const deletePlan = async (planId) => {
  // Input validation
  if (!planId) {
    throw new Error('planId is required.');
  }

  try {
    // Check if the plan exists
    const existingPlan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!existingPlan) {
      throw new Error('Plan not found.');
    }

    // Delete the plan
    const deletedPlan = await prisma.plan.delete({
      where: { id: planId },
    });

    console.log('Plan deleted successfully:', deletedPlan);
    return deletedPlan;
  } catch (error) {
    console.error('Error deleting plan:', error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

/**
 * Fetch all plans for a specific user.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Array<Object>>} - Array of plan objects.
 */
const getPlansByUser = async (userId) => {
  // Input validation
  if (!userId) {
    throw new Error('userId is required.');
  }

  try {
    // Fetch all plans for the user
    const plans = await prisma.plan.findMany({
      where: { userId },
      include: {
        category: true, // Include category details
      },
      orderBy: {
        date: 'asc',
      },
    });

    console.log('Plans fetched successfully:', plans);
    return plans;
  } catch (error) {
    console.error('Error fetching plans:', error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

/**
 * Fetch plans for today.
 * @returns {Promise<Array<Object>>} - Array of plan objects for today.
 */
export const getPlansForToday = async () => {
  try {
    // Get the start and end of the current day
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );

    // Fetch plans for today
    const plans = await prisma.plan.findMany({
      where: {
        date: {
          gte: startOfDay, // Greater than or equal to the start of the day
          lt: endOfDay, // Less than the start of the next day
        },
      },
      include: {
        category: true, // Include category details
      },
    });

    console.log('Plans for today fetched successfully:', plans);
    return plans;
  } catch (error) {
    console.error('Error fetching plans for today:', error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

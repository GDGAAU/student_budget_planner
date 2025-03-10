"use server";
import { selectClasses } from "@mui/material";
import prisma from "../lib/prisma.js";

/**
 * Create a new expense and update the user's budget.
 * @param {number} userId - The ID of the user creating the expense.
 * @param {number} categoryId - The ID of the category for the expense.
 * @param {number} amount - The amount of the expense.
 * @returns {Promise<Object>} - The created expense object or an error message.
 */
export const createExpense = async (userId = 1, categoryId, amount) => {
  // Input validation
  if (!userId || !categoryId || !amount) {
    throw new Error("userId, categoryId, and amount are required.");
  }

  if (typeof amount !== "number") {
    throw new Error("Amount must be a number.");
  }

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    // Check if the category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error("Category not found.");
    }

    // Check if the user has sufficient budget
    if (user.budget + amount < 0) {
      throw new Error("Insufficient budget.");
    }

    // Create the expense
    const newExpense = await prisma.expense.create({
      data: {
        amount,
        categoryId,
        userId,
      },
    });

    // Update the user's budget
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        budget: user.budget + amount, // Subtract the expense amount from the budget
      },
    });

    console.log("Expense created successfully:", newExpense);
    console.log("Updated user budget:", updatedUser.budget);
    return newExpense;
  } catch (error) {
    console.error("Error creating expense:", error.message);
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
    throw new Error("expenseId is required.");
  }

  if (amount && typeof amount !== "number") {
    throw new Error("Amount must be a number.");
  }

  if (categoryId && typeof categoryId !== "number") {
    throw new Error("categoryId must be a number.");
  }

  try {
    // Check if the expense exists
    const existingExpense = await prisma.expense.findUnique({
      where: { id: expenseId },
    });

    if (!existingExpense) {
      throw new Error("Expense not found.");
    }

    // Check if the new category exists (if categoryId is provided)
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        throw new Error("Category not found.");
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
        date: Date.now(),
      },
    });

    // Update the user's budget
    const updatedUser = await prisma.user.update({
      where: { id: 1 },
      data: {
        budget: user.budget - oldAmount + amount, // Subtract the expense amount from the budget
      },
    });

    console.log("Expense updated successfully:", updatedExpense);
    return updatedExpense;
  } catch (error) {
    console.error("Error updating expense:", error.message);
    throw error; // Re-throw the error for the caller to handle
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
};
export const getAllExpenses = async () => {
  try {
    // Fetch all expenses along with category name and the date
    const expenses = await prisma.expense.findMany({
      select: {
        id: true,
        amount: true,
        categoryId: true,
        userId: true,
        date: true, // assuming 'expenseDate' or 'createdAt' is the field for the date
        category: {
          select: {
            name: true, // Assuming 'name' is the column for the category name
          },
        },
      },
    });

    // Map the expenses to include the category name in the result
    const mappedExpenses = expenses.map((expense) => ({
      ...expense,
      category: expense.category.name, // Add category name to the expense data
    }));

    console.log("Expenses fetched successfully:", mappedExpenses);
    return mappedExpenses;
  } catch (error) {
    console.error("Error fetching expenses:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

/**
 * Fetch daily expenses for the current day.
 * @param {Date} now - The current date (optional).
 * @returns {Promise<Array<Object>>} - Array of expense objects for the current day.
 */
export const getDailyExpense = async (now = new Date()) => {
  try {
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );

    // Fetch expenses for the current day
    const expenses = await prisma.expense.findMany({
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

    // Map expenses to a simpler DTO (Data Transfer Object)
    const dto = expenses.map((e) => ({
      category: e.category.name,
      amount: e.amount,
    }));

    console.log("Daily expenses fetched successfully:", dto);
    return dto;
  } catch (error) {
    console.error("Error fetching daily expenses:", error.message);
    throw error; // Re-throw the error for the caller to handle
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
};

export const getMonthlyExpense = async () => {
  try {
    // Get the start and end of the current month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // Fetch expenses for the current month
    const expenses = await prisma.expense.findMany({
      where: {
        date: {
          gte: startOfMonth, // Greater than or equal to the start of the month
          lt: endOfMonth, // Less than the start of the next month
        },
      },
      include: {
        category: true, // Include category details
      },
    });

    // console.log('Monthly expenses fetched successfully:', expenses);
    return expenses;
  } catch (error) {
    console.error("Error fetching monthly expenses:", error.message);
    throw error; // Re-throw the error for the caller to handle
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
};

/**
 * Fetch weekly expenses for the current week.
 * @returns {Promise<Array<Object>>} - Array of expense objects for the current week.
 */
export const getWeeklyExpenses = async () => {
  try {
    // Get the start and end of the current week
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0); // Set to the start of the day
    startOfWeek.setDate(now.getDate() - now.getDay()); // Set to the first day of the week (Sunday)

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7); // Set to the end of the week (next Sunday)

    // Fetch expenses for the current week
    const expenses = await prisma.expense.findMany({
      where: {
        date: {
          gte: startOfWeek, // Greater than or equal to the start of the week
          lt: endOfWeek, // Less than the start of the next week
        },
      },
      select: {
        date: true,
        amount: true,
      },
    });

    // Group expenses by day and sum the amounts
    const expensesByDay = expenses.reduce((acc, expense) => {
      const day = expense.date.toISOString().split("T")[0]; // Extract the date (YYYY-MM-DD)
      if (!acc[day]) {
        acc[day] = 0; // Initialize the day's total amount
      }
      acc[day] += expense.amount; // Add the expense amount to the day's total
      return acc;
    }, {});

    // Convert the grouped data into an array of objects
    const result = Object.entries(expensesByDay).map(([day, amount]) => ({
      day,
      amount,
    }));

    console.log("Weekly expenses fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("Error fetching weekly expenses:", error.message);
    throw error; // Re-throw the error for the caller to handle
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
};

// Example usage
(async () => {
  try {
    const weeklyExpenses = await getWeeklyExpenses();
    console.log("Weekly Expenses:", weeklyExpenses);
  } catch (error) {
    console.error("Failed to fetch weekly expenses:", error.message);
  }
})();

export const deleteExpense = async (id) => {
  if (!id) {
    throw new Error("id is required");
  }
  try {
    const expense = await prisma.expense.delete({
      where: { id },
    });
    console.log("Expense deleted successfully", expense);
  } catch (error) {
    console.error("Error deleting expense");
  }
};

/**
 * Fetches a user's budget and the sum of all their expenses.
 * @param userId - The ID of the user.
 * @returns An object containing the user's budget and the total sum of expenses.
 */
export const getBudgetAndExpenses = async () => {
  try {
    // Fetch the user's budget
    const user = await prisma.user.findFirst({
      select: { budget: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Fetch the sum of all expenses for the user
    const totalExpenses = await prisma.expense.aggregate({
      where: { userId: user.id },
      _sum: { amount: true },
    });

    return {
      budget: user.budget,
      totalExpenses: totalExpenses._sum.amount || 0, // Default to 0 if no expenses exist
    };
  } catch (error) {
    console.error("Error fetching budget and expenses:", error);
    throw error;
  }
};

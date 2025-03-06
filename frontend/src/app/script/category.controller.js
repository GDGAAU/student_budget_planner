'use server';
import prisma from '../lib/prisma.js';

/**
 * Fetch all categories with their IDs and names.
 * @returns {Promise<Array<{ id: number, name: string }>>} - Array of category objects.
 */
export const getAllCategories = async () => {
  try {
    // Fetch all categories
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    console.log('Categories fetched successfully:', categories);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const addCategory = async (name) => {
  if (!name) {
    throw new Error('vategory name is required');
  }
  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });
    console.log('Category Created!', newCategory);
    return newCategory;
  } catch (error) {
    console.log('Error adding category', error);
  }
};

export const deleteCategory = async (id) => {
  if (!id) {
    throw new Error('id is required');
  }
  try {
    const category = await prisma.category.delete({
      where: { id },
    });
    console.log('Category deleted successfully', category);
  } catch (error) {
    console.error('Error deleting category');
  }
};

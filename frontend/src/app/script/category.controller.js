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
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
};

// Example usage
(async () => {
  try {
    const categories = await getAllCategories();
    console.log('All Categories:', categories);
  } catch (error) {
    console.error('Failed to fetch categories:', error.message);
  }
})();

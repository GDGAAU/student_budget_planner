'use server';
import prisma from '../lib/prisma.js';

export const createUser = async (id, fullname, email, budget, password) => {
  try {
    const result = prisma.user.create({
      data: {
        id,
        fullname,
        password,
        email,
        budget,
      },
    });
    console.log('User created successfully', result);
  } catch (error) {
    console.error('Error creating user', error);
  }
};

export const updateUser = async (id, newData) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { budget: newData.budget },
    });
    console.log('User updated successfully', user);
  } catch (error) {
    console.error('Error updating user', error);
  }
};

/**
 * Add badges to a user.
 * @param {number} userId - The ID of the user.
 * @param {string[]} badges - An array of badges to add.
 * @returns {Promise<Object>} - The updated user object.
 */
const addBadgesToUser = async (badges) => {
  try {
    // Fetch the user's current badges
    const user = await prisma.user.findFirst();

    if (!user) {
      throw new Error('User not found.');
    }

    // Parse the existing badges (if any)
    const currentBadges = user.badges ? JSON.parse(user.badges) : [];

    // Merge the existing badges with the new badges
    const updatedBadges = [...new Set([...currentBadges, ...badges])]; // Remove duplicates

    // Update the user's badges
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        badges: JSON.stringify(updatedBadges), // Store as a JSON string
      },
    });

    console.log('Badges added successfully:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error adding badges:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

/**
 * Get a user's badges.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<string[]>} - An array of badges.
 */
const getUserBadges = async () => {
  try {
    const user = await prisma.user.findFirst();

    if (!user) {
      throw new Error('User not found.');
    }

    // Parse the badges JSON string
    const badges = user.badges ? JSON.parse(user.badges) : [];
    console.log('User badges:', badges);
    return badges;
  } catch (error) {
    console.error('Error fetching badges:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

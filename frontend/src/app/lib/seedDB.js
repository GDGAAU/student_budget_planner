import { AsyncCallbackSet } from 'next/dist/server/lib/async-callback-set.js';
import prisma from './prisma.js';

const commonCategories = [
  { name: 'Groceries' },
  { name: 'Utilities' },
  { name: 'Rent' },
  { name: 'Transportation' },
  { name: 'Entertainment' },
  { name: 'Healthcare' },
  { name: 'Savings' },
  { name: 'Miscellaneous' },
  { name: 'Books' },
  { name: 'Print and Handouts' },
];

async function seedCategories() {
  try {
    // Check if categories already exist
    const existingCategories = await prisma.category.findMany();
    if (existingCategories.length > 0) {
      console.log('Categories already seeded.');
      return;
    }

    // Insert common categories
    await prisma.category.createMany({
      data: commonCategories,
    });

    console.log('Common categories seeded successfully.');
  } catch (error) {
    console.error('Error seeding categories:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

const seedUser = async () => {
  try {
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'git.hard@example.com',
        password: 'password',
        budget: 0,
      },
    });
    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

seedCategories();
seedUser();

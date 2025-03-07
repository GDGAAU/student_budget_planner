import { AsyncCallbackSet } from 'next/dist/server/lib/async-callback-set.js';
import prisma from './prisma.js';

const categories = [
  {
    name: 'Groceries',
    icon: 'grocery_icon.png',
    color: '#4CAF50', // Green
  },
  {
    name: 'Utilities',
    icon: 'utilities_icon.png',
    color: '#FF9800', // Orange
  },
  {
    name: 'Books',
    icon: 'books_icon.svg',
    color: '#FF9800', // Orange
  },
  {
    name: 'Transportation',
    icon: 'transportation_icon.svg',
    color: '#9C27B0', // Purple
  },
  {
    name: 'Entertainment',
    icon: 'entertainment_icon.svg',
    color: '#E91E63', // Pink
  },
  {
    name: 'Healthcare',
    icon: 'hospital_icon.png',
    color: '#F44336', // Red
  },
  {
    name: 'Savings',
    icon: 'save-money_icon.png',
    color: '#009688', // Teal
  },
  {
    name: 'Miscellaneous',
    icon: 'category',
    color: '#9E9E9E', // Gray
  },
  {
    name: 'Clothing',
    icon: 'clothes_icon.png',
    color: '#9E9E9E', // Gray
  },
];

async function seedCategories() {
  try {
    // Check existing categories
    const existingCategories = await prisma.category.findMany();
    const existingNames = existingCategories.map((c) => c.name);

    // Create categories in sequence
    for (const category of categories) {
      if (!existingNames.includes(category.name)) {
        await prisma.category.create({
          data: category,
        });
        console.log(`Created category: ${category.name}`);
      }
    }

    console.log('Seeding completed successfully!');
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
        email: 'git.ishard@example.com',
        password: 'password',
        budget: 0,
        badges: '',
      },
    });
    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

seedCategories();
seedUser();

const clear = async () => {
  try {
    const user = await prisma.user.deleteMany();
    const categories = await prisma.category.deleteMany();
    console.log('Deleted users:', user.count);
  } catch (error) {}
};

// clear();

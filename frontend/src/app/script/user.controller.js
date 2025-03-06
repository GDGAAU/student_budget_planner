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

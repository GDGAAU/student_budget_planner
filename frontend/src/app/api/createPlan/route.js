import prisma from '../../lib/prisma.js';

export async function POST(req) {
  try {
    const body = await req.json();
    const { categoryId, amount, date = new Date() } = body;

    // Input validation
    if (!categoryId || !amount) {
      return new Response(
        JSON.stringify({ error: 'categoryId and amount are required.' }),
        {
          status: 400,
        },
      );
    }

    if (typeof amount !== 'number') {
      return new Response(
        JSON.stringify({ error: 'Amount must be a number.' }),
        {
          status: 400,
        },
      );
    }

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return new Response(JSON.stringify({ error: 'Invalid date.' }), {
        status: 400,
      });
    }

    // Check if the date is in the future
    const currentDate = new Date();
    if (date < currentDate) {
      return new Response(
        JSON.stringify({ error: 'Date must be in the future.' }),
        {
          status: 400,
        },
      );
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: 1 },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found.' }), {
        status: 404,
      });
    }

    // Check if the category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return new Response(JSON.stringify({ error: 'Category not found.' }), {
        status: 404,
      });
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

    return new Response(
      JSON.stringify({
        message: 'Plan created successfully',
        plan: newPlan,
      }),
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating plan:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

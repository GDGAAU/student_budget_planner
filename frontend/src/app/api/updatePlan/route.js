import prisma from '../../lib/prisma.js';

export async function POST(req) {
  try {
    const body = await req.json();
    const { planId, amount, categoryId, date } = body;

    // Input validation
    if (!planId) {
      return new Response(JSON.stringify({ error: 'planId is required.' }), {
        status: 400,
      });
    }

    if (amount && (typeof amount !== 'number' || amount <= 0)) {
      return new Response(
        JSON.stringify({ error: 'Amount must be a positive number.' }),
        {
          status: 400,
        },
      );
    }

    if (categoryId && typeof categoryId !== 'number') {
      return new Response(
        JSON.stringify({ error: 'categoryId must be a number.' }),
        {
          status: 400,
        },
      );
    }

    if (date && (!(date instanceof Date) || isNaN(date.getTime()))) {
      return new Response(JSON.stringify({ error: 'Invalid date.' }), {
        status: 400,
      });
    }

    // Check if the date is in the future (if provided)
    if (date) {
      const currentDate = new Date();
      if (date <= currentDate) {
        return new Response(
          JSON.stringify({ error: 'Date must be in the future.' }),
          {
            status: 400,
          },
        );
      }
    }

    // Check if the plan exists
    const existingPlan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!existingPlan) {
      return new Response(JSON.stringify({ error: 'Plan not found.' }), {
        status: 404,
      });
    }

    // Check if the new category exists (if categoryId is provided)
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        return new Response(JSON.stringify({ error: 'Category not found.' }), {
          status: 404,
        });
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

    return new Response(
      JSON.stringify({
        message: 'Plan updated successfully',
        plan: updatedPlan,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating plan:', error.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

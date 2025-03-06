import prisma from '../../lib/prisma.js';

export async function POST(req) {
  try {
    const body = await req.json();
    const { planId } = body;

    // Input validation
    if (!planId) {
      return new Response(JSON.stringify({ error: 'planId is required.' }), {
        status: 400,
      });
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

    // Delete the plan
    const deletedPlan = await prisma.plan.delete({
      where: { id: planId },
    });

    return new Response(
      JSON.stringify({
        message: 'Plan deleted successfully',
        plan: deletedPlan,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting plan:', error.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

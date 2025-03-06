import prisma from '../../lib/prisma.js';

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId } = body;

    // Input validation
    if (!userId) {
      return new Response(JSON.stringify({ error: 'userId is required.' }), {
        status: 400,
      });
    }

    // Fetch all plans for the user
    const plans = await prisma.plan.findMany({
      where: { userId },
      include: {
        category: true, // Include category details
      },
      orderBy: {
        date: 'asc',
      },
    });

    return new Response(
      JSON.stringify({
        message: 'Plans fetched successfully',
        plans: plans,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching plans:', error.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

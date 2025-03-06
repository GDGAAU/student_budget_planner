import prisma from '../../lib/prisma.js';

export async function GET(req) {
  try {
    // Fetch all categories
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return new Response(
      JSON.stringify({
        message: 'Categories fetched successfully',
        categories: categories,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

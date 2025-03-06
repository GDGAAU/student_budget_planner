import prisma from '../../lib/prisma.js';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name } = body;

    // Input validation
    if (!name) {
      return new Response(JSON.stringify({ error: 'Name is required' }), {
        status: 400,
      });
    }

    // Create the new category
    const newCategory = await prisma.category.create({
      data: { name },
    });

    return new Response(
      JSON.stringify({
        message: 'Category Created!',
        category: newCategory,
      }),
      { status: 201 },
    );
  } catch (error) {
    console.error('Error adding category:', error.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

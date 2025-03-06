import prisma from '../../lib/prisma.js';

export async function PUT(req) {
  try {
    const { id, newData } = await req.json();

    // Input validation
    if (!id || !newData || !newData.budget) {
      return new Response(
        JSON.stringify({ error: 'id and budget are required' }),
        { status: 400 },
      );
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { budget: newData.budget },
    });

    return new Response(
      JSON.stringify({
        message: 'User updated successfully',
        user: updatedUser,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating user:', error.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

import prisma from '../../lib/prisma.js';

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    // Input validation
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), {
        status: 400,
      });
    }

    // Delete the category
    const deletedCategory = await prisma.category.delete({
      where: { id },
    });

    return new Response(
      JSON.stringify({
        message: 'Category deleted successfully',
        category: deletedCategory,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting category:', error.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

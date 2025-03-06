import prisma from '../../lib/prisma.js';

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    // Input validation
    if (!id) {
      return new Response(JSON.stringify({ error: 'id is required' }), {
        status: 400,
      });
    }

    // Delete the expense
    const expense = await prisma.expense.delete({
      where: { id },
    });

    return new Response(
      JSON.stringify({
        message: 'Expense deleted successfully',
        expense,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting expense:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

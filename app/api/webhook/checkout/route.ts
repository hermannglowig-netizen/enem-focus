import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log('Webhook AbacatePay recebido:', body);

    if (body.event === 'billing.paid') {
      const userId = body.data?.metadata?.userId;
      console.log(`Pagamento confirmado para o usuário: ${userId}`);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error: any) {
    console.error('Erro no Webhook:', error);
    return NextResponse.json({ error: 'Erro interno no webhook' }, { status: 500 });
  }
}
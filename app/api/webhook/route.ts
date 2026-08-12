import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Log para você visualizar no painel da Vercel quando a AbacatePay avisar que o Pix foi pago
    console.log('Webhook AbacatePay recebido:', body);

    // Aqui você atualizará o status do usuário no banco de dados quando o pagamento for confirmado
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
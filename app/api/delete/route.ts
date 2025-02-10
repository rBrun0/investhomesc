import { NextResponse } from "next/server";

import { admin } from "../../../lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "Email é obrigatório." }, { status: 400 });
    }

    const userRecord = await admin.auth().getUserByEmail(email);
    await admin.auth().deleteUser(userRecord.uid);

    return NextResponse.json({ success: true, message: "Usuário deletado com sucesso." });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}

// 🔹 Bloqueia requisições GET com status 405
export async function GET() {
  return NextResponse.json({ error: "Método não permitido" }, { status: 405 });
}
import { admin } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const {email, password, displayName} = await req.json()

    if (!email || !password ||  !displayName) {
        return NextResponse.json({ success: false, error: "Informações são obrigatórias." }, { status: 400 });
      }

      try {
      const userRecord = await admin.auth().createUser({
        email,
        password: password,
      });
  
      return NextResponse.json({ success: true, message: "Usuário criado com sucesso.", uid: userRecord.uid });
    } catch (error:unknown) {
      return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}
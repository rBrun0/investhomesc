import admin from "firebase-admin";

// Verifica se o admin já foi inicializado
if (!admin.apps.length) {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Corrige a quebra de linha
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export { admin };
import functions = require("firebase-functions");
import admin = require("firebase-admin");
import cors from 'cors';
const corsHandler = cors({ origin: true });

admin.initializeApp();

exports.adicionarAdmin = functions.https.onCall(async (data: any) => {
  const userId = data.userId;

  try {
    await admin.auth().setCustomUserClaims(userId, {admin: true});
    return {message: `Usuário ${userId} agora é admin.`};
  } catch (error) {
    throw new functions.https.HttpsError(
      "internal",
      "Erro ao adicionar a claim 'admin'.",
      error
    );
  }
});


exports.addAdminRole = functions.https.onCall(async (data) => {
  try {
    const user = await admin.auth().getUserByEmail(data.email);
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
    });
    return {message: `admin adicionado com sucesso: ${data.email}`};
  } catch (error) {
    return {error: error};
  }
});
exports.addSuperAdminRole = functions.https.onCall(async (data) => {
  try {
    const user = await admin.auth().getUserByEmail(data.email);
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
      superadmin: true,
    });
    return {message: `Superadmin adicionado com sucesso: ${data.email}`};
  } catch (error) {
    return {error: error};
  }
});

exports.removeAdminRole = functions.https.onCall(async (data) => {
  try {
    const user = await admin.auth().getUserByEmail(data.email);
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: null,
    });
    return {message: `corretor removido com sucesso: ${data.email}`};
  } catch (error) {
    return {error: error};
  }
});

exports.listAllUsers = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const listUsers = await admin.auth().listUsers();
      res.status(200).send(listUsers);
    } catch (error) {
      res.status(500).send({error: "Erro ao listar usuários", details: error});
    }
  });
});

exports.checkSuperAdmin = functions.auth.user().onCreate(async (user) => {
  const ownerEmail = "propinveste01@gmail.com";
  if (user.email === ownerEmail) {
    try {
      await admin.auth().setCustomUserClaims(user.uid,
        {admin: true, superadmin: true});
      console.log(`SuperAdmin atribuída a ${user.email}`);
    } catch (error) {
      console.error("Erro ao adicionar claim de superAdmin:", error);
    }
  }
});

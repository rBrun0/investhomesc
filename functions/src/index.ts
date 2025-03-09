import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const deleteUserByEmail = functions.https.onCall(
  async (data, context) => {
    try {
      const userRecord = await admin.auth().getUserByEmail(data.email);
      await admin.auth().deleteUser(userRecord.uid);
      return {success: true, message: "Usuário deletado com sucesso."};
    } catch (error) {
      return {success: false, error: error};
    }
  });

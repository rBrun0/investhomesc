import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

import { UserMetadata } from 'firebase/auth';

// Cria um mock do objeto `User`
const initialState: User = {
  uid: '',
  displayName: null,
  email: null,
  emailVerified: false,
  photoURL: null,
  phoneNumber: null,
  providerData: [],
  isAnonymous: false,
  tenantId: null,
  refreshToken: '',
  metadata: {} as UserMetadata,  // Mock do metadata
  delete: async () => {},  // Mock do método delete
  getIdToken: async () => '',  // Mock do método getIdToken
  getIdTokenResult: async () => ({ token: '' } as any),  // Mock do getIdTokenResult
  reload: async () => {},  // Mock do reload
  toJSON: () => ({}),  // Mock do toJSON
  providerId: "", // Mock do providerId
};

export const userReducer = createSlice({
    name:'userSlice',
    initialState,
    reducers: {
        // Atualiza o estado com os dados do usuário
    setUser: (state, action: PayloadAction<User>) => {
        return { ...state, ...action.payload };
      },
      
      // Reseta o estado ao valor inicial (logout)
      clearUser: (state) => {
        return initialState;
      },
    },
})

export const { setUser, clearUser } = userReducer.actions
export default userReducer.reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db, auth } from "@/app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";

// import { UserMetadata } from 'firebase/auth';

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  role: string | null;
}

const initialState: User = {
  uid: '',
  displayName: null,
  email: null,
  role: null,
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
      clearUser: () => {
        return initialState;
      },
    },
})

export const fetchUser = () => async (dispatch: any) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
       const tempU = []
        const authUser = auth.currentUser
        const fireStoreUsers = query(collection(db, 'users'))
        const gotUsers = await getDocs(fireStoreUsers)
      
        gotUsers.forEach((doc) => {
          if(doc.data().email == user.email) {
            dispatch(
              setUser({
                uid: user.uid,
                displayName: doc.data().displayName || null,
                email: user.email,
                role: doc.data().role || null,
              })
            );
          }
        })

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      console.log('aaaaaaaaaa', user.email, tempU)

      // if (docSnap.exists()) {
      //   const userData = docSnap.data();

      // } else {
      //   console.error('Usuário não encontrado no Firestore');
      // }
    } else {
      dispatch(clearUser());
    }
  });
};

export const { setUser, clearUser } = userReducer.actions
export default userReducer.reducer
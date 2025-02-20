'use client'

import { auth, db } from '../firebaseConfig';
import { useEffect, useState } from 'react';
import { Footer } from '../components/Footer/Footer';
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { User } from '../features/user/userSlices';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Roles } from '@/lib/utils';
import { UserTable } from './UserTable/UserTable';
import { toast, Toaster } from 'sonner';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Users } from '../utils/types';



// type LoggedUsers = {
//   email: string;
//   uid: string
// }

function Superadminarea()  {

  const selector = useSelector

  const userProfile = selector((state: RootState) => state.userSlice)

  const [adminEmail, setAdminEmail] = useState('')
  const [adminEmailToRemove, setAdminEmailToRemove] = useState('')
  const [excludeUser,setExcludeUser] = useState('')
  const [userNameInput, setUserNameInput] = useState('')
  const [userPasswordInput, setUserPasswordInput] = useState('')
  const [userEmailInput, setUserEmailInput] = useState('')

  const [existingUsers, setExistingUsers] = useState<User[]>([]) 
  // const activedUser = auth.currentUser

  async function validateUser() {
    const tempU = []
    const authUser = auth.currentUser
  const fireStoreUsers = query(collection(db, 'users'))
  const gotUsers = await getDocs(fireStoreUsers)

  gotUsers.forEach((doc) => {
    tempU.push({...doc.data(), uid: doc.id })
  })

  setExistingUsers(tempU)

  console.log({authUser})

  }

  const [usersList, setUsersList] = useState<Users[]>();
    
  async function fetchUsers() {
    const q = query(collection(db, 'users'))
    
    const querySnapshot = await getDocs(q)
    const temp = [] 

    querySnapshot.forEach((doc) => {
      temp.push({
        uid: doc.id,
        displayName: doc.data().displayName,
        email: doc.data().email,
        role: doc.data().role
      })
    })
    setUsersList(temp)
    return usersList
  }

  // const [loggedUsers, setLoggedUsers] = useState<LoggedUsers[]>([])

  // Função para adicionar admin
const adicionarAdmin = async (email: string) => {

  try {
    const foundUser = existingUsers.find((u) => u.email == email) 

    if(!foundUser) {
      toast.error("Usuário não encontrado no banco de dados")
      return;
    }

    if(foundUser) {
      const q = query(collection(db, "users"), where("email", "==", email));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (docSnap) => {
      const userRef = docSnap.ref;
      await updateDoc(userRef, {
        role: Roles.CORRETOR
      });
    });
    }
    setAdminEmail("")
    fetchUsers()
    toast.success("Usuário elevado a corretor!")
  } catch (error) {
    toast.error("Algo deu errado!",)
    console.error("Erro ao adicionar admin:", error);
  }
};

async function removeAdmin(email: string) {

  try {
    const foundUser = existingUsers.find((u) => u.email == email) 

    if(!foundUser) {
      toast.error("Usuário não encontrado!")
      return;
    }

    if(foundUser) {
      const q = query(collection(db, "users"), where("email", "==", email));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (docSnap) => {
      const userRef = docSnap.ref;
      await updateDoc(userRef, {
        role: Roles.COMUM
      });
    });
    }
    fetchUsers()
    setAdminEmailToRemove("")
    toast.success("Usuário agora é comum!")
  } catch (error) {
    toast.error("Algo deu errado!")
    console.error("Erro ao reduzir usuário:", error);
  }
}

async function deleteUser(email: string) {
  try {

    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      toast.error("Usuário não encontrado no banco de dados!");
      return;
    }
    
    querySnapshot.forEach(async (docSnap) => {
      const userRef = docSnap.ref;
      await deleteDoc(userRef);
    });

    const res = await fetch("/api/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    // const text = await res.text();
    // console.log("Resposta da API:", text);

    const data = await res.json();
    if (data.success) {
      toast.success("Usuário deletado com sucesso!");
    } else {
      toast.error("Erro ao deletar: " + data.error);
    }

    fetchUsers()

    setExcludeUser("")

    toast.success("Usuário removido com sucesso!")
  } catch (error) {
    toast.error("Algo deu errado!")
    console.error("Erro ao remover usuário:", error);
  }
}

type CreateUserProps = {
  userName: string;
  userPassword: string;
  userEmail: string;
}

async function createUser({userName, userPassword, userEmail}: CreateUserProps) {

  const adminUser = auth.currentUser;

  if(!userName || !userPassword || !userEmail) {
    toast.error("Todos os campos são obrigatórios!")
    return;
  }

  if(existingUsers.some(u => u.email === userEmail)) {
    toast('Já existe um usuário com este email!', {
        description: "Usuário já encontrado!",
    })
    return
}

          try {
              const userCredentials = await createUserWithEmailAndPassword(auth, userEmail, userPassword)
              const uid = userCredentials.user.uid
  
              await setDoc(doc(db,"users", uid), {
                  uid: userCredentials.user.uid,
                  displayName: userName,
                  email: userEmail,
                  password: userPassword,
                  role: Roles.COMUM,
                  createdAt: String(new Date())
              })

              fetchUsers()
              setUserNameInput("")
              setUserEmailInput("")
              setUserPasswordInput("")
                  if (adminUser) {
              await signInWithEmailAndPassword(auth, adminUser.email!, "adminfiodf3049043KLKRLQW");
    }
              toast.success("Usuário criado com sucesso!")
          } catch(e) {
              console.log("error ", e)
              toast.error("Erro ao criar usuário!")
          }

  // try {
  //   const res = await fetch("/api/create", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ userName, userPassword, userEmail }),
  //   })

  //   console.log(res)

  //   toast.success("Usuário criado com sucesso!")
  // } catch(e) {
  //   toast.error("Erro ao cadastrar novo usuário!")
  //   console.error("Erro ao cadastrar novo usuário:", e);
  // }
}


// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     user.getIdTokenResult().then((idTokenResult) => {
//       if (!!idTokenResult.claims.superadmin) {
//         console.log('Usuário é superadmin');
//       } else {
//         console.log('Usuário não é superadmin');
//       }
//     });
//   }
// });


    useEffect(() => {
      validateUser();
    }, [])

    
    
    return (

      <main className='w-full flex justify-center'>
      <div>
      {
        userProfile.role != Roles.ADMIN ? (
          <p className='text-center'>Voce nao e o proprietario do site!</p>
        ) : (

          

          <div className="w-full h-screen pt-12">
          
            <h1 className="text-center text-4xl text-zinc-600">DASHBOARD</h1>
            

           <div className="w-full flex flex-col justify-center items-center mt-16">

           <div className='flex flex-col items-center gap-4'>
                 <h1 className="text-sm text-s">Criar usuário</h1>
                 <label htmlFor="userName">
                  <p className='text-start text-sm'>Nome</p>
                <input type="text" placeholder="Nome do usuário" id="username" className="outline-none border rounded-md w-96 h-12 pl-3 text-zinc-700"
                 value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)}/>
                 </label>

                 <label htmlFor="userEmail">
                 <p className='text-start text-sm'>E-mail</p>
                <input type="text" placeholder="E-mail do usuário" id="userEmail" className="outline-none border rounded-md w-96 h-12 pl-3 text-zinc-700"
                 value={userEmailInput} onChange={(e) => setUserEmailInput(e.target.value)}/>
                 </label>

                 <label htmlFor="userPassword">
                 <p className='text-start text-sm'>Senha</p>
                <input type="text" placeholder="Senha do usuário" id="userPassword"
                className="outline-none border rounded-md w-96 h-12 pl-3 text-zinc-700"
                 value={userPasswordInput} onChange={(e) => setUserPasswordInput(e.target.value)}/>
                 </label>

                 <button onClick={() => createUser({userName: userNameInput, userPassword: userPasswordInput, userEmail: userEmailInput})}
                  className='bg-customPrimary text-white w-24 h-8 rounded-md border-2 border-customPrimary
                  hover:bg-white hover:text-customPrimary transition-colors mt-8'>
                    Adicionar
                </button>

            </div>

            <div className='mt-14'>
                 <h1 className="text-sm text-s">Adicionar corretor pelo e-mail</h1>
                <input type="text" placeholder="E-mail do corretor" className="outline-none border rounded-md w-96 h-12 pl-3 text-zinc-700"
                 value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)}/>
            </div>
                <button onClick={() => adicionarAdmin(adminEmail)}
                  className='bg-customPrimary text-white w-24 h-8 rounded-md border-2 border-customPrimary
                  hover:bg-white hover:text-customPrimary transition-colors mt-8'>
                    Adicionar
                </button>
            </div>

            <div className="w-full flex flex-col justify-center items-center mt-16">
              <div>
                 <h1 className="text-sm text-start">Remover corretor pelo e-mail</h1>
                <input type="text" placeholder="E-mail do corretor" className="outline-none border rounded-md w-96 h-12 pl-3 text-zinc-700"
                value={adminEmailToRemove} onChange={(e) => setAdminEmailToRemove(e.target.value)}/>

              </div>
                <button onClick={() => removeAdmin(adminEmailToRemove)}
                  className='bg-customPrimary text-white w-24 h-8 rounded-md border-2 border-customPrimary
                  hover:bg-white hover:text-customPrimary transition-colors mt-8'>
                    Remover
                </button>
            </div>

            <div className="w-full flex flex-col justify-center items-center mt-8">
              <div>
                 <h1 className="text-sm text-start">Excluir usuário pelo e-mail</h1>
                <input type="text" placeholder="email do usuário" className="outline-none border rounded-md w-96 h-12 pl-3 text-zinc-700"
                value={excludeUser} onChange={(e) => setExcludeUser(e.target.value)}/>
                </div>
                <button onClick={() => deleteUser(excludeUser)}
                  className='bg-customPrimary text-white w-24 h-8 rounded-md border-2 border-customPrimary
                  hover:bg-white hover:text-customPrimary transition-colors mt-8'>
                    Remover
                </button>
            </div>

          <div className='w-full mt-12 flex flex-col items-center px-6'>
              {/* <h1 className='text-center text-3xl'>USUARIOS REGISTRADOS:</h1> */}

              <UserTable fetchUsers={fetchUsers} usersList={usersList}/>
                  
            </div>

            <Footer/>

            <Toaster/>
          </div>


)

}

      </div>
  </main>
    )
}

export default Superadminarea;
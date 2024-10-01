'use client'

import { onAuthStateChanged } from 'firebase/auth';
import { auth, functions } from '../firebaseConfig';
import useSuperAdmin from '../Hooks/useSuperAdmin';
import { httpsCallable } from "firebase/functions";
import { useEffect, useState } from 'react';
import useAdmin from '../Hooks/useAdmin';



type LoggedUsers = {
  email: string;
  uid: string
}

function superadminarea()  {

  const user = auth.currentUser

  const [loggedUsers, setLoggedUsers] = useState<LoggedUsers[]>([])

  // Função para adicionar admin
const adicionarAdmin = async (email: string) => {
  const addAdminRole = httpsCallable(functions, 'addAdminRole');

  try {
    const result = await addAdminRole({ email: email });
    setAdminEmail('')
    console.log(result.data); // Sucessoa
    alert('corretor adicionado com sucesso')
  } catch (error) {
    console.error("Erro ao adicionar admin:", error);
  }
};

async function removeAdmin(email: string) {

  if(user?.email == email) {
    alert('Você não pode remover seu próprio email');
    return;
  }

  const removeAdminRole = httpsCallable(functions, 'removeAdminRole');

  try {
    const result = await removeAdminRole({ email: email });
    console.log(result.data);
    setAdminEmailToRemove('');
    alert('corretor removido com sucesso!')
  } catch (error) {
    console.error("Erro ao remover admin:", error);
  }
}


onAuthStateChanged(auth, (user) => {
  if (user) {
    user.getIdTokenResult().then((idTokenResult) => {
      if (!!idTokenResult.claims.superadmin) {
        console.log('Usuário é superadmin');
      } else {
        console.log('Usuário não é superadmin');
      }
    });
  }
});

const isAdmin = useAdmin();

    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //       user.getIdTokenResult().then((idTokenResult) => {
    //         if (!!idTokenResult.claims.superadmin) {
    //           console.log('Usuário é superadmin');
    //         } else {
    //           console.log('Usuário não é superadmin');
    //         }
    //       });
    //     }
    //   });

    const {isSuperAdmin} = useSuperAdmin()

    const [adminEmail, setAdminEmail] = useState('')

    const [adminEmailToRemove, setAdminEmailToRemove] = useState('')

    const fetchAllUsers = async () => {
      try {
        // Substitua essa URL pela URL gerada no seu Firebase deployment
        const response = await fetch('https://us-central1-dfatto-a05ca.cloudfunctions.net/listAllUsers');
    
        if (!response.ok) {
          throw new Error('Erro ao buscar usuários');
        }
    
        const users = await response.json();
        setLoggedUsers(users.users)
    
        // Aqui você pode trabalhar com os dados dos usuários
      } catch (error) {
        console.error('Erro:', error);
      }
    };
    
    // Exemplo de como chamar a função ao carregar o componente
    useEffect(() => {
      fetchAllUsers();
    }, []);

    
    
    return (

      <div>
      {
        !isSuperAdmin || !useAdmin ? (
          <p className='text-center'>Voce nao e o proprietario do site!</p>
        ) : (

          <div className="w-full h-screen pt-12">
            <h1 className="text-center text-4xl">DASHBOARD - PROPRIETARIO</h1>
            

           <div className="w-full flex flex-col justify-center items-center mt-16">
                 <h1 className="text-2xl">adicionar corretor pelo e-mail</h1>
                <input type="text" placeholder="e-mail do corretor" className="outline-none shadow-md w-96 h-12 pl-3 text-zinc-700"
                value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)}/>
                <button onClick={() => adicionarAdmin(adminEmail)}
                  className='bg-customPrimary text-white w-24 h-8 rounded-md border-2 border-customPrimary
                  hover:bg-white hover:text-customPrimary transition-colors mt-8'>adicionar</button>
            </div>

            <div className="w-full flex flex-col justify-center items-center mt-16">
                 <h1 className="text-2xl">remover corretor pelo e-mail</h1>
                <input type="text" placeholder="e-mail do corretor" className="outline-none shadow-md w-96 h-12 pl-3 text-zinc-700"
                value={adminEmailToRemove} onChange={(e) => setAdminEmailToRemove(e.target.value)}/>
                <button onClick={() => removeAdmin(adminEmailToRemove)}
                  className='bg-customPrimary text-white w-24 h-8 rounded-md border-2 border-customPrimary
                  hover:bg-white hover:text-customPrimary transition-colors mt-8'>adicionar</button>
            </div>

            {/* <div className="w-full flex flex-col justify-center items-center mt-8">
                 <h1 className="text-2xl">excluir admin pelo UID</h1>
                <input type="text" placeholder="id do admin" className="outline-none shadow-md w-96 h-12 pl-3 text-zinc-700"
                value={excludeAdminId} onChange={(e) => setExcludeAdminId(e.target.value)}/>
                <button>remover</button>
            </div> */}

          <div className='w-full mt-12 flex flex-col items-center'>
              <h1 className='text-center text-3xl'>USUARIOS REGISTRADOS:</h1>

              <div className='flex flex-col justify-center items-center space-y-4 mt-3'>
                {
                  loggedUsers && loggedUsers.map((loggedUser) => (
                    <p className={`${user?.email == loggedUser.email ? 'font-semibold' : ''}`}>{loggedUser.email} {user?.email == loggedUser.email ? '- SUA CONTA' : ''}</p>
                  ))
                }
              </div>
                  
            </div>

          </div>

        
        )

      }

      </div>
    )
}

export default superadminarea;
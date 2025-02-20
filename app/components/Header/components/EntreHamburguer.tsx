"use client"

import { auth } from "@/app/firebaseConfig";
import { RootState } from "@/app/store";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useSelector } from "react-redux";

export const EntreHamburguer = () => {

    // const dispatch = useDispatch();

    // const [usuario, setUsuario] = useState<User>()
    const selector = useSelector
    const userProfile = selector((state: RootState) => state.userSlice)    // const usuarioCorrente = auth.currentUser

    console.log('userProfile', userProfile)

    // const provider = new GoogleAuthProvider();

// const user = useSelector((state: RootState) => state.userSlice);  // Obtém o estado do usuário

const logout = async () => {
    try {
      await signOut(auth);
      console.log('Usuário deslogado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
};

    return (
        <>
        {
            userProfile && <div className="border-b-[1px] border-b-zinc-200 pb-4 cursor-pointer" onClick={logout}>Sair</div>
        }

        {
            !userProfile && <Link href={"/signup"} className="border-b-[1px] border-b-zinc-200 pb-4">Junte-se</Link>
        }
        </>
    )
}

export default EntreHamburguer;
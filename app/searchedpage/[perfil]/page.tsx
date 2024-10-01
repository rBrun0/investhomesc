import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { IoIosSearch } from "react-icons/io"
import { VscSettings } from "react-icons/vsc"
import { Pagination } from "../../components/Pagination/Pagination"
import { FilterDialog } from "../components/FilterDialog"
import { SearchedProperties } from "../components/SearchedProperties" 

type SearchedPageProps = {
  params: {
    perfil: string
  }
}

function SearchedPage({params}: SearchedPageProps) {

  const propertyProfile = params.perfil

    return (
        <section className="w-full flex flex-col justify-center items-center mt-14">

        <div className="flex flex-col w-10/12 items-start px-14 space-y-4">

          <h1 className="text-3xl font-semibold" >BUSCA AVANCADA</h1>



          <div className="flex space-x-2 pb-4">

          <Dialog>
          <DialogTrigger className="w-40 h-12 space-x-1 text-customPrimary border-2 border-customPrimary border-solid rounded-md  flex justify-center items-center"
          ><VscSettings className="font-semibold"/> <span>Filtro Refinado</span>
          </DialogTrigger>

          <FilterDialog/>

          </Dialog>


          <button className="w-40 h-12 space-x-1  text-customPrimary border-2 border-customPrimary border-solid rounded-md flex justify-center items-center">
            <IoIosSearch width={40} height={40}/> <span>Refazer pesquisa</span>
          </button>

          </div>
        </div>

        <div className="flex flex-col justify-center items-center space-y-6">
        
        <h1>local dos imoveis</h1>

        <SearchedProperties propertyProfile={propertyProfile}/>


        </div>

        

        <footer className="flex flex-col justify-center items-center space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <p> 
            Ordenar por: 
            </p>
            <select name="" id="" className="w-48 h-10 px-3 py-2 outline-none border-[1px] border-zinc-700 rounded-md
            cursor-pointer">
              <option value="maior preco">Maior Preco</option>
              <option value="relevancia">Relevancia</option>
              <option value="menor preco">Menor Preco</option>
              <option value="maior area privada">Maior Area Privada</option>
              <option value="mais recentes">Mais Recentes</option>
            </select>
          </div>

          <Pagination/>

        </footer>
      </section>
    )
}

export default SearchedPage
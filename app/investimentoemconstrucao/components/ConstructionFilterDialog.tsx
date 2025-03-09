"use client"

import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CustomcheckBox } from "@/app/searchedpage/components/CustomCheckBox"
import { useDispatch } from "react-redux"
import { ChangeEvent, useState } from "react"
import { resetFilterValues, setFilterValues } from "@/app/features/filterValues/constructionValues/constructionFilterSlice"


export const ConstructionFilterDialog = () => {

    const [checkboxVal,setCheckboxVal] = useState<string[]>([])
    

    const [bathrooms, setBathrooms] = useState(0)
    const [carSpace, setCarSpace] = useState(0)

    const dispatch = useDispatch()

    function addBathroom(bathrooms: number) {
        dispatch(setFilterValues({bathrooms}))
    }

    function addCarSpace(carSpace: number) {
        dispatch(setFilterValues({garages: carSpace}))
    }

    function addPropertyInformations() {
        dispatch(setFilterValues({condominumInformations: checkboxVal}))
        dispatch(setFilterValues({constructionInformations: checkboxVal}))
    }

    function addFilters() {
        addBathroom(bathrooms)
        addCarSpace(carSpace)
        addPropertyInformations()

    }

    function handleCheckbox(e: ChangeEvent<HTMLInputElement>) {
        const isSelected = e.target.checked
        const value = e.target.value

        if(isSelected) {
            setCheckboxVal([...checkboxVal, value])
        } else {
            setCheckboxVal((prev) => {
                return prev.filter((nam) => nam != value)
            })
        }

        console.log(checkboxVal)
    }

    function resetFilters() {
        dispatch(resetFilterValues())
        setCheckboxVal([])
    }

    return (

        <DialogContent className="max-w-[70%] h-[70%] overflow-y-auto rounded-md">
          <DialogHeader>
            <DialogTitle className=" text-center md:text-start text-2xl border-b-[1px] border-b-black pb-2">Filtros de imóveis</DialogTitle>
        
            <DialogDescription className="flex flex-col items-center justify-start pt-6 space-y-6">

                <section className="min-w-full max-w-full flex justify-between items-center px-8 border-b-[3px] pb-6">
                    <h3 className="text-2xl">Banheiros</h3>

                    <div className=" flex space-x-2 justify-center items-center">
                        <span className="flex items-center justify-center rounded-full cursor-pointer
                        border-black border-[1px] w-12 h-12 text-xl" onClick={() => bathrooms == 1 ? setBathrooms(0) : setBathrooms(1)}>
                            1
                        </span>
                        <span className="flex items-center justify-center rounded-full cursor-pointer
                        border-black border-[1px] w-12 h-12 text-xl " onClick={() => bathrooms == 2 ? setBathrooms(0) : setBathrooms(2)}>
                            2
                        </span>
                        <span className="flex items-center justify-center rounded-full cursor-pointer
                        border-black border-[1px] w-12 h-12 text-xl " onClick={() => bathrooms == 3 ? setBathrooms(0) : setBathrooms(3)}>
                            3
                        </span>
                        <span className="flex items-center justify-center rounded-full cursor-pointer
                        border-black border-[1px] w-12 h-12 text-xl " onClick={() => bathrooms == 4 ? setBathrooms(0) : setBathrooms(4)}>
                            4+
                        </span>
                    </div>
                </section>      

                <section className="min-w-full max-w-full flex flex-col md:flex-row justify-between items-center px-8 border-b-[3px] border-b-black] pb-6">
                    <h3 className="text-2xl">Vagas na garagem</h3>

                    <div className=" flex space-x-2 justify-center items-center">
                        <span className="flex items-center justify-center rounded-full cursor-pointer
                        border-black border-[1px] w-7 h-7 md:w-12 md:h-12 text-xl" onClick={() => carSpace == 1 ? setCarSpace(0) : setCarSpace(1)}>
                            1
                        </span>
                        <span className="flex items-center justify-center rounded-full cursor-pointer
                        border-black border-[1px]  w-7 h-7 md:w-12 md:h-12 text-xl " onClick={() => carSpace == 2 ? setCarSpace(0) : setCarSpace(2)}>
                            2
                        </span>
                        <span className="flex items-center justify-center rounded-full cursor-pointer
                        border-black border-[1px]  w-7 h-7 md:w-12 md:h-12 text-xl " onClick={() => carSpace == 3 ? setCarSpace(0) : setCarSpace(3)}>
                            3+
                        </span>
                    </div>
                </section>      


                <section className="w-full max-w-full pb-6 border-b-black border-b-[1px]">

                    <h1 className="text-2xl">Caracteristicas do Imovel</h1>

                    <div className="flex mt-6 w-[26rem] flex-wrap space-x-2 space-y-2 justify-start items-center">  

                        
                    <CustomcheckBox description="Apartamento cobertura" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Sol da Manha" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Sol da tarde" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Apto diferenciado" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Duplex" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Showroom" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Quadra mar" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Frente avenida" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Sem mobíllia" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>

                    </div>


                </section>

                <section className="w-full max-w-full pb-6 border-b-black border-b-[1px]">
                    <h1 className="text-2xl">Características do condomínio</h1>

                    <div className="flex mt-6 w-[30rem] flex-wrap space-x-2 space-y-2 justify-start items-center">  

                        
                    <CustomcheckBox description="Academia" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Churrasqueira" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Elevador" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Espaço gourmet" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Lavanderia no prédio" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Sauna" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Piscina" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Playground" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Portaria 24h" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Quadra esportiva" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Salão de festas" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>
                    <CustomcheckBox description="Entrada para banhistas" handleCheckBox={handleCheckbox} checkBoxStateValue={checkboxVal}/>        

                    </div>

                </section>



            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="min-w-full max-w-full flex justify-between items-center mt-4">

            <button className="border-[2px] border-customPrimary text-customPrimary w-36 h-12 rounded-md"
            onClick={resetFilters}>
                Limpar filtros
            </button>

            <button className="bg-customPrimary text-white border-[2px] border-customPrimary w-36 h-12 rounded-md"
            onClick={addFilters}>
                Aplicar Filtros
            </button>

          </DialogFooter>

            </DialogContent>
    )
}
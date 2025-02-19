import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { FaRegTrashAlt } from "react-icons/fa"

type ExcludeDialogProps = {
    deleteFunction: () => void
}

export const ExcludeDialog = ({deleteFunction}: ExcludeDialogProps) => {
    return (
        <AlertDialog>
                      <AlertDialogTrigger>
                    <FaRegTrashAlt className='w-14 h-6 py-1 bg-customPrimary text-white rounded-md my-2 absolute z-10 right-2
                    cursor-pointer'
                      />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Tem certeza de que deseja excluir ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>


                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction className='bg-red-500 text-white px-4 py-2 rounded-md'
                          onClick={deleteFunction}>
                            Excluir
                          </AlertDialogAction>


                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
    )
}
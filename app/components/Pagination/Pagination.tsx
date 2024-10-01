import { RiArrowDropLeftFill } from "react-icons/ri";
import { RiArrowDropRightFill } from "react-icons/ri";


export const Pagination = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-10 h-10 border-2 border-zinc-700 flex justify-center items-center"><RiArrowDropLeftFill/></div>

            <div className="w-10 h-10 border-2 border-zinc-700 flex justify-center items-center">1</div>
            <div className="w-10 h-10 border-2 border-zinc-700 flex justify-center items-center">2</div>
            <div className="w-10 h-10 border-2 border-zinc-700 flex justify-center items-center">3</div>
            <div className="w-10 h-10 border-2 border-zinc-700 flex justify-center items-center">...</div>

            <div className="w-10 h-10 border-2 border-zinc-700 flex justify-center items-center"><RiArrowDropRightFill/></div>
        </div>
    )
}
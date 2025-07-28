import { cn } from "@/lib/utils";
import { IoMdArrowDropup } from "react-icons/io";

interface ScrollToTopProps {
  className?: string;
}

export const ScrollToTop = ({ className }: ScrollToTopProps) => {
  const scroll = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <IoMdArrowDropup
        className="w-10 h-10 text-customPrimary cursor-pointer"
        width={10}
        height={10}
        onClick={scroll}
      />
      <h1 onClick={scroll} className="cursor-pointer font-medium">
        Topo
      </h1>
    </div>
  );
};

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollDownIcon() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => { 
    const handleScroll = () => {
      if (window.scrollY > 75) setHidden(true);
      else setHidden(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-opacity ${hidden ? "opacity-0" : "opacity-100"}`}>
      <ChevronDown className="animate-bounce text-white w-6 h-6" />
    </div>
  );
}
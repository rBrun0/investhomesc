import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export const MyAccordion = () => {
    return (
        <Accordion type="single" className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-orange-400 font-semibold">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="tracking-wide text-zinc-600">
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent> 
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger className="text-orange-400 font-semibold">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="tracking-wide text-zinc-600">
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger className="text-orange-400 font-semibold">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="tracking-wide text-zinc-600">
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
                <AccordionTrigger className="text-orange-400 font-semibold">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="tracking-wide text-zinc-600">
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
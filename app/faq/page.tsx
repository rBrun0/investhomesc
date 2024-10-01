import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

function faq() {
    return (
        <section className="w-4/5 mx-auto mt-12">

            <h1 className="text-center text-3xl text-zinc-600 font-semibold">
                TIRE SUAS PRINCIPAIS DUVIDAS
            </h1>
            <Accordion type="single" className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-customPrimary font-semibold">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="tracking-wide text-zinc-600">
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent> 
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger className="text-customPrimary font-semibold">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="tracking-wide text-zinc-600">
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger className="text-customPrimary font-semibold">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="tracking-wide text-zinc-600">
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
                <AccordionTrigger className="text-customPrimary font-semibold">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="tracking-wide text-zinc-600">
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
                <AccordionTrigger className="text-customPrimary font-semibold">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="tracking-wide text-zinc-600">
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent> 
            </AccordionItem>

            <AccordionItem value="item-">
                <AccordionTrigger className="text-customPrimary font-semibold">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="tracking-wide text-zinc-600">
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
                <AccordionTrigger className="text-customPrimary font-semibold">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="tracking-wide text-zinc-600">
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
                <AccordionTrigger className="text-customPrimary font-semibold">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="tracking-wide text-zinc-600">
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
            </AccordionItem>
        </Accordion>
        </section>
    )
}

export default faq
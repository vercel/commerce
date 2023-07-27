import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { credentials, credentialsKeys } from "constants/sustainability";


export function SustainabilityInfo() {
  return (
    <>
      <div>
          <p className='font-bold mt-6'>Credentials:</p>
          <Accordion type="single" collapsible>
            {credentialsKeys.map(credential => (
              <AccordionItem id={credential} key={credential} value={credential}>
                <AccordionTrigger className="text-sm py-3">{credentials[credential as keyof typeof credentials].title}</AccordionTrigger>
                <AccordionContent>
                  "{credentials[credential as keyof typeof credentials].excerpt}" <br /><br/>
                  <a className="text-bold pt-6" href={credentials[credential as keyof typeof credentials].link}>Read more</a>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
    </>
  )
};

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { credentials, credentialsKeys } from "constants/sustainability";
import Link from "next/link";


export function SustainabilityInfo() {
  return (
    <>
      <div>
          <p className='font-bold mt-6'>Credentials:</p>
          <Accordion type="single" collapsible>
            {credentialsKeys.map(credential => (
              <AccordionItem id={credential} key={credential} value={credential}>
                <AccordionTrigger className="text-xs py-3">{credentials[credential as keyof typeof credentials].title}</AccordionTrigger>
                <AccordionContent>
                  `{credentials[credential as keyof typeof credentials].excerpt}` <br /><br/>
                  <Link 
                  className="text-bold pt-6" 
                  href={credentials[credential as keyof typeof credentials].link}
                  target="_blank"
                  >
                    Read more
                  </Link>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
    </>
  )
};

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
          {/* <p className='font-bold mt-6'>Credentials:</p> */}
          <p className='font-bold mt-6 mb-1'>Garments</p>
          <p className="mb-3">Our base garments are Stanley & Stella, which boast a range of eco credentials:</p>
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
          <p className='font-bold mt-6 mb-1'>Packaging</p>
          <p className="mb-3">
            We pride ourselves on our products being 100% plastic free, including packaging. <br /><br />
            Our 
              <a href="#fsc"> FSC </a>
            certified labels ae attached to our products by a metal safety pin. <br /><br />
            Our parcels are also FSC certified paper, so you can feel completely guilt free about your purchase!
          </p>
        </div>
    </>
  )
};

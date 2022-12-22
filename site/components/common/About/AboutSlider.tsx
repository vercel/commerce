import React from 'react'
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from '@chakra-ui/react'
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
// And react-slick as our Carousel Lib
import Slider from 'react-slick'

import aboutJson from '../../../static_data/about.json'
import { useRouter } from 'next/router'

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 15000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

export default function AboutSlider() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null)

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' })
  const side = useBreakpointValue({ base: '30%', md: '40px' })

  const { locale } = useRouter()

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  /*
  const cards = [
    {
      title: 'Storia del Mercato',
      text: `Ciò che è sempre stato alla base del progresso della civiltà umana è lo scambio (di beni, di idee, di conoscenze). In età neolitica avveniva sotto forma di baratto. Nell'antichità e per tutto il Medioevo i principali canali di scambio erano il mercato, in genere allestito nelle piazze delle città e la fiera, imponente evento commerciale. Il mercato giornaliero, settimanale o mensile, vivacizzava la città e provvedeva alle esigenze della popolazione; era il luogo dello scambio tra la produzione dell'artigianato urbano e quella agricola. La fiera era un evento periodico, suddiviso in più circuiti predeterminati, dove tanti operatori economici convergevano per scambiarsi in natura, in moneta o tramite titoli di credito, beni in quantità consistenti; non mancavano le agevolazioni fiscali per i mercanti stranieri che vi convenivano. Ma la fiera era caratterizzata anche per il clima di confusione e festività; accadeva di tutto: circolazione di persone, di merci e cultura, spettacoli, giochi d'azzardo, reliquie di santi in bella mostra. Mentre l'attività produttiva (e a volte anche commerciale) del mercante, così come dell'artigiano si svolgeva nella bottega. Fino ai primi decenni del XVII secolo le fiere erano il principale canale di scambio commerciale e connotavano i territori entro le quali raggiungevano la loro fortuna. Con l'avvento dell'industrializzazione si afferma in Europa e nel mondo il sistema capitalistico di produzione: le botteghe artigiane diventano grandi fabbriche, le fiere tradizionali sono meno affollate e meno rinomate, divenendo sempre più sbocco di derrate agricole, e lasciando spazio a un nuovo tipo di fiera: la fiera campionaria, il cui massimo esempio è rappresentato dall’esposizione nazionale e universale. Nella città nascono gli spazi rispondenti alle nuove produzioni industriali e ai nuovi consumi: i passages, le gallerie, i grandi magazzini, gli antenati dell'odierno centro commerciale, tempio dell'attuale società consumistica del XXI secolo. Oggi sia i centri commerciali che le fiere specializzate (miranti ai singoli comparti dell'industria) sono gli attori fondamentali nel sistema di distribuzione delle novità introdotte dal grande mercato, propongono nuove idee e nuovi modelli di comportamento e consumo e, facilitando anche un'omologazione degli stessi, rispondono alle nuove dinamiche della globalizzazione. Se essi proliferano e riempiono il tessuto urbano, centrale o periferico, nei borghi e nei paesi, si trovano ancora le manifestazioni tipiche della sagra, del mercatino, della piccola fiera, della mostra a tema. Questi piccoli eventi preservano una cultura e una tradizione locali, talvolta ancora espressione della vita artigianale, attenuando il fenomeno della globalizzazione. In particolare il mercatino (agenzia d'affari) può essere strutturato come manifestazione periodica o avente una propria sede fissa. Rimane il luogo in cui possono rinvenirsi oggetti particolari, testimonianza del passato (più o meno recente) e non delle novità industriali.`,
      image:
        'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    },
    {
      title: 'Iniziativa',
      text: `Se è vero che oggi sia i grandi centri commerciali che questi piccoli eventi sono fenomeni culturali (i primi riguardanti la cultura attuale, globale, di massa, i secondi quella passata), sono luoghi d'intrattenimento e svago, hanno entrambi carattere di coinvolgimento emotivo e grande varietà e assortimento merceologico, è anche vero che gli ultimi sono organizzati esponendo le merci tuttalpiù per generi, settori. I titolari, attenti soprattutto al valore economico del bene usato, possono limitarsi a fornire ai visitatori informazioni basilari sugli stessi, non soddisfacendo mai completamente un ipotetico arricchimento culturale dei propri clienti. Ecco l'ipotesi di una nuova formula di agenzia d'affari che aspiri a essere un'esposizione a tema (come la fiera e la mostra a tema) e allo stesso tempo avere grande varietà e assortimento di culture e generi, il tutto ordinato in un disegno che susciti emozioni e fornisca al cliente la massima trasmissione culturale che può scaturire dall'osservazione di prodotti usati; ridia vita alle merci, ricordandosi delle culture e tradizioni locali (oggi più che mai in pericolo) e sia attenta alle urgenti istanze di ecologia, riuso e sostenibilità. Safara è uno spazio innovativo che espone prodotti datati come un normale mercatino, ma li reinserisce nella loro "cornice" originaria, affianco ad oggetti e simboli dello stesso periodo storico. È costituita da un percorso ramificato in più "fermate", ognuna delle quali rappresenti un decennio del 900. Perfino ogni singolo oggetto racconterà in breve la sua storia. Se ciò che è sempre stato alla base del progresso della civiltà umana è lo scambio, è ancora attraverso esso che Safara fornisce un elemento di diversificazione rispetto agli altri attori dell’usato. Riutilizzando la visione ancestrale del commercio basata sul baratto, e adattandola in chiave moderna, assieme ad altri servizi unici, Safara è davvero un’agenzia unica nel suo genere. Pensiamo inoltre che l’idea possa costituire un supporto utile come completamento di altra manifestazione locale.`,
      image:
        'https://images.unsplash.com/photo-1438183972690-6d4658e3290e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2274&q=80',
    },
    {
      title: 'Chi Siamo',
      text: `Safara è un'agenzia d'affari, più nota con il termine di mercatino dell'usato, che a differenza dei concorrenti, affianca all'offerta commerciale un'offerta culturale, tentando parallelamente di valorizzare la sua regione di provenienza e di fornirle un servizio utile, soprattutto in un periodo storico delicatissimo per il pianeta intero.`,
      image:
        'https://images.unsplash.com/photo-1507237998874-b4d52d1dd655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    },
  ]
  */

  const cards = aboutJson[locale as keyof typeof aboutJson]

  return (
    <Box
      position={'relative'}
      height={'600px'}
      width={'full'}
      overflow={'auto'}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={'-webkit-fit-content'}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
          >
            {/* This is the block you need to change, to customize the caption */}
            <Container
              maxWidth={'100em'}
              height="-webkit-fit-content"
              position="relative"
            >
              <Stack spacing={6} w={'full'} maxW={'-webkit-max-content'}>
                <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                  {card.title}
                </Heading>
                <Text
                  as={'i'}
                  fontSize={{ base: 'md', lg: 'lg' }}
                  color="GrayText"
                >
                  {card.text.split('<br/>').map((str) => (
                    <p>{str}</p>
                  ))}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  )
}

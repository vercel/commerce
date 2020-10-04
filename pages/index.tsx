import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import getAllProducts from '@lib/bigcommerce/api/operations/get-all-products'
import { Layout } from '@components/core'
import { Grid, Marquee, Hero } from '@components/ui'
import { ProductCard } from '@components/product'

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const { products } = await getAllProducts()
  return {
    props: { products },
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Grid items={products.slice(0, 3)} wrapper={ProductCard} />
      <Hero
        headline="Release Details: The Yeezy BOOST 350 V2 ‘Natural'"
        description="
        The Yeezy BOOST 350 V2 lineup continues to grow. We recently had the
        ‘Carbon’ iteration, and now release details have been locked in for
        this ‘Natural’ joint. Revealed by Yeezy Mafia earlier this year, the
        shoe was originally called ‘Abez’, which translated to ‘Tin’ in
        Hebrew. It’s now undergone a name change, and will be referred to as
        ‘Natural’."
      />
      <Marquee
        items={[...products.slice(0, 3)]}
        wrapper={(p: any) => (
          <div className="relative overflow-hidden p-6 box-border">
            <img
              className="object-scale-down h-24"
              src={p.node.images.edges[0].node.urlSmall}
            />
            <div className="absolute inset-0 flex items-center justify-end mr-8">
              <span className="bg-black text-white inline-block p-3 font-bold text-xl break-words">
                {p.node.name}
              </span>
            </div>
          </div>
        )}
      />
      <Grid items={products.slice(3, 6)} layout="B" wrapper={ProductCard} />
      <Marquee
        variant="secondary"
        items={products.slice(0, 3)}
        wrapper={() => (
          <div className="flex">
            <h3 className="bg-black text-white inline p-2 px-3 font-bold text-2xl">
              This is a very short title
            </h3>
          </div>
        )}
      />

      <div className="py-12 max-h-80">
        <div className="break-word w-24">
          ALL CATEGORIES ACCESSORIES BAGS CLOTHING SHOES ALL DESIGNERS 032c 1017
          ALYX 9SM 11 by Boris Bidjan Saberi 132 5. ISSEY MIYAKE 3.1 Phillip Lim
          424 99% IS A-COLD-WALL* A.P.C. AAPE by A Bathing Ape Acne Studios
          ACRONYM adidas Originals adidas Originals x Pharrell Williams Affix
          AGR Ahluwalia Aimé Leon Dore Alan Crocetti Alexander McQueen All Blues
          Ambush AMI Alexandre Mattiussi Amiri Andersson Bell Ann Demeulemeester
          Aries Article No. Asics Awake NY Axel Arigato Balenciaga Balmain Bao
          Bao Issey Miyake BAPE Barena Bather BEAMS PLUS Belstaff Benjamin Edgar
          Bianca Saunders Billionaire Boys Club Blackmerle Bless Bleue Burnham
          Bode Boris Bidjan Saberi Boss both Bottega Veneta Brain Dead Brioni
          Burberry C.P. Company C2H4 Calvin Klein Underwear Canada Goose
          Carhartt Work In Progress Carlota Barrera Carne Bollente Casablanca
          Castañer CDLP Charles Jeffrey Loverboy Chemist Creations Chin Teo
          Christian Louboutin Clarks Originals Coach 1941 Comme des Garçons
          Homme Comme des Garçons Homme Deux Comme des Garçons Homme Plus Comme
          des Garçons Play Comme des Garçons Shirt Comme des Garçons Wallets
          Common Projects Converse Cornerstone Côte & Ciel Craig Green Cutler
          And Gross Daniel W. Fletcher Dear Letterman Diesel Diesel Red Tag Dion
          Lee Dior Homme District Vision Dita Dolce & Gabbana Double Rainbouu
          Doublet Dr. Martens Drake's Dries Van Noten Dsquared2 Dunhill Eastpak
          Eastwood Danso Eidos Emanuele Bicocchi Enfants Riches Déprimés
          Ermenegildo Zegna Essentials Etro Études Eytys Fear of God Fendi Feng
          Chen Wang Frame FREI-MUT Frenckenberger Fumito Ganryu Garrett Leight
          GCDS Georges Wendell Giorgio Armani Giuseppe Zanotti Givenchy GmbH
          Golden Goose Goodfight GR10K Greg Lauren Grey Ant Gucci Guidi Haider
          Ackermann Han Kjobenhavn Harmony Harris Wharf London Hatton Labs
          Helmut Lang Herno Heron Preston Hoka One One Homme Plissé Issey Miyake
          Hugo Human Recreational Services Husbands IN GOLD WE TRUST PARIS
          Innerraum Isabel Benenato Isabel Marant Issey Miyake Men Jacquemus
          JACQUES Jan-Jan Van Essche JERIH Jil Sander John Elliott
          Johnlawrencesullivan Julius Junghans Junya Watanabe Juun.J JW Anderson
          Kanuk Kara Kassl Editions Keenkee Kenzo Kiko Kostadinov Ksubi Kuboraum
          Lacoste Landlord Lanvin Le Gramme Lemaire Levi's Levi's Made & Crafted
          Levi's Vintage Clothing Loewe Ludovic de Saint Sernin Mackage Maison
          Kitsuné Maison Margiela Malibu Sandals Marc Jacobs Marcelo Burlon
          County of Milan Marine Serre Marni Marsèll Martin Asbjorn Martine Ali
          Martine Rose Master & Dynamic Master-Piece Co mastermind WORLD Matsuda
          Maximum Henry MCQ McQ Alexander McQueen Miharayasuhiro MISBHV Missoni
          Molly Goddard Moncler Moncler Genius Moncler Grenoble Moschino Moussy
          Vintage Mowalola Mr & Mrs Italy MSGM Mugler Museum of Peace & Quiet
          Mykita N.Hoolywood Naked & Famous Denim NAMESAKE Nanamica Nanushka
          Needles Neighborhood Neil Barrett New Balance Nicholas Daley Nike ACG
          Noah NYC nonnative Noon Goons Norse Projects Nudie Jeans OAMC
          Off-White Officine Creative Officine Générale Oliver Peoples Oliver
          Peoples The Row Opening Ceremony Our Legacy Paco Rabanne Palm Angels
          Parajumpers Paul Smith Pearls Before Swine Perks and Mini Persol
          Phipps Polo Ralph Lauren Port Tanger PS by Paul Smith Pyer Moss R13
          RAEN Raf Simons rag & bone Random Identities Ray-Ban Re/Done Reebok
          Classics RETROSUPERFUTURE Rhude Rick Owens Rick Owens Drkshdw ROA
          Robert Geller Rochambeau S.R. STUDIO. LA. CA. Sacai Saint Laurent
          Salomon Salvatore Ferragamo Sankuanz Sasquatchfabrix. Satisfy
          Saturdays NYC Saul Nash Sean Suen Second/Layer Shinola Sies Marjan
          Snow Peak Solid Homme Song for the Mute St-Henri Stay Made Stella
          McCartney Stolen Girlfriends Club Stone Island Stone Island Shadow
          Project Stüssy Stutterheim Suicoke Sulvam Sunflower Sunspel
          SWEETLIMEJUICE TAKAHIROMIYASHITA TheSoloist. Tekla Telfar The Elder
          Statesman The North Face The Row The Very Warm The Viridi-anne Thom
          Browne Tibi Tiger of Sweden Tiger of Sweden Jeans Toga Virilis Tom
          Ford Tom Wood Toogood Ugo Cacciatori Undercover Valentino Vans
          Veilance Versace Versace Jeans Couture Versace Underwear VETEMENTS VIP
          Visvim VIU Vyner Articles WACKO MARIA We11done Wood Wood Wooyoungmi
          WWW.WILLSHOTT Xander Zhou Y-3 Y/Project Yohji Yamamoto Yves Salomon
          Yves Salomon - Army Z Zegna
        </div>
      </div>
    </>
  )
}

Home.Layout = Layout

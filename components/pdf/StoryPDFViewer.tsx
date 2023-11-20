'use client';

import {
  Font,
  Image,
  Document as PDFDocument,
  Page,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer';
import dynamic from 'next/dynamic';
import { IStory } from 'operations/chatOperations';

export const runtime = 'edge';

const PDFViewerNoSSR = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFViewer), {
  ssr: false
});

export default function StoryPDFViewer({ story }: { story: IStory }, titleImage: string) {
  return (
    <div
      style={{
        width: '100vw',
        height: 'calc(100vh - 76px)',
        position: 'relative'
      }}
    >
      <PDFViewerNoSSR style={styles.pdfContainer}>
        <Document pages={story.pages} titleImage={titleImage} />
      </PDFViewerNoSSR>
    </div>
  );
}

Font.register({
  family: 'JosefinSans',
  fonts: [
    { src: '/fonts/Josefin_Sans/static/JosefinSans-Thin.ttf', fontWeight: 100 },
    {
      src: '/fonts/Josefin_Sans/static/JosefinSans-ExtraLight.ttf',
      fontWeight: 200
    },
    {
      src: '/fonts/Josefin_Sans/static/JosefinSans-Light.ttf',
      fontWeight: 300
    },
    {
      src: '/fonts/Josefin_Sans/static/JosefinSans-Regular.ttf',
      fontWeight: 400
    },
    {
      src: '/fonts/Josefin_Sans/static/JosefinSans-Medium.ttf',
      fontWeight: 500
    },
    {
      src: '/fonts/Josefin_Sans/static/JosefinSans-SemiBold.ttf',
      fontWeight: 600
    },
    { src: '/fonts/Josefin_Sans/static/JosefinSans-Bold.ttf', fontWeight: 700 },
    {
      src: '/fonts/Josefin_Sans/static/JosefinSans-ExtraBold.ttf',
      fontWeight: 800
    },
    {
      src: '/fonts/Josefin_Sans/static/JosefinSans-Black.ttf',
      fontWeight: 900
    },
    {
      src: '/fonts/Josefin_Sans/static/JosefinSans-ThinItalic.ttf',
      fontStyle: 'italic',
      fontWeight: 100
    },
    {
      src: '/fonts/Josefin_Sans/static/JosefinSans-ExtraLightItalic.ttf',
      fontStyle: 'italic',
      fontWeight: 200
    },
    {
      src: '/fonts/Josefin_Sans/static/JosefinSans-LightItalic.ttf',
      fontStyle: 'italic',
      fontWeight: 300
    },
    {
      src: '/fonts/Josefin_Sans/static/JosefinSans-Italic.ttf',
      fontStyle: 'italic',
      fontWeight: 400
    },
    {
      src: '/fonts/Josefin_Sans/static/JosefinSans-MediumItalic.ttf',
      fontStyle: 'italic',
      fontWeight: 500
    },
    {
      src: '/fonts/Josefin_Sans/static/JosefinSans-SemiBoldItalic.ttf',
      fontStyle: 'italic',
      fontWeight: 600
    },
    {
      src: '/fonts/Josefin_Sans/static/JosefinSans-BoldItalic.ttf',
      fontStyle: 'italic',
      fontWeight: 700
    },
    {
      src: '/fonts/Josefin_Sans/static/JosefinSans-ExtraBoldItalic.ttf',
      fontStyle: 'italic',
      fontWeight: 800
    },
    {
      src: '/fonts/Josefin_Sans/static/JosefinSans-BlackItalic.ttf',
      fontStyle: 'italic',
      fontWeight: 900
    }
  ]
});

// const imgURL = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-pxRHHmesRMqKmtS7jjETVyk3/user-HhW2JRuIlirnomqLUWzzHAv3/img-YVMtH4dWy9GzTS3jZuVhimJ8.png?st=2023-11-20T18%3A24%3A16Z&se=2023-11-20T20%3A24%3A16Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-20T17%3A08%3A24Z&ske=2023-11-21T17%3A08%3A24Z&sks=b&skv=2021-08-06&sig=GB9P0duWfauJt0xiiXwPStScSadBsSoSxS1jRCZg29c%3D';

// TODO- this image works- but for some reason the DALLE ones dont render

const imgURL =
  'https://cdn.discordapp.com/attachments/989274756341706822/1175024578578366534/pinturillu_sian_couple_of_men_illustration_fantasy_Charlie_Bowa_1c51f19c-d5b9-4b53-b32f-e5468912bd1d.png?ex=6569b9ea&is=655744ea&hm=8dd0e4e5653bb9f7a7330f745983035f93e1891279351efe2dd6be7657987d88&';

/*
Note(Benson): PDFTest has some hardcoded implementation of generating random sections.
Right now for the Story viewer just render all the text at the bottom until we come up 
with a solidified way at dispersing the text throughout the page.
*/

///TODO hardcoded images replaced w titleImage- titleimage prop doesnt seem to render inside of the Image component in the Document function
const Document = ({ pages }: { pages: { text: string }[] }, titleImage: string) => {
  return (
    <PDFDocument>
      {pages.map(({ text }, index) => {
        return (
          <Page size="A4" style={styles.page} key={text}>
            <View key={index} style={{ ...styles.section, bottom: '10%' }}>
              <Text>{text}</Text>
            </View>
            <Image src={imgURL} style={styles.image} />
          </Page>
        );
      })}
    </PDFDocument>
  );
};

const styles = StyleSheet.create({
  pdfContainer: { width: '100%', height: '100%' },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    top: 0
  },
  page: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  section: {
    position: 'absolute',
    margin: 30,
    fontFamily: 'JosefinSans',
    /* Background properties */
    backgroundColor: 'rgba(255, 255, 255, 0.5)' /* semi-transparent white background */,
    /* Blur effect */
    backdropFilter: 'blur(10px)',
    /* Additional styling for aesthetics */
    padding: 12,
    borderRadius: 16,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontSize: 20,
    width: '90%'
  }
});

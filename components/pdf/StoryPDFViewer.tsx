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

export default function StoryPDFViewer({ story }: { story: IStory }) {
  return (
    <div
      style={{
        width: '100vw',
        height: 'calc(100vh - 76px)',
        position: 'relative'
      }}
    >
      <PDFViewerNoSSR style={styles.pdfContainer}>
        <Document pages={story.pages} />
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

const imgURL =
  'https://cdn.discordapp.com/attachments/989274756341706822/1175024578578366534/pinturillu_sian_couple_of_men_illustration_fantasy_Charlie_Bowa_1c51f19c-d5b9-4b53-b32f-e5468912bd1d.png?ex=6569b9ea&is=655744ea&hm=8dd0e4e5653bb9f7a7330f745983035f93e1891279351efe2dd6be7657987d88&';

/*
Note(Benson): PDFTest has some hardcoded implementation of generating random sections.
Right now for the Story viewer just render all the text at the bottom until we come up 
with a solidified way at dispersing the text throughout the page.
*/
const Document = ({ pages }: { pages: { text: string }[] }) => {
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

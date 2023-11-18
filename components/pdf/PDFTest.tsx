'use client';

import { Button } from '@/components/ui/button';
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { LoremIpsum } from 'lorem-ipsum';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';

export const runtime = 'edge';

const imgURL =
  'https://cdn.discordapp.com/attachments/989274756341706822/1175024578578366534/pinturillu_sian_couple_of_men_illustration_fantasy_Charlie_Bowa_1c51f19c-d5b9-4b53-b32f-e5468912bd1d.png?ex=6569b9ea&is=655744ea&hm=8dd0e4e5653bb9f7a7330f745983035f93e1891279351efe2dd6be7657987d88&';

const PDFViewerNoSSR = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFViewer), {
  ssr: false
});

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 6,
    min: 1
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

export default function PDFTest() {
  const [paragraphs, setParagraphs] = useState([
    lorem.generateParagraphs(1),
    lorem.generateParagraphs(1),
    lorem.generateParagraphs(1),
    lorem.generateParagraphs(1)
  ]);
  return (
    <div
      style={{
        width: '100vw',
        height: 'calc(100vh - 76px)',
        position: 'relative'
      }}
    >
      <Button
        style={styles.button}
        onClick={() => {
          setParagraphs([
            lorem.generateParagraphs(1),
            lorem.generateParagraphs(1),
            lorem.generateParagraphs(1),
            lorem.generateParagraphs(1)
          ]);
        }}
      >
        Remix Text
      </Button>
      <PDFViewerNoSSR style={styles.pdfContainer}>
        <MyDocument paragraphs={paragraphs} />
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

const MyDocument = ({ paragraphs }: { paragraphs: string[] }) => {
  const leftSectionPositions = useMemo(() => {
    // Generate first value between 5 and 25
    const firstValue = 5;
    // Generate second value between 50 and 75
    // const secondValue = Math.random() * 25 + 40;
    return [firstValue];
  }, []);
  const rightSectionPositions = useMemo(() => {
    const firstValue = Math.random() * 25 + 40;
    // const secondValue = Math.random() * 25 + 50;
    return [firstValue];
  }, []);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.column}>
          {leftSectionPositions.map((topPosition, index) => (
            <View key={index} style={{ ...styles.section, top: `${topPosition}%` }}>
              <Text>{paragraphs[index]}</Text>
            </View>
          ))}
        </View>
        <View style={styles.column}>
          {rightSectionPositions.map((topPosition, index) => (
            <View key={index} style={{ ...styles.section, top: `${topPosition}%` }}>
              <Text>{paragraphs[index + 2]}</Text>
            </View>
          ))}
        </View>
        <Image src={imgURL} style={styles.image} />
      </Page>
    </Document>
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
  column: {
    height: '100%',
    flexGrow: 1,
    flexShrink: 0
  },
  section: {
    top: 0,
    position: 'absolute',
    margin: 30,
    fontFamily: 'JosefinSans',
    /* Background properties */
    backgroundColor: 'rgba(255, 255, 255, 0.5)' /* semi-transparent white background */,
    /* Blur effect */
    backdropFilter: 'blur(10px)',
    /* Additional styling for aesthetics */
    padding: 8,
    borderRadius: 16,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontSize: 20
  },
  button: {
    position: 'absolute',
    top: 10,
    right: 100,
    color: 'black',
    background: 'white',
    borderRadius: 4
  }
});

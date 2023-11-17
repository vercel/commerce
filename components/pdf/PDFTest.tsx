'use client';

import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import dynamic from 'next/dynamic';

export const runtime = 'edge';

const PDFViewerNoSSR = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFViewer), {
  ssr: false
});

export default function PDFTest() {
  return (
    <PDFViewerNoSSR>
      <MyDocument />
    </PDFViewerNoSSR>
  );
}

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

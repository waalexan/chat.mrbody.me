import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'red',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
});

interface PDFDocumentProps {
  title: string;
  content: string;
}

export const PDFDocument = ({ title, content }: PDFDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.header}>{title}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>{content}</Text>
      </View>
    </Page>
  </Document>
);
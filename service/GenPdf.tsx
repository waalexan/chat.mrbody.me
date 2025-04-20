import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { employeeProp } from "../app/types/interfaces";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
  },
  header: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    marginTop: 60,
    fontWeight: 'bold',
  },
  section: {
    fontSize: 12,
    marginBottom: 12,
    lineHeight: 1.8,
    textAlign: 'justify',
  },
  signatureBlock: {
    marginTop: 30,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 2,
  },
  image: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export const PDFDocument = ({ data }: { data: employeeProp }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Image src="/Emblem_of_Angola.svg.png" style={styles.image} />
        <Text style={styles.header}>REPÚBLICA DE ANGOLA</Text>
        <Text style={styles.header}>MINISTÉRIO DA EDUCAÇÃO</Text>
        <Text style={[styles.header, {fontWeight: 600}]}>INSTITUTO POLITÉCNICO INDUSTRIAL DO KILAMBA KIAXI Nº 8056 "NOVA VIDA"</Text>
      </View>

      <Text style={styles.title}>TERMO DE INÍCIO DE FUNÇÕES</Text>

      <Text style={styles.section}>
        Aos <Text style={{fontWeight:600}}>09</Text> de <Text style={{fontWeight:600}}>setembro</Text> de <Text style={{fontWeight:600}}>2024</Text>, nesta cidade, perante o 
        Sr. <Text style={{fontWeight:600}}>Ferreira Manuel Fragoso</Text>, exercendo as funções
        de <Text style={{fontWeight:600}}>Diretor</Text>, comigo <Text style={{fontWeight:600}}>Luís Anastácio Yanga</Text>, Subdiretor Administrativo, compareceu a Sr {"(a)"}. <Text style={{fontWeight:600,color:"red"}}>{data.name}</Text>,
        devidamente identificada, a fim de iniciar as funções de professora, para as quais foi nomeada por despacho interno
        e encaminhada com a Guia de Marcha nº <Text style={{fontWeight:600}}>{data.AgenteNumber}</Text>, de 
        <Text style={{fontWeight:600}}> 27</Text> de <Text style={{fontWeight:600}}>junho</Text>, da Sra. Diretora Provincial da Educação de Luanda.
      </Text>

      <Text style={styles.section}>
        {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}Tendo prestado o compromisso de honra, foi-lhe dado início ao exercício das funções para todos os efeitos legais,
        lavrando-se o presente termo, que vai assinado pelo Sr. Diretor do Instituto, pela agente e por mim que o escrevi.
      </Text>

      <Text style={[styles.section, {fontWeight: 600}]}>
        {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}GABINETE DO DIRETOR DO INSTITUTO POLITÉCNICO INDUSTRIAL DO KILAMBA KIAXI Nº 8056 "NOVA VIDA"
        , em Luanda, aos 10 de setembro de 2024.
      </Text>

      <Text style={styles.signatureBlock}>
        ___________________________________________{"\n\n"}

        ___________________________________________{"\n\n"}

        ___________________________________________{"\n\n"}

      </Text>
    </Page>
  </Document>
);

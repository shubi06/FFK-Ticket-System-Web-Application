import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import Logo from "./Logo.png"; // Assuming the logo is in the same directory

// Styling for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#f3f4f6',
    padding: 20,
  },
  header: {
    backgroundColor: '#0073e6',
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
  },
  section: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  ticket: {
    marginBottom: 15,
  },
  ticketHeader: {
    backgroundColor: '#0073e6',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ticketDetail: {
    fontSize: 12,
    marginBottom: 3,
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
    color: '#777',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignSelf: 'center',
  },
  note: {
    marginTop: 10,
    fontSize: 10,
    textAlign: 'center',
    color: '#555',
  },
  imageBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.1,
    zIndex: -1,
  },
  qrCode: {
    alignSelf: 'center',
    marginTop: 10,
    width: 100,
    height: 100,
  },
});

const TicketPDF = ({ tickets }) => {
  const generateQRCode = async (text) => {
    try {
      return await QRCode.toDataURL(text);
    } catch (err) {
      console.error(err);
      return '';
    }
  };

  return (
    <Document>
      {tickets.map(ticket => {
        const qrCodeValue = `${ticket.id}-${ticket.firstName}-${ticket.lastName}-${ticket.ekipiKundershtar}-${ticket.numriUlses}`;
        const qrCodeDataUri = generateQRCode(qrCodeValue);

        return (
          <Page size="A4" style={styles.page} key={ticket.id}>
            <View style={styles.header}>
              <Text style={styles.title}>Ticket for Kosova vs {ticket.ekipiKundershtar}</Text>
            </View>
            <View style={styles.section}>
              <Image style={styles.image} src={Logo} />
              <Text style={styles.ticketDetail}><Text style={{ fontWeight: 'bold' }}>Name:</Text> {ticket.firstName} {ticket.lastName}</Text>
              <Text style={styles.ticketDetail}><Text style={{ fontWeight: 'bold' }}>Match:</Text> Kosova vs {ticket.ekipiKundershtar}</Text>
              <Text style={styles.ticketDetail}><Text style={{ fontWeight: 'bold' }}>Seat Number:</Text> {ticket.numriUlses}</Text>
              <Text style={styles.ticketDetail}><Text style={{ fontWeight: 'bold' }}>Sector:</Text> {ticket.sektoriUlses}</Text>
              <Text style={styles.ticketDetail}><Text style={{ fontWeight: 'bold' }}>Price:</Text> {ticket.cmimi} EUR</Text>
              <Text style={styles.ticketDetail}><Text style={{ fontWeight: 'bold' }}>Purchase Time:</Text> {new Date(ticket.oraBlerjes).toLocaleString()}</Text>
              <Image style={styles.qrCode} src={qrCodeDataUri} />
              <Text style={styles.note}>
                NUK MBAJME PERGJEGJESI PER MOS PRINTIMIN JO TE RREGULLT OSE DEMTIMIN E BILETES TUAJ
              </Text>
            </View>
            <View style={styles.footer}>
              <Text>Thank you for your purchase! Enjoy the match!</Text>
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

export default TicketPDF;

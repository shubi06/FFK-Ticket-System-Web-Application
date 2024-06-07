// TicketPDF.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Stilimi për PDF-in
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const TicketPDF = ({ tickets }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Payment Successful!</Text>
        <Text>Your Tickets</Text>
        {tickets.length > 0 ? (
          tickets.map(ticket => (
            <View key={ticket.id} style={styles.section}>
              <Text>{ticket.firstName} {ticket.lastName}</Text>
              <Text>Ndeshja: Kosova vs {ticket.ekipiKundershtar}</Text>
              <Text>Numri Uleses: {ticket.numriUlses}</Text>
              <Text>Sektori: {ticket.sektoriUlses}</Text>
              <Text>Cmimi: {ticket.cmimi} EUR</Text>
              <Text>Ora e Blerjes: {new Date(ticket.oraBlerjes).toLocaleString()}</Text>
            </View>
          ))
        ) : (
          <Text>No tickets found</Text>
        )}
      </View>
    </Page>
  </Document>
);

export default TicketPDF;

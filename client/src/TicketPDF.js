import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from "./Logo.png";

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
  }
});

const TicketPDF = ({ tickets }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment Successful!</Text>
        <Text style={styles.subtitle}>Your Football Match Tickets</Text>
      </View>
      <View>
        {tickets.length > 0 ? (
          tickets.map(ticket => (
            <View key={ticket.id} style={styles.section}>
              <View style={styles.ticketHeader}>
                <Text>Ticket for Kosova vs {ticket.ekipiKundershtar}</Text>
              </View>
              <View style={styles.ticket}>
                <Image style={styles.image} src={Logo} />
                <Text style={styles.ticketDetail}><Text style={{ fontWeight: 'bold' }}>Name:</Text> {ticket.firstName} {ticket.lastName}</Text>
                <Text style={styles.ticketDetail}><Text style={{ fontWeight: 'bold' }}>Match:</Text> Kosova vs {ticket.ekipiKundershtar}</Text>
                <Text style={styles.ticketDetail}><Text style={{ fontWeight: 'bold' }}>Seat Number:</Text> {ticket.numriUlses}</Text>
                <Text style={styles.ticketDetail}><Text style={{ fontWeight: 'bold' }}>Sector:</Text> {ticket.sektoriUlses}</Text>
                <Text style={styles.ticketDetail}><Text style={{ fontWeight: 'bold' }}>Price:</Text> {ticket.cmimi} EUR</Text>
                <Text style={styles.ticketDetail}><Text style={{ fontWeight: 'bold' }}>Purchase Time:</Text> {new Date(ticket.oraBlerjes).toLocaleString()}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text>No tickets found</Text>
        )}
      </View>
      <View style={styles.footer}>
        <Text>Thank you for your purchase! Enjoy the match!</Text>
      </View>
    </Page>
  </Document>
);

export default TicketPDF;

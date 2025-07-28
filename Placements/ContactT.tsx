import React from 'react';

// A more professional and organized data structure
const contactData = {
  name: 'Dr. B. Prasad',
  position: 'Dean - Training & Placements, Internships',
  mobile: '9866399942',
  email: 'dean_tp@vignaniit.edu.in',
};

const bgvContact = {
  email: 'vignaniit@yahoo.com',
};

const ContactT: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 3, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ marginBottom: 3 }}>
            Contact Information
          </Typography>
          <TableContainer>
            <Table aria-label="contact table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <TableCell>{contactData.name}</TableCell>
                  <TableCell>{contactData.position}</TableCell>
                  <TableCell>
                    <Link
                      href={`tel:${contactData.mobile}`}
                      sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                    >
                      <Phone sx={{ marginRight: 1, fontSize: '1rem' }} />
                      {contactData.mobile}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`mailto:${contactData.email}`}
                      sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                    >
                      <Email sx={{ marginRight: 1, fontSize: '1rem' }} />
                      {contactData.email}
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={4} p={2} borderLeft={4} borderColor="primary.main" bgcolor="#fff8c6">
            <Typography variant="body1">
              <strong>Note:</strong> For Background Verifications (BGVs), please send a request email to{' '}
              <Link href={`mailto:${bgvContact.email}`}>{bgvContact.email}</Link>.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default ContactT;
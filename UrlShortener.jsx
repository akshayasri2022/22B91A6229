import { useState } from 'react';
import {
  Container, Typography, TextField, Button,
  Box, Grid, Snackbar, Alert, Card, CardContent, Divider, Table, TableHead,
  TableRow, TableCell, TableBody
} from '@mui/material';
import API from '../../../logging-middleware/services/api';
import logger from '../../../logging-middleware/services/logger';
import { Add, Link as LinkIcon } from '@mui/icons-material';

function UrlShortener() {
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', customCode: '' }]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addRow = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', validity: '', customCode: '' }]);
    }
  };

  const handleSubmit = async () => {
    try {
      logger.log('Shorten Request', urls);
      const res = await API.post('/url/shorten-multiple', { urls });
      setResults(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error shortening URLs');
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Card elevation={4} sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
               URL Shortener
            </Typography>

            {urls.map((url, index) => (
              <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                <Grid item xs={12} md={5}>
                  <TextField
                    label="Original Long URL"
                    fullWidth
                    value={url.longUrl}
                    onChange={(e) => handleChange(index, 'longUrl', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Validity (mins)"
                    fullWidth
                    type="number"
                    value={url.validity}
                    onChange={(e) => handleChange(index, 'validity', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Custom Shortcode"
                    fullWidth
                    value={url.customCode}
                    onChange={(e) => handleChange(index, 'customCode', e.target.value)}
                  />
                </Grid>
              </Grid>
            ))}

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={addRow}
                disabled={urls.length >= 5}
              >
                Add URL
              </Button>

              <Button
                variant="contained"
                endIcon={<LinkIcon />}
                onClick={handleSubmit}
              >
                Shorten URLs
              </Button>
            </Box>

            {results.length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                   Shortened URLs
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Original URL</TableCell>
                      <TableCell>Short URL</TableCell>
                      <TableCell>Expiry</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.map((r, i) => (
                      <TableRow key={i} hover>
                        <TableCell>{r.originalUrl}</TableCell>
                        <TableCell>
                          <a href={r.shortUrl} target="_blank" rel="noreferrer">
                            {r.shortUrl}
                          </a>
                        </TableCell>
                        <TableCell>{r.expiry}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </CardContent>
        </Card>

        <Snackbar
          open={!!error}
          autoHideDuration={5000}
          onClose={() => setError('')}
        >
          <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default UrlShortener;

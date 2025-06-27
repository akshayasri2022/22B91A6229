import {
  Container, Typography, Card, CardContent,
  Table, TableHead, TableRow, TableCell, TableBody,
  Box, Divider, Chip
} from '@mui/material';
import { useEffect, useState } from 'react';
import API from '../../../logging-middleware/services/api';
import logger from '../../../logging-middleware/services/logger';

function UrlStatistics() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        logger.log('Fetching stats');
        const res = await API.get('/url/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box mt={5}>
        <Card elevation={4} sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
               URL Shortener Statistics
            </Typography>

            {stats.length === 0 ? (
              <Typography align="center" color="text.secondary">
                No data found. Start shortening URLs first.
              </Typography>
            ) : (
              <>
                <Divider sx={{ mb: 2 }} />
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Short URL</TableCell>
                      <TableCell>Original URL</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell>Expiry</TableCell>
                      <TableCell>Clicks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats.map((row, index) => (
                      <TableRow key={index} hover>
                        <TableCell>
                          <a href={row.shortUrl} target="_blank" rel="noreferrer">
                            {row.shortUrl}
                          </a>
                        </TableCell>
                        <TableCell>{row.originalUrl}</TableCell>
                        <TableCell>{row.createdAt}</TableCell>
                        <TableCell>{row.expiry}</TableCell>
                        <TableCell>
                          <Chip label={`${row.totalClicks} clicks`} color="primary" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                  🔍 Click Details
                </Typography>

                {stats.map((row, index) => (
                  <Box key={index} mb={3}>
                    <Typography variant="subtitle1" gutterBottom>
                      For <strong>{row.shortUrl}</strong>
                    </Typography>
                    {row.clickDetails.length === 0 ? (
                      <Typography color="text.secondary">
                        No clicks yet.
                      </Typography>
                    ) : (
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>Source</TableCell>
                            <TableCell>Location</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {row.clickDetails.map((click, i) => (
                            <TableRow key={i}>
                              <TableCell>{click.timestamp}</TableCell>
                              <TableCell>{click.source}</TableCell>
                              <TableCell>{click.location}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </Box>
                ))}
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default UrlStatistics;

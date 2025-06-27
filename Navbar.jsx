import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
           URL Shortener
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>Shorten</Button>
        <Button color="inherit" onClick={() => navigate('/stats')}>Statistics</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

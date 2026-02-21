import { Typography, Paper, Divider, Button, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { getGreeting, turnOffServer } from '../services/services';

export function LandingPage({ setPage }) {
  const [status, setStatus] = useState('loading...');

  useEffect(() => {
    async function load() {
      const greetingFromServer = await getGreeting();
      if (greetingFromServer === 'Hello World!') {
        setStatus('to program');
      } else {
        setStatus('server no response');
      }
    }
    load();
  }, []);

  function handleToProgram() {
    setPage('main');
  }

  async function handleServerQuit() {
    await turnOffServer();
    await new Promise((r) => setTimeout(r, 250));
    const greetingFromServer = await getGreeting();
    if (greetingFromServer === 'Hello World!') {
      alert('Failed to stop server');
    } else {
      setStatus('Server off');
    }
  }

  return (
    <Paper sx={{ p: 4, pb: 1 }} elevation={3}>
      <Typography variant="h3" align="center">
        <b>
          SIMD
          <br />
          Draw on video
        </b>
      </Typography>
      <Divider>CECS 574-03 </Divider>
      <Typography align="center" variant="subtitle2">
        Professor Pooria Yaghini
      </Typography>

      <Box align="center" sx={{ pt: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleToProgram}
          disabled={status != 'to program'}
        >
          {status}
        </Button>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          sx={{ mt: 1 }}
          onClick={handleServerQuit}
          disabled={status != 'to program'}
        >
          Stop server
        </Button>
      </Box>

      <Typography align="center" sx={{ pt: 2 }}>
        <b>By Kevin Kongwattanachai</b>
      </Typography>
      <Typography variant="subtitle2" align="center">
        CSULB Spring 2026
      </Typography>
    </Paper>
  );
}

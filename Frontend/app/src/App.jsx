import { useState } from 'react';
import { Typography } from '@mui/material';

import { LandingPage } from './landing/landingPage';
import { MainEditor } from './main/mainEditor';

function App() {
  const [page, setPage] = useState('landing');

  function switchPage(navPage) {
    switch (navPage) {
      case 'landing':
        return <LandingPage setPage={setPage} />;
      case 'main':
        return <MainEditor setPage={setPage} />;
      default:
        return (
          <Typography
            color="#ffffff"
            sx={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 1)',
            }}
          >
            Page not found: {navPage}
          </Typography>
        );
    }
  }

  return <div>{switchPage(page)}</div>;
}

export default App;

import { useEffect, useState } from 'react';
import { ToolBar } from './toolbar/toolBar';
import { VideoPreview } from './preview/videoPreview';
import { TopBar } from './topbar/topBar';

import { Grid, Box, Container, Paper } from '@mui/material';

export function MainEditor({ setPage }) {
  const [toolBarWidth, setToolBarWidth] = useState(20);
  const topBarHeight = '4em';

  const [layers, setLayers] = useState([]);
  const [activeLayerId, setActiveLayerId] = useState();

  return (
    <Container
      disableGutters
      sx={{
        minWidth: '100vw',
        minHeight: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
      }}
    >
      <Box display={'flex'} width={'100vw'} height={topBarHeight}>
        <TopBar
          toolBarWidth={toolBarWidth}
          setToolBarWidth={setToolBarWidth}
          setPage={setPage}
          layers={layers}
          setLayers={setLayers}
          activeLayerId={activeLayerId}
          setActiveLayerId={setActiveLayerId}
        />
      </Box>
      <Box
        display={'flex'}
        width={'100vw'}
        style={{ height: `calc(100vh - ${topBarHeight})` }}
      >
        <Box style={{ width: `calc(100vw - ${toolBarWidth}em)` }}>
          <VideoPreview />
        </Box>
        <Box width={`${toolBarWidth}em`}>
          <ToolBar
            layers={layers}
            setLayers={setLayers}
            activeLayerId={activeLayerId}
            setActiveLayerId={setActiveLayerId}
          />
        </Box>
      </Box>
    </Container>
  );
}

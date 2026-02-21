import { useEffect, useState } from 'react';
import { TimeLine } from './timeline/timeLine';
import { ToolBar } from './toolbar/toolBar';
import { VideoPreview } from './preview/videoPreview';
import { TopBar } from './topbar/topBar';

import { Grid, Box, Container, Paper } from '@mui/material';

export function MainEditor() {
  const [toolBarWidth, setToolBarWidth] = useState('20em');
  const [timeLineHeight, setTimeLineHeight] = useState('12em');

  const topBarHeight = '2em';

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
        <TopBar />
      </Box>
      <Box
        display={'flex'}
        width={'100vw'}
        style={{ height: `calc(100vh - ${topBarHeight} - ${timeLineHeight})` }}
      >
        <Box style={{ width: `calc(100vw - ${toolBarWidth})` }}>
          <VideoPreview />
        </Box>
        <Box width={toolBarWidth}>
          <ToolBar />
        </Box>
      </Box>
      <Box display={'flex'} width={'100vw'} height={timeLineHeight}>
        <TimeLine />
      </Box>
    </Container>
  );
}

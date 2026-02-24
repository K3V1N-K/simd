import { Typography, Paper, Divider, Button, Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { fetchFile } from '../../services/services';
import ReactPlayer from 'react-player';

export function VideoPreview({ path, selectedVideo, playerRef }) {
  useEffect(() => {}, [selectedVideo]);

  return (
    <Box height={'100%'}>
      <ReactPlayer
        width={'100%'}
        height={'100%'}
        ref={playerRef}
        controls
        pip={false}
        onTimeUpdate={(e, i) => {
          //console.log(e.target.currentTime);
          console.log(playerRef.current);
          //playerRef.current.currentTime = 10;
          //playerRef.current = 100;
        }}
        src="http://localhost:8080/video?path=./../../../Screen%20Recording%202026-02-03%20at%2011.02.46%E2%80%AFAM.mov"
      />
    </Box>
  );
}

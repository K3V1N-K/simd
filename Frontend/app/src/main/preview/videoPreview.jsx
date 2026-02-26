import {
  Typography,
  Paper,
  Divider,
  Button,
  Box,
  CircularProgress,
  Modal,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { fetchFile } from '../../services/services';
import ReactPlayer from 'react-player';
import CanvasDraw from 'react-canvas-draw';

import { VideoCtrl } from './videoCtrl';
import { DrawingLayer } from './drawingLayers';

export function VideoPreview({
  path,
  selectedVideo,
  playerRef,
  layers,
  activeLayerId,
  brush,
}) {
  const [videoReady, setVideoReady] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [secondsPlayed, setSecondsPlayed] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(0);
  const [playVideo, setPlayVideo] = useState(true);

  useEffect(() => {
    setIsFirstLoad(true);
  }, [path]);

  return (
    <Box height={'100%'}>
      <Box height={'100%'}>
        <ReactPlayer
          width={'100%'}
          height={'calc(100% - 3em)'}
          ref={playerRef}
          pip={false}
          playing={playVideo}
          onPlay={() => {
            setIsVideoPlaying(true);
            console.log('play');
            setIsFirstLoad;
          }}
          onPause={() => {
            setIsVideoPlaying(false);
          }}
          onTimeUpdate={(e) => {
            if (isFirstLoad) {
              playerRef.current.playing = false;
              setIsFirstLoad(false);
              setVideoReady(true);
              setPlayVideo(false);
              console.log(playerRef);
            }
            setSecondsPlayed(playerRef.current.currentTime);
          }}
          src={
            selectedVideo
              ? `http://localhost:8080/video?path=${path.replaceAll(' ', '%') + selectedVideo}`
              : null
          }
        />
        <VideoCtrl
          video={playerRef.current}
          secondsPlayed={secondsPlayed}
          isVideoPlaying={isVideoPlaying}
          playVideo={playVideo}
          setPlayVideo={setPlayVideo}
        />
      </Box>

      <DrawingLayer
        videoPlayer={playerRef.current}
        videoReady={videoReady}
        layers={layers}
        activeLayerId={activeLayerId}
        brush={brush}
      />

      <Modal
        open={!videoReady && selectedVideo}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '9em',
        }}
      >
        <Paper
          sx={{
            flex: 1,
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
            p: 2,
          }}
        >
          <Typography>Video Loading</Typography>
          <CircularProgress />
          <Typography>{selectedVideo}</Typography>
        </Paper>
      </Modal>
    </Box>
  );
}

//<CanvasDraw hideGrid={true} canvasWidth={'calc(100vw - 20em)'} />

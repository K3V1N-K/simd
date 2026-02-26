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

export function DrawingLayer({
  videoPlayer,
  videoReady,
  layers,
  activeLayerId,
  brush,
}) {
  return (
    <>
      {layers.map((layer, i) => (
        <Box
          key={i}
          sx={{
            position: 'relative',
            bottom: `calc((100vh - 4em)*${i + 1} - (3em * ${i}))`,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: layer.id === activeLayerId ? 'auto' : 'none',
            opacity:
              videoPlayer.currentTime >= layer.start &&
              videoPlayer.currentTime <= layer.end
                ? 100
                : 0,
          }}
        >
          {videoReady ? (
            <>
              <CanvasDraw
                ref={layer.drawingRef}
                hideGrid={true}
                sx={{}}
                hideInterface={layer.id != activeLayerId}
                brushColor={brush.color}
                canvasWidth={
                  videoPlayer?.clientWidth > 0
                    ? (videoPlayer.clientHeight * videoPlayer.videoWidth) /
                      videoPlayer.videoHeight
                    : 400
                }
                canvasHeight={
                  videoPlayer?.clientHeight > 0 ? videoPlayer.clientHeight : 400
                }
                backgroundColor={'transparent'}
              />
            </>
          ) : (
            <></>
          )}
        </Box>
      ))}
    </>
  );
}

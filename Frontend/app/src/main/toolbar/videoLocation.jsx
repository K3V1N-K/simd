import {
  Divider,
  Paper,
  Box,
  Slider,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useState, useEffect, useRef } from 'react';

import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import UpgradeIcon from '@mui/icons-material/Upgrade';

export function VideoLocation({ layers, setLayers, activeLayerId, playerRef }) {
  const [currentLayer, setCurrentLayer] = useState(null);

  const handleChange = (_e, newValue) => {
    const newLayers = [...layers];

    const newLayerEditing = newLayers.find(
      (layer) => layer.id === activeLayerId,
    );

    if (newValue[0] != null) newLayerEditing.start = newValue[0];
    if (newValue[1] != null) newLayerEditing.end = newValue[1];

    setLayers(newLayers);
  };

  useEffect(() => {
    setCurrentLayer(layers.find((layer) => layer.id === activeLayerId));
  }, [activeLayerId]);

  return (
    <>
      <Typography align="center" marginTop={2}>
        Start - End
      </Typography>
      <Box sx={{ pr: 4, pl: 4, mt: 4 }}>
        <Slider
          disabled={activeLayerId == undefined}
          value={
            currentLayer != null
              ? [currentLayer.start, currentLayer.end]
              : [0, 1]
          }
          onChange={handleChange}
          valueLabelDisplay="on"
          min={0}
          max={playerRef?.current?.duration ?? 1}
          valueLabelFormat={(e) =>
            currentLayer != null
              ? `${String(Math.floor(e / 60)).padStart(2, '0')}:${String(Math.floor(e % 60)).padStart(2, '0')}`
              : '--:--'
          }
        />
      </Box>
      <Box display={'flex'} justifyContent={'space-around'}>
        <Tooltip
          title="Go to start"
          onClick={() => {
            if (playerRef?.current?.currentTime) {
              playerRef.current.currentTime = currentLayer.start;
            }
          }}
        >
          <IconButton color="primary" disabled={activeLayerId == undefined}>
            <UndoIcon />
          </IconButton>
        </Tooltip>

        <Tooltip
          title="Set start at current time"
          onClick={() => {
            handleChange(null, [playerRef?.current?.currentTime, null]);
          }}
        >
          <IconButton color="primary" disabled={activeLayerId == undefined}>
            <UpgradeIcon />
          </IconButton>
        </Tooltip>
        <Divider orientation="vertical" flexItem />
        <Tooltip
          title="Set end at current time"
          onClick={() => {
            handleChange(null, [null, playerRef?.current?.currentTime]);
          }}
        >
          <IconButton color="primary" disabled={activeLayerId == undefined}>
            <UpgradeIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Go to end">
          <IconButton
            color="primary"
            disabled={activeLayerId == undefined}
            onClick={() => {
              if (playerRef?.current?.currentTime) {
                playerRef.current.currentTime = currentLayer.end;
              }
            }}
          >
            <RedoIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
}

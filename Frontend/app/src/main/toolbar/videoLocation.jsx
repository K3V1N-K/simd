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
  const [value, setValue] = useState([0, 1]);

  const handleChange = (_e, newValue) => {
    const newLayers = [...layers];
    if (newValue[0] != null) newLayers[activeLayerId].start = newValue[0];
    if (newValue[1] != null) newLayers[activeLayerId].end = newValue[1];

    setLayers(newLayers);
  };

  useEffect(() => {
    console.log(activeLayerId);
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
            layers[activeLayerId]
              ? [layers[activeLayerId].start, layers[activeLayerId].end]
              : [0, 1]
          }
          onChange={handleChange}
          valueLabelDisplay="on"
          min={0}
          max={playerRef?.current?.duration ?? 1}
          valueLabelFormat={(e) =>
            `${Math.floor(e / 60)}:${e % 60 < 10 ? '0' : ''}${(e % 60).toFixed(0)}`
          }
        />
      </Box>
      <Box display={'flex'} justifyContent={'space-around'}>
        <Tooltip
          title="Go to start"
          onClick={() => {
            if (playerRef?.current?.currentTime) {
              playerRef.current.currentTime = layers[activeLayerId].start;
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
                playerRef.current.currentTime = layers[activeLayerId].end;
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

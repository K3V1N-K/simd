import { Box, Typography, IconButton, Chip } from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

export function LayerOrderer({ layers, setLayers, activeLayerId }) {
  function handleMoveUp() {
    const currentLayerIdx = layers.findIndex(
      (layer) => layer.id === activeLayerId,
    );
    const currentLayer = { ...layers[currentLayerIdx] };
    const prevLayer = { ...layers[currentLayerIdx - 1] };
    const newLayers = [...layers];
    newLayers[currentLayerIdx - 1] = currentLayer;
    newLayers[currentLayerIdx] = prevLayer;
    setLayers(newLayers);
  }
  function handleMoveDown() {
    const currentLayerIdx = layers.findIndex(
      (layer) => layer.id === activeLayerId,
    );
    const currentLayer = { ...layers[currentLayerIdx] };
    const nextLayer = { ...layers[currentLayerIdx + 1] };
    const newLayers = [...layers];
    newLayers[currentLayerIdx + 1] = currentLayer;
    newLayers[currentLayerIdx] = nextLayer;
    setLayers(newLayers);
  }

  function handleMoveFirst() {
    const currentLayerIdx = layers.findIndex(
      (layer) => layer.id === activeLayerId,
    );
    const currentLayer = { ...layers[currentLayerIdx] };
    const newLayers = [...layers];
    newLayers.splice(currentLayerIdx, 1);
    setLayers([currentLayer, ...newLayers]);
  }
  function handleMoveLast() {
    const currentLayerIdx = layers.findIndex(
      (layer) => layer.id === activeLayerId,
    );
    const currentLayer = { ...layers[currentLayerIdx] };
    const newLayers = [...layers];
    newLayers.splice(currentLayerIdx, 1);
    setLayers([...newLayers, currentLayer]);
  }

  return (
    <>
      <Typography align="center" mt={1}>
        Layer Order
      </Typography>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <IconButton
          size="small"
          disabled={activeLayerId == undefined}
          color="primary"
          onClick={handleMoveFirst}
        >
          <SkipPreviousIcon />
        </IconButton>
        <IconButton
          size="small"
          disabled={
            activeLayerId == undefined ||
            layers.findIndex((layer) => layer.id === activeLayerId) <= 0
          }
          color="primary"
          onClick={handleMoveUp}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <Chip
          variant="outlined"
          sx={{ pl: 2, pr: 2, mr: 1, ml: 1, backgroundColor: '#ffffff' }}
          label={
            activeLayerId == undefined
              ? '-'
              : layers.findIndex((layer) => layer.id === activeLayerId) + 1
          }
        />
        <IconButton
          size="small"
          disabled={
            activeLayerId == undefined ||
            layers.findIndex((layer) => layer.id === activeLayerId) >=
              layers.length - 1
          }
          color="primary"
          onClick={handleMoveDown}
        >
          <NavigateNextIcon />
        </IconButton>
        <IconButton
          size="small"
          disabled={activeLayerId == undefined}
          color="primary"
          onClick={handleMoveLast}
        >
          <SkipNextIcon />
        </IconButton>
      </Box>
    </>
  );
}

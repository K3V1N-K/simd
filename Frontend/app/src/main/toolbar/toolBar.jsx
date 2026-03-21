import { Divider, Paper } from '@mui/material';
import { LayerNamer } from './layerNamer';
import { LayerOrderer } from './layerOrderer';
import { BrushOptions } from './brushOptions';
import { VideoLocation } from './videoLocation';

export function ToolBar({
  layers,
  setLayers,
  activeLayerId,
  setActiveLayerId,
  brush,
  setBrush,
  playerRef,
}) {
  return (
    <Paper elevation={3} sx={{ backgroundColor: '#E5E4E2', height: '100%' }}>
      <LayerNamer
        layers={layers}
        setLayers={setLayers}
        activeLayerId={activeLayerId}
      />

      <LayerOrderer
        layers={layers}
        setLayers={setLayers}
        activeLayerId={activeLayerId}
        setActiveLayerId={setActiveLayerId}
      />
      <VideoLocation
        layers={layers}
        setLayers={setLayers}
        activeLayerId={activeLayerId}
        playerRef={playerRef}
      />
      <BrushOptions brush={brush} setBrush={setBrush} />
    </Paper>
  );
}

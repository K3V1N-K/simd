import { TextField, Paper, Divider, Button, Box } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { LayerNamer } from './layerNamer';

export function ToolBar({
  layers,
  setLayers,
  activeLayerId,
  setActiveLayerId,
}) {
  function handleEdit() {}
  return (
    <Paper elevation={3} sx={{ backgroundColor: '#E5E4E2', height: '100%' }}>
      <LayerNamer
        layers={layers}
        setLayers={setLayers}
        activeLayerId={activeLayerId}
      />
    </Paper>
  );
}

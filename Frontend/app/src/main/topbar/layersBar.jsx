import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, createRef, useState } from 'react';

export function LayersBar({
  layers,
  setActiveLayerId,
  activeLayerId,
  playerRef,
}) {
  return (
    <>
      {layers.map((layer) => (
        <Button
          key={layer.id}
          color="success"
          size="small"
          sx={{ mr: 0.5, textTransform: 'none' }}
          variant={activeLayerId == layer.id ? 'contained' : 'text'}
          onClick={() => {
            setActiveLayerId(layer.id);
          }}
        >
          {layer.name}
        </Button>
      ))}
    </>
  );
}

export function LayersAddButton({ layers, setLayers, playerRef }) {
  function newLayerHandler() {
    console.log(layers);
    setLayers([
      ...layers,
      {
        name: 'New layer ' + layers.length,
        id: layers.length,
        start: 0,
        end: 1000,
        drawingRef: createRef(null),
      },
    ]);
  }

  return (
    <Button
      size="small"
      color="success"
      ml={1}
      sx={{ p: 0 }}
      onClick={newLayerHandler}
    >
      <AddCircleIcon />
    </Button>
  );
}

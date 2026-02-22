import { TextField } from '@mui/material';
import { useState, useEffect, useRef } from 'react';

export function LayerNamer({ layers, setLayers, activeLayerId }) {
  const [name, setName] = useState('');

  useEffect(() => {
    let selectedLayer = layers.find((layer) => layer.id === activeLayerId);

    if (selectedLayer == undefined) {
      setName('No layer selected');
    } else {
      setName(selectedLayer.name);
    }
  }, [activeLayerId]);

  const debouncedName = useRef(null);
  const debouncedInProgress = useRef(false);
  useEffect(() => {
    debouncedName.current = name;
    async function runDebouncedInput() {
      const newLayers = [...layers];
      const editingLayer = newLayers.find(
        (layer) => layer.id === activeLayerId,
      );
      if (!editingLayer?.name) return;

      debouncedInProgress.current = true;
      await new Promise((r) => setTimeout(r, 500)); // sleep 500 ms
      debouncedInProgress.current = false;

      editingLayer.name =
        debouncedName.current.length > 0 ? debouncedName.current : '--';
      setLayers(newLayers);
    }
    if (debouncedInProgress.current === false) runDebouncedInput();
  }, [name]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  return (
    <TextField
      fullWidth
      label="Layer Name"
      variant="filled"
      sx={{ mt: 0 }}
      disabled={name === 'No layer selected'}
      value={name}
      onChange={handleNameChange}
    />
  );
}

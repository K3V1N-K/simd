import { MuiColorInput } from 'mui-color-input';
import { Box, Divider } from '@mui/material';

import { useState, useEffect, useRef } from 'react';

export function BrushOptions({ brush, setBrush }) {
  const handleBrushColorChange = (newValue) => {
    setBrush({ ...brush, color: newValue });
  };
  return (
    <>
      <Divider sx={{ mt: 0 }}>Brush</Divider>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <MuiColorInput
          format="hex"
          value={brush.color}
          onChange={handleBrushColorChange}
        />
      </Box>
    </>
  );
}

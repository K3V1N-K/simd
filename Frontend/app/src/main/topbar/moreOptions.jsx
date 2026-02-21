import {
  Divider,
  Button,
  Box,
  TextField,
  Slider,
  Typography,
} from '@mui/material';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import { useState } from 'react';

export function MoreOptions({ toolBarWidth, setToolBarWidth, setPage }) {
  const [fontSize, setFontSize] = useState(
    parseInt(document.documentElement.style.fontSize) > 0
      ? parseInt(document.documentElement.style.fontSize)
      : 16,
  );

  function setFontSizeHandler(e) {
    let newFontSize = e.target.value;
    if (newFontSize < 6) {
      newFontSize = 6;
    }
    if (newFontSize > 32) {
      newFontSize = 32;
    }
    document.documentElement.style.fontSize = newFontSize + 'px';
    setFontSize(newFontSize);
  }

  function setToolBarWidthHandler(e) {
    setToolBarWidth(e.target.value);
  }

  return (
    <Box sx={{ color: '#000000' }}>
      <Divider sx={{ mt: 0.5, mb: 0.5 }} textAlign="left">
        App Control
      </Divider>
      <Button
        sx={{ mb: 0.5 }}
        fullWidth
        size="small"
        startIcon={<KeyboardReturnIcon />}
        onClick={() => setPage('landing')}
      >
        Back to title
      </Button>
      <Button
        fullWidth
        size="small"
        color="error"
        startIcon={<PowerSettingsNewOutlinedIcon />}
      >
        Shutdown Server
      </Button>
      <Divider sx={{ mt: 0.5, mb: 0.5 }} textAlign="left">
        User Preferences
      </Divider>
      <TextField
        fullWidth
        type="number"
        variant="standard"
        label="Font Size"
        size="small"
        value={parseInt(fontSize)}
        onChange={setFontSizeHandler}
        sx={{ mb: 1 }}
      />
      Toolbar Size
      <Slider
        value={toolBarWidth}
        onChange={setToolBarWidthHandler}
        valueLabelDisplay="auto"
        label="hoi"
        step={1}
        min={12}
        max={64}
      />
    </Box>
  );
}

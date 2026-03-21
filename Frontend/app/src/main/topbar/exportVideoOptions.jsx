import { useEffect, useState } from 'react';

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Box,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FolderIcon from '@mui/icons-material/Folder';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { getFileInPath } from '../../services/services';

export function ExportVideoOptions({
  executeExport,
  layers,
  path,
  selectedVideo,
}) {
  const [simdMode, setSimdMode] = useState('scalar');

  function onExport() {
    console.log(layers, path, selectedVideo);

    const images = [];
    for (const i in layers) {
      let a = layers[i].drawingRef.current.getDataURL('image/jpeg');
      console.log(a);
    }
  }

  return (
    <>
      <FormControl>
        <FormLabel>Processing Mode</FormLabel>
        <RadioGroup defaultValue="female" name="radio-buttons-group">
          <FormControlLabel value="female" control={<Radio />} label="Scalar" />
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="SMID (AVX 256)"
          />
          <FormControlLabel
            value="other"
            control={<Radio />}
            label="SMID (AVX 512)"
          />
        </RadioGroup>
      </FormControl>
      <Button sx={{ width: '100%' }} onClick={executeExport}>
        Export Video
      </Button>
    </>
  );
}

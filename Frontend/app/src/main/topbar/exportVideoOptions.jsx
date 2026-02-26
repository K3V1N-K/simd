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

import { getFileInPath, splitVideo } from '../../services/services';
import { layerToImage } from '../../services/services';

export function ExportVideoOptions({ layers, path, selectedVideo, playerRef }) {
  const [simdMode, setSimdMode] = useState('scalar');

  async function onExport() {
    //layerToImage(layers[0]);

    for (const i in layers) {
      await layerToImage(layers[i], i);
    }

    const res = await splitVideo(path, selectedVideo);
    console.log(res);
  }

  return (
    <>
      <FormControl>
        <FormLabel>Processing Mode</FormLabel>
        <RadioGroup defaultValue="Scalar" name="radio-buttons-group">
          <FormControlLabel value="Scalar" control={<Radio />} label="Scalar" />
          <FormControlLabel
            value="avx256"
            control={<Radio />}
            label="SMID (AVX 256)"
          />
          <FormControlLabel
            value="avx512"
            control={<Radio />}
            label="SMID (AVX 512)"
          />
        </RadioGroup>
      </FormControl>
      <Button sx={{ width: '100%' }} onClick={onExport}>
        {' '}
        Export{' '}
      </Button>
    </>
  );
}

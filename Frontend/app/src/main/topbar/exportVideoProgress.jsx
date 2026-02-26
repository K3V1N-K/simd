import { useEffect, useState } from 'react';

import {
  Divider,
  Button,
  Box,
  IconButton,
  Tooltip,
  Modal,
  Typography,
  Paper,
  TextField,
  Icon,
  InputAdornment,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FolderIcon from '@mui/icons-material/Folder';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { getFileInPath } from '../../services/services';

export function ExportVideoProgress() {
  return (
    <>
      <Paper
        backgroundColor="#ffffff"
        elevation={1}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 1,
          p: 1,
          pl: 3,
          pr: 2,
        }}
      >
        <Box>
          <Typography variant="h6">Decoding</Typography>
          <Typography variant="caption">Status: in progress (0/1)</Typography>
        </Box>
        <CircularProgress />
      </Paper>

      <Paper
        backgroundColor="#ffffff"
        elevation={1}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 1,
          p: 1,
          pl: 3,
          pr: 2,
        }}
      >
        <Box>
          <Typography variant="h6">Processing</Typography>
          <Typography variant="caption">
            Status: in progress (0/3000)
          </Typography>
        </Box>
        <CircularProgress />
      </Paper>

      <Paper
        backgroundColor="#ffffff"
        elevation={1}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 1,
          p: 1,
          pl: 3,
          pr: 2,
        }}
      >
        <Box>
          <Typography variant="h6">Encoding</Typography>
          <Typography variant="caption">Status: waiting...</Typography>
        </Box>
        <CircularProgress />
      </Paper>
    </>
  );
}

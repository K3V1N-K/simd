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
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FolderIcon from '@mui/icons-material/Folder';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { getFileInPath } from '../../services/services';
import { ExportVideoProgress } from './exportVideoProgress';
import { ExportVideoOptions } from './exportVideoOptions';

export function ExportVideoModal({
  exportVideoOpen,
  setExportVideoOpen,
  layers,
  path,
  selectedVideo,
  playerRef,
}) {
  const [tab, setTab] = useState(0);

  function handleClose() {
    setExportVideoOpen(false);
  }

  return (
    <Modal
      open={exportVideoOpen}
      onClose={handleClose}
      onOpen={() => {
        console.log('hi');
      }}
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '32em',
          height: '80vh',
          padding: 1,
          backgroundColor: '#efefef',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: '3em',
            alignItems: 'center',
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ ml: 1 }}
          >
            Export Video
          </Typography>
        </Box>
        <Tabs
          value={tab}
          onChange={(e, v) => {
            setTab(v);
          }}
        >
          <Tab label="Options" />
          <Tab label="Progress" />
        </Tabs>
        {tab === 0 ? (
          <ExportVideoOptions
            layers={layers}
            path={path}
            selectedVideo={selectedVideo}
            playerRef={playerRef}
          />
        ) : (
          <></>
        )}
        {tab === 1 ? <ExportVideoProgress /> : <></>}
      </Paper>
    </Modal>
  );
}

import { useEffect, useRef, useState } from 'react';

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
}) {
  const [tab, setTab] = useState(0);

  function handleClose() {
    setExportVideoOpen(false);
  }

  const [uploadTasks, setUploadTasks] = useState(0);
  const [uploadDone, setUploadDone] = useState(0);
  const [uploadTime, setUploadTime] = useState(0);

  async function executeExport() {
    setUploadTasks(0);
    setUploadDone(0);
    setUploadTime(0);

    setTab(1);

    let timeStart, timeEnd;

    //upload images
    setUploadTasks(layers.length);
    timeStart = performance.now();
    for (const i in layers) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // call here
      setUploadDone(parseInt(i) + 1);
      console.log(uploadDone);
    }
    timeEnd = performance.now();
    setUploadTime(timeEnd - timeStart);
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
            executeExport={executeExport}
          />
        ) : (
          <></>
        )}
        {tab === 1 ? (
          <ExportVideoProgress
            uploadTasks={uploadTasks}
            uploadDone={uploadDone}
            uploadTime={uploadTime}
          />
        ) : (
          <></>
        )}
      </Paper>
    </Modal>
  );
}

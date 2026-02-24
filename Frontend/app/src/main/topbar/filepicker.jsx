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
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FolderIcon from '@mui/icons-material/Folder';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { getFileInPath } from '../../services/services';

export function FilePicker({
  open,
  setOpen,
  mode,
  path,
  setPath,
  selectedVideo,
  setSelectedVideo,
}) {
  const [files, setFiles] = useState([]);

  const [preSelectedPath, setPreSelectedPath] = useState('./');
  const [preSelectedFile, setPreSelectedFile] = useState('');

  function handleClose() {
    setPreSelectedFile('');
    setPreSelectedPath('./');
    setOpen(false);
  }

  function returnHome() {
    setPreSelectedFile('');
    setPreSelectedPath('./');
  }

  useEffect(() => {
    console.log(selectedVideo);
    if (open) {
      setPreSelectedPath(path);
      setPreSelectedFile(selectedVideo);
    }
  }, [open]);

  function handleVideoSelect() {
    setSelectedVideo(preSelectedFile);
    setPath(preSelectedPath);
    handleClose();
  }

  function getTitle() {
    switch (mode) {
      case 'select':
        return 'Select Video File';
      default:
        '';
    }
  }

  useEffect(() => {
    async function fetchFilesList() {
      let files = await getFileInPath(preSelectedPath);
      setFiles(files);
    }
    fetchFilesList();
  }, [preSelectedPath]);

  function goBackADirectory() {
    let pathComponents = preSelectedPath.split('/');
    pathComponents.pop();
    if (
      pathComponents[pathComponents.length - 1] === '.' ||
      pathComponents[pathComponents.length - 1] === '..'
    ) {
      pathComponents.push('..');
    } else {
      pathComponents.pop();
    }
    setPreSelectedFile('');
    setPreSelectedPath(pathComponents.join('/') + '/');
  }

  function onCancel() {
    setPreSelectedPath('./');
    setPreSelectedFile('');
    setOpen(false);
  }

  function isVideoFile(fileName) {
    //this is stupid but im not willing to put in anymore effort
    const supportedFormats = [
      '.mkv',
      '.mov',
      '.mp4',
      '.m4p',
      '.mpeg',
      '.mpg',
      '.avi',
    ];

    for (const i in supportedFormats) {
      if (fileName.includes(supportedFormats[i])) return true;
    }
    return false;
  }

  return (
    <Modal
      open={open}
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
            {getTitle()}
          </Typography>
        </Box>
        <Box display="flex">
          <TextField
            size="small"
            sx={{ backgroundColor: '#ffffff' }}
            fullWidth
            value={preSelectedPath + preSelectedFile}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      size="small"
                      onClick={returnHome}
                      color="primary"
                    >
                      <HomeIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Box
          sx={{
            backgroundColor: '#ffffff',
            height: 'calc(100% - 9em)',
          }}
        >
          <Box
            sx={{
              pr: 3,
              pl: 3,
              pb: 1,
              overflowX: 'scroll',
              maxHeight: 'calc(100% - 1em)',
            }}
          >
            <Button
              fullWidth
              variant="outlined"
              startIcon={<ArrowBackIosIcon />}
              sx={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                textTransform: 'none',
                mt: 1,
              }}
              onClick={goBackADirectory}
            >
              Previous Directory
            </Button>
            {files.map((file) => (
              <Button
                key={file}
                fullWidth
                variant={
                  file === preSelectedFile
                    ? 'contained'
                    : file.includes('.')
                      ? 'text'
                      : 'outlined'
                }
                disabled={file.includes('.') && !isVideoFile(file)}
                startIcon={
                  file.includes('.') ? (
                    isVideoFile(file) ? (
                      <VideoFileIcon
                        sx={{ ml: file === preSelectedFile ? 0 : 1 }}
                      />
                    ) : (
                      <InsertDriveFileIcon
                        sx={{ ml: file === preSelectedFile ? 0 : 1 }}
                      />
                    )
                  ) : (
                    <FolderIcon />
                  )
                }
                sx={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  textTransform: 'none',
                  mt: 1,
                }}
                onClick={() => {
                  if (file.includes('.')) setPreSelectedFile(file);
                  else {
                    setPreSelectedFile('');
                    setPreSelectedPath(preSelectedPath + file + '/');
                  }
                }}
              >
                {file}
              </Button>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            height: '2.5em',
            display: 'flex',
            justifyContent: 'center',
            pt: 1,
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            color="error"
            sx={{ mr: 1 }}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={preSelectedFile === ''}
            sx={{ ml: 1 }}
            onClick={handleVideoSelect}
          >
            Select
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}

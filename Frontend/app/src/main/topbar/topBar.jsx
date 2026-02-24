import { Divider, Button, Box, IconButton, Tooltip } from '@mui/material';

import FileOpenIcon from '@mui/icons-material/FileOpen';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuIcon from '@mui/icons-material/Menu';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';

import { MoreOptions } from './moreOptions';
import { FilePicker } from './filepicker';
import { useState } from 'react';

export function TopBar({
  toolBarWidth,
  setToolBarWidth,
  setPage,
  layers,
  setLayers,
  activeLayerId,
  setActiveLayerId,
  path,
  setPath,
  selectedVideo,
  setSelectedVideo,
}) {
  const [moreIsOpen, setMoreIsOpen] = useState(false);

  const [filePickerOpen, setFilePickerOpen] = useState(false);
  const [filePickerMode, setFilePickerMode] = useState('');

  function handleSelectVideo() {
    setFilePickerMode('select');
    setFilePickerOpen(true);
  }

  function toggleMoreIsOpen() {
    setMoreIsOpen(!moreIsOpen);
  }

  function newLayerHandler() {
    setLayers([
      ...layers,
      {
        name: 'New layer ' + layers.length,
        id: layers.length,
        start: 0,
        end: 1000,
      },
    ]);
  }

  return (
    <>
      <Box
        display={'flex'}
        sx={{ width: '100%', height: '100%', backgroundColor: '#ffffff' }}
        justifyContent={'space-between'}
      >
        <Box display={'flex'}>
          <Button
            sx={{ mr: 1, maxHeight: '100%', textTransform: 'none' }}
            startIcon={<FileOpenIcon />}
            onClick={handleSelectVideo}
          >
            Select video
          </Button>
          <Button
            sx={{ mr: 1, maxHeight: '100%', textTransform: 'none' }}
            startIcon={<SendIcon />}
          >
            Export video
          </Button>

          <Button
            sx={{ mr: 1, maxHeight: '100%', textTransform: 'none' }}
            startIcon={<SimCardDownloadOutlinedIcon />}
          >
            Load work
          </Button>
          <Button
            sx={{ mr: 1, maxHeight: '100%', textTransform: 'none' }}
            startIcon={<SaveOutlinedIcon />}
          >
            Save work
          </Button>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ mr: 1 }}
          />
          <Box
            sx={{
              flex: 1,
              overflowX: 'scroll',
              flexDirection: 'row',
              alignContent: 'center',
            }}
          >
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
          </Box>
          <Button
            size="small"
            color="success"
            ml={1}
            sx={{ p: 0 }}
            onClick={newLayerHandler}
          >
            <AddCircleIcon />
          </Button>
        </Box>
        <Tooltip
          title={
            <MoreOptions
              toolBarWidth={toolBarWidth}
              setToolBarWidth={setToolBarWidth}
              setPage={setPage}
            />
          }
          placement="bottom-end"
          open={moreIsOpen}
          arrow
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: '#ffff',
              },
            },
            arrow: {
              sx: {
                color: '#ffff',
              },
            },
          }}
        >
          <Button
            sx={{ maxHeight: '100%', minWidth: '10em', textTransform: 'none' }}
            endIcon={
              moreIsOpen ? (
                <ExpandLessOutlinedIcon />
              ) : (
                <ExpandMoreOutlinedIcon />
              )
            }
            onClick={toggleMoreIsOpen}
          >
            {moreIsOpen ? 'Less' : 'More'} options
          </Button>
        </Tooltip>
      </Box>

      <FilePicker
        open={filePickerOpen}
        setOpen={setFilePickerOpen}
        mode={filePickerMode}
        path={path}
        setPath={setPath}
        selectedVideo={selectedVideo}
        setSelectedVideo={setSelectedVideo}
      />
    </>
  );
}

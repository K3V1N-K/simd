import { Divider, Button, Box, IconButton, Tooltip } from '@mui/material';

import FileOpenIcon from '@mui/icons-material/FileOpen';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';

import { MoreOptions } from './moreOptions';
import { FilePicker } from './filepicker';
import { useState } from 'react';
import { LayersBar, LayersAddButton } from './layersBar';
import { ExportVideoModal } from './exportVideoModal';

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
  playerRef,
}) {
  const [moreIsOpen, setMoreIsOpen] = useState(false);

  const [filePickerOpen, setFilePickerOpen] = useState(false);
  const [filePickerMode, setFilePickerMode] = useState('');

  const [exportVideoOpen, setExportVideoOpen] = useState(false);

  function handleSelectVideo() {
    setFilePickerMode('select');
    setFilePickerOpen(true);
  }

  function toggleMoreIsOpen() {
    setMoreIsOpen(!moreIsOpen);
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
            onClick={() => {
              setExportVideoOpen(true);
            }}
            disabled={selectedVideo == '' || layers.length == 0}
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
            <LayersBar
              layers={layers}
              setActiveLayerId={setActiveLayerId}
              activeLayerId={activeLayerId}
              playerRef={playerRef}
            />
          </Box>
          <LayersAddButton layers={layers} setLayers={setLayers} />
        </Box>
        <Tooltip
          title={
            <MoreOptions
              toolBarWidth={toolBarWidth}
              setToolBarWidth={setToolBarWidth}
              setPage={setPage}
              playerRef={playerRef}
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

      <ExportVideoModal
        layers={layers}
        path={path}
        selectedVideo={selectedVideo}
        exportVideoOpen={exportVideoOpen}
        setExportVideoOpen={setExportVideoOpen}
      />
    </>
  );
}

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
import { useState } from 'react';

export function TopBar({
  toolBarWidth,
  setToolBarWidth,
  setPage,
  layers,
  setLayers,
}) {
  const [moreIsOpen, setMoreIsOpen] = useState(false);

  function toggleMoreIsOpen() {
    setMoreIsOpen(!moreIsOpen);
  }

  function newLayerHandler() {
    setLayers([
      ...layers,
      {
        name: 'Layer ' + layers.length,
      },
    ]);
  }

  return (
    <Box
      display={'flex'}
      sx={{ width: '100%', height: '100%', backgroundColor: '#ffffff' }}
      justifyContent={'space-between'}
    >
      <Box display={'flex'}>
        <Button
          sx={{ mr: 1, maxHeight: '100%', textTransform: 'none' }}
          startIcon={<FileOpenIcon />}
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
        {layers.map((layer) => (
          <Button color="secondary" sx={{ mr: 0.5, textTransform: 'none' }}>
            {layer.name}
          </Button>
        ))}
        <IconButton
          size="small"
          color="success"
          ml={1}
          onClick={newLayerHandler}
        >
          <AddCircleIcon />
        </IconButton>
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
          sx={{ maxHeight: '100%', textTransform: 'none' }}
          endIcon={
            moreIsOpen ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />
          }
          onClick={toggleMoreIsOpen}
        >
          {moreIsOpen ? 'Less' : 'More'} options
        </Button>
      </Tooltip>
    </Box>
  );
}

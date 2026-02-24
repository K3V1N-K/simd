import { Typography, Paper, Divider, Button, Box } from '@mui/material';
import { useEffect } from 'react';
import { fetchFile } from '../../services/services';

export function VideoPreview({ path, selectedVideo }) {
  useEffect(() => {
    async function getData() {
      let video = await fetchFile(path + selectedVideo);
    }
    getData();
  }, [selectedVideo]);

  return (
    <Box>
      <p>path:{path}</p>
      <p>selectedVideo:{selectedVideo}</p>
    </Box>
  );
}

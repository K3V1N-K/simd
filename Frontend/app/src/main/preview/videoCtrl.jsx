import {
  Box,
  Chip,
  IconButton,
  Paper,
  Slider,
  Typography,
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
export function VideoCtrl({
  video,
  secondsPlayed,
  isVideoPlaying,
  setPlayVideo,
}) {
  return (
    <Box display={'flex'} sx={{ justifyContent: 'center' }}>
      <Paper
        elevation={3}
        sx={{
          width: 'calc(100% - 4em)',
          height: '3em',
          backgroundColor: '#E5E4E2',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton
          size="small"
          sx={{ mr: 2, ml: 1 }}
          color="primary"
          onClick={() => {
            setPlayVideo(!isVideoPlaying);
          }}
        >
          {isVideoPlaying ? (
            <PauseCircleIcon fontSize="large" />
          ) : (
            <PlayCircleIcon fontSize="large" />
          )}
        </IconButton>
        <Slider
          min={0}
          max={video?.duration ? video.duration : 1}
          value={secondsPlayed ?? 0}
          onChange={(_e, v) => {
            video.currentTime = v;
          }}
        />
        <Chip
          sx={{ pl: 1, pr: 1, mr: 1, ml: 1, backgroundColor: '#ffffff' }}
          label={
            video?.currentTime
              ? `${String(Math.floor(video.currentTime / 60)).padStart(2, '0')}:${String(Math.floor(video.currentTime % 60)).padStart(2, '0')}`
              : '--:--'
          }
        />
      </Paper>
    </Box>
  );
}

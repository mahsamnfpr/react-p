import { Stack } from '@mui/material';
import AosAnimated from './AosAnimated';
import NewBanner from './NewBanner';

export default function Home() {
  return (
    <Stack
      justifyContent="flex-start"
      alignItems="center"
      spacing={2} // Use spacing for more consistent gaps between components
      width="100vw" // Full viewport width
      height="100vh" // Full viewport height
      sx={{ overflow: 'auto' }} // Enable scrolling if content overflows
    >
      <NewBanner width="100%" height="50vh" /> {/* Occupy half viewport height for banner */}
      <AosAnimated />
    </Stack>
  );
}

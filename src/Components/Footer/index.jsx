import { Stack, Typography } from '@mui/material'
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Footer() {
  return (
    <>
      <Stack justifyContent={'center'} alignItems={'center'} height={'150px'} bgcolor={'#A6B37D'} color={'#ffff'} zIndex={'1000'}>
        <Typography component={'p'} sx={{ fontSize: '18px', mt: '15px' }}>
          <PhoneIcon sx={{ color: '#ffff' }} /> 051-38449316</Typography>
        <Typography component={'p'} sx={{ fontSize: '18px' }}>
          <LocationOnIcon sx={{ color: '#ffff' }} />Before 11th Kolahdouz, Ahmadabad St
        </Typography>
        <Typography component={'p'} sx={{ fontSize: '18px' }}>2024 All rights reserved</Typography>
        <Typography component={'p'} sx={{ fontSize: '18px',my:'10px' }}>Website Developer: Mahsa Manafpour</Typography>
        
      </Stack>
    </>
  )
}

import { useEffect } from "react"
import AOS from 'aos';
import 'aos/dist/aos.css'
import './style.css'
import { Stack, Typography } from "@mui/material";

export default function AosAnimated() {

    useEffect(() => {
        AOS.init({ duration: 10000 })
    }, [])

    return (

        <Stack sx={{ width: '100%', height: '100vh' }} alignItems={'center'} justifyContent={'center'} mb={'20px'} overflow={'hidden'}>

            <Stack direction={'row'} gap={'10px'} mb={'10px'} data-aos="fade-right" data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000" >
                <Stack alignItems={'center'} justifyContent={'center'} gap={'10px'}  >
                    <Typography variant="h1" component={'h1'} sx={{ fontSize: '19px' }}>When to order?</Typography>
                    <Typography variant="p" component={'p'} sx={{ fontSize: '12px' }}>You should order yor cart at least one month before your wedding party</Typography>
                </Stack>
                <Stack alignItems={'center'} justifyContent={'center'} gap={'10px'}>
                    <img style={{ width: '150px', height: '180px' }} src="https://i.ibb.co/tbJHSJ9/8.jpg " />
                </Stack>
            </Stack>
            <br />
            <br />
            <br />
            <Stack direction={'row'} gap={'10px'} mb={'10px'} data-aos="fade-left" data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000" >
                <Stack alignItems={'center'} justifyContent={'center'} gap={'10px'}  >
                    <Typography variant="h1" component={'h1'} sx={{ fontSize: '19px' }}>When to order?</Typography>
                    <Typography variant="p" component={'p'} sx={{ fontSize: '12px' }}>You should order yor cart at least one month before your wedding party</Typography>
                </Stack>
                <Stack alignItems={'center'} justifyContent={'center'} gap={'10px'}>
                    <img style={{ width: '150px', height: '180px' }} src="https://i.ibb.co/tbJHSJ9/8.jpg " />
                </Stack>
            </Stack>
            <br />
            <br />
            <br />
            <Stack direction={'row'} gap={'10px'} mb={'10px'} data-aos="fade-up" data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000" >
                <Stack alignItems={'center'} justifyContent={'center'} gap={'10px'}  >
                    <Typography variant="h1" component={'h1'} sx={{ fontSize: '19px' }}>When to order?</Typography>
                    <Typography variant="p" component={'p'} sx={{ fontSize: '12px' }}>You should order yor cart at least one month before your wedding party</Typography>
                </Stack>
                <Stack alignItems={'center'} justifyContent={'center'} gap={'10px'}>
                    <img style={{ width: '150px', height: '180px' }} src="https://i.ibb.co/tbJHSJ9/8.jpg " />
                </Stack>
            </Stack>


        </Stack>

    )
}

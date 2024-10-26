import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export const AnimatedCard = ({ name, img, id }) => {
    return (
        <Box
            sx={{
                width: '300px',
                height: '300px',
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 0 20px 5px rgba(0,0,0,.15)',
                '& > img': {
                    width: '100%',
                    height: '100%',
                    transition: 'all .5s',
                },
                '&:hover > img': {
                    filter: 'blur(5px)',
                },
                '& > a': {
                    fontSize: '24px',
                    color: 'white',
                    textShadow: '0 5px 10px rgba(0,0,0,.3)',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    zIndex: 100,
                    opacity: '0',
                    visibility: 'hidden',
                    transition: 'all .5s',
                },
                '&:hover > a': {
                    opacity: '1',
                    visibility: 'visible',
                },
            }}
        >
            <img src={img} alt={name} />
            <Link to={`/products/${id}/${name.replaceAll(' ', '-')}`}>{name}</Link>
        </Box>
    );
};

export default function NewAnimated() {
    const [animated, setAnimate] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:1337/api/contents?populate=*');
            const data = await res.json();
            setAnimate(data.data); // Set the animated state to the data array
        })();
    }, []);

    const animatedItem =
        animated.length > 0
            ? animated.map((animate) => {
                // Access the image URL from ContentImage
                const imageUrl = animate.ContentImage[0]?.url;
                const fullImageUrl = `http://localhost:1337${imageUrl}`; // Prepend with the base URL

                return (
                    <AnimatedCard
                        key={animate.id}
                        name={animate.Name}
                        id={animate.id}
                        img={fullImageUrl}
                    />
                );
            })
            : null;

    return (
        <>
            <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            When to order?
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ color: 'text.secondary' }}
                        >
                            You should order your cart at least one month before your wedding party
                        </Typography>
                    </CardContent>
                </Box>
                <CardMedia>
                    <Stack justifyContent={'space-around'} direction={'row'} flexWrap={'wrap'} gap={'15px'}
                        p={3} sx={{ overflow: 'auto', width: '90%', height: '95%' }} >
                        {animatedItem}
                    </Stack>
                </CardMedia>
            </Card>
        </>
    );
}

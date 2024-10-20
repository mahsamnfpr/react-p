import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Skeleton } from '@mui/material';


export default function SkeletonProduct() {
    return (
        <Card sx={{ width: '350px', height: '450px' }}>
            <Skeleton
                sx={{ width: '100%', height: '50%' }}
                variant='rectangular'
            />
            <CardContent>
                <Skeleton width={'70%'} height={'48px'} animation='wave' />
                <Skeleton width={'50%'} height={'24px'} />
                <Skeleton width={'50%'} height={'24px'} />
            </CardContent>
            <CardActions>
                <Skeleton variant='rounded' width={'50%'} height={'50px'} />
            </CardActions>
        </Card>
    );
}
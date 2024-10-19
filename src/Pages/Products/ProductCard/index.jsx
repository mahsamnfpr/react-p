
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function ProductCard({ name, img, price, discount, id }) {
    return (
        <Card sx={{ width: '350px', height: '450px' }}>
            <CardMedia
                sx={{ width: '100%', height: '50%' }}
                image={img}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" component={discount == 0 ? 'p' : 'del'}
                    sx={{ color: discount == 0 ? 'black' : 'lightgray',
                        textDecoration:discount==0 ? 'none' : 'line-through !important'
                     }}>
                    price : {price}
                </Typography>
                {discount !== 0 && <Typography variant="body2">
                    discountPrice : {price * (1 - discount / 100)}
                </Typography>}
            </CardContent>
            <CardActions>
                <Button size="small"><Link to={`/product-details/${id}/${name.replaceAll(' ', '-')}`}> More Info </Link></Button>
            </CardActions>
        </Card>
    );
}
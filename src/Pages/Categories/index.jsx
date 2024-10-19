import { useEffect, useState } from 'react';
import fetchData from '../../Utilies/FetchData';
import { Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';


export const CategoriesCart = ({ name, img, id }) => {
  return (
    <Box
      sx={{
        width: '270px',
        height: '270px',
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

export default function Categories() {
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetchData('categories?populate=*');
      setCategories(res.data);
    })();
  }, []);

  const catItems =
    Categories.length > 0
      ? Categories.map((category, index) => {
          const imageUrl = category.Image[0].url; // Use medium size or default
          const fullImageUrl = `http://localhost:1337${imageUrl}`; // Prepend with the base URL
          
          return (
            <CategoriesCart
              key={index}
              name={category.Name}
              id={category.id}
              img={fullImageUrl}
            />
          );
        })
      : null;

  return (
    <>
      <Stack justifyContent={'space-around'} direction={'row'} flexWrap={'wrap'} gap={'10px'} p={3} sx={{mt:10, mb:10}}>
        {catItems}
      </Stack>
    </>
  );
}

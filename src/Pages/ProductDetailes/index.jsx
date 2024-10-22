import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import fetchData from '../../Utilies/FetchData'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Stack, Typography } from '@mui/material'
import { removeItem } from '../../Store/Slices/Cart'
import { addItem } from '../../Store/Slices/Cart'

export default function ProductDetails() {

  const { id } = useParams()
  const [product, setProduct] = useState()

  const dispatch = useDispatch()

  const quantity = useSelector(state => state.cart.list)?.
    filter((e) => e.id == id)[0]?.quantity

  useEffect(() => {
    (async () => {
      const res = await fetchData(`products?populate=*&&filters[id][$eq]=${id}`)
      setProduct(res.data[0])
      console.log(res.data)

    })()
  }, [id])

  return (
    <>
      {product ?
        <>
          <Stack direction={{ xs: 'column', md: 'row' }}
            alignItems={'center'}
            justifyContent={'center'}
            gap={'15px'}
            my={'20px'}
            sx={{ width: '90vw', height: '100%' }}
          >
            <Box sx={{ width: { xs: '80%', md: '50%' }, height: { xs: '40%', md: '70%' } }} alignItems={'center'} justifyContent={'center'}>
              <img style={{ width: '80%', height: '80%', borderRadius: '10px' }}
                src={import.meta.env.VITE_BASE_URL + product?.Images[0].formats.large.url} alt={product?.Name} />
            </Box>
            <Stack alignItems={'center'} justifyContent={'center'} gap={'10px'}>
              <Typography variant='h2' component={'h1'} fontSize={'18px'}>
                {product?.Name}
              </Typography>
              
              <Typography variant='body2'>
                price: {product?.Price} $
              </Typography>
              {product?.Discount > 0 &&
                <>
                  <Typography variant='body2'>
                    Discount Price: {product?.Price * (1 - product?.Discount / 100)} $
                  </Typography>
                </>}
              <Stack direction={'row'} alignItems={'center'}>
                {quantity &&
                  <>
                    <Button sx={{ mx: '10px' }}
                      onClick={() => dispatch(removeItem(id))}
                      variant='contained'
                      color='error'>-</Button>
                    <Typography>{quantity}</Typography>
                  </>}
                <Button sx={{ mx: '10px' }}
                  onClick={() => dispatch(addItem(product))}
                  variant='contained'
                  color='success'>+</Button>
              </Stack>
            </Stack>
          </Stack>
        </>
        :
        <>
        </>
      }
    </>
  )
}

import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../Store/Slices/Auth"
import { Box, Button, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



export default function Navbar() {
  const { token } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const listLength = useSelector(state => state.cart.list)?.length

  return (
    <>
      <Stack direction={'row'}
        justifyContent={'space-between'}
        px={'20px'}
        component={'nav'}
        gap={'10px'}
        alignItems={'center'}
        bgcolor={'#A6B37D'}
        sx={{
          height: '60px',
          zIndex: '1000'
          // width: {
          //   xs: '500px', md: '800px'
          // },
          // display: {
          //   xs: 'none', md: 'flex'
          // }
        }}>

        <Stack direction={'row'} gap={'15px'} alignItems={'center'}>
          <Typography component={'h1'}>AbrarCard</Typography>
          <Button varient="text"><Link style={{ color: 'white' }} to={'/'}>Home</Link></Button>
          <Button varient="text"><Link style={{ color: 'white' }} to={'/products/:all-product/:all-category'}>Products</Link></Button>
          <Button varient="text"><Link style={{ color: 'white' }} to={'/categories'}>Category</Link></Button>
          {token ?
            <Button onClick={() => dispatch(logout())}><Typography component={'span'} color={'white'}>LogOut</Typography></Button>
            :
            <Button varient="text"><Link style={{ color: 'white' }} to={'/auth'}>SignIn/SinUp</Link></Button>
          }

        </Stack>

        <Stack>
          <Box></Box>
          <Box>
            <Link to={'cart'}>
              <Badge badgeContent={listLength} color="warning">
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </Box>
        </Stack>
      </Stack>
    </>
  )
}

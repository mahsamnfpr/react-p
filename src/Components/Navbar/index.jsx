import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../Store/Slices/Auth"
import { Box, Button, Input, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useEffect, useState } from "react"
import fetchData from "../../Utilies/FetchData"

export const SearchCart = ({ name, id, img }) => (
    <Link
    to={`/product-details/${id}/${name.replaceAll(" ", "-")}`}
    style={{ display: "inline-block", width: "100%", height: "70px" }}
  >
      <Stack height={'100%'} direction={'row'} alignItems={'center'}
      justifyContent={'space-between'} px={'5px'}>
        <img src={img} style={{height:'100%' , width:'70px'}} alt={name}/>
        <Typography
        style={{textAlign:'center', fontSize:'14px', color:'black'}}
        >
          {name}
        </Typography>
      </Stack>
  </Link>
);

export default function Navbar() {
  const { token } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const listLength = useSelector(state => state.cart.list)?.length

  const [searchInp, setSearchInp] = useState()
  const [resultSearch , setResultSearch] = useState()

  window.addEventListener('click', (e)=>{
    if(!e.target.closest('.searchBox') ){
      setSearchInp('')
    }
  })

  useEffect(()=>{
    if(searchInp){
      (async()=> {
        const res = await fetchData(`products?populate=*&filters[Name][$containsi]=${searchInp}&
          pagination[page]=1&pagination[pageSize]=3`)

          setResultSearch(res.data)
          console.log(res.data);
      })()

    }
  },[searchInp])

  const items = resultSearch?.map((e, index)=>(
    <SearchCart key={index} 
    id={e?.id}
    name={e.Name} img=
    {import.meta.env.VITE_BASE_URL + e?.Images[0].url}
    />
  ))

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

        <Stack direction={'row'} alignItems={'center'} gap={'20px'}>
          <Box className='searchBox' mx={'10px'} sx={{position:'relative'}}>
            <Input
            value={searchInp}
            onChange={(e)=> setSearchInp(e.target.value)}
            sx={{
              backgroundColor:'white',
              borderRadius:'10px',
              p: '3px 10px',
              overflow:'hidden'
            }}
            />
            <Stack className="searchStack"
            gap={'10px'}
            sx={{
              position: 'absolute',
              overflow:'hidden',
              top:'100%',
              left:'0%',
              width:'100%',
              height: searchInp ? '300px': '0',
              backgroundColor:'white',
              zIndex:1000000,
              boxShadow:'0 10px 20px 2px rgba(0,0,0,.2)',
              borderRadius:'0 0 10px 10px',
              transition:'all .5s'


            }}>
            {items}
            <Link to={`/search/${searchInp}`}>Show More Product</Link>
            </Stack>

          </Box>
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

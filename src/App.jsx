import { Box, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { Route, Navigate, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Categories from './Pages/Categories'
import Products from './Pages/Products'
import ProductDetails from'./Pages/ProductDetailes'
import Cart from './Pages/Cart'
import Auth from './Pages/Auth'
import Search from './Pages/Search'
import NotFound from './Pages/NotFound'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { InfinitySpin } from 'react-loader-spinner'
import { useState, useEffect } from 'react'


export default function App() {
  const { token } = useSelector(state => state.auth)


  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },4000)
  },[])

  return (
    <>

      <Navbar /> 
      <Stack alignItems={'center'} justifyContent={'center'} ml={'450px'}>
        {loading ?<InfinitySpin
      visible={true}
      width="600"
      color="#B99470"
      textAlign='center'
      ariaLabel="infinity-spin-loading"/>
    :
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/products/:categoryId/:categoryName" element={<Products />} />
      <Route path="/product-details/:id/:name" element={<ProductDetails />} />
      <Route path="/cart" element={token ? <Cart /> : <Navigate to={'/auth'} />} />
      <Route path="/auth" element={!token ? <Auth /> : <Navigate to={'/'} />} />
      <Route path="/search/:query" element={<Search />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Box>
     }
      
      </Stack>

    
      
      <Footer />

    </>
  )
}

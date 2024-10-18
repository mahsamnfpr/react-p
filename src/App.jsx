import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { Route, Navigate, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Categories from './Pages/Categories'
import Products from './Pages/Products'
import Cart from './Pages/Cart'
import Auth from './Pages/Auth'
import Search from './Pages/Search'
import NotFound from './Pages/NotFound'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

export default function App() {
  const { token } = useSelector(state => state.auth)
  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products/:categoryId/:categoryName" element={<Products />} />
          <Route path="/cart" element={token ? <Cart /> : <Navigate to={'/auth'} />} />
          <Route path="/auth" element={!token ? <Auth /> : <Navigate to={'/'} />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />

    </>
  )
}

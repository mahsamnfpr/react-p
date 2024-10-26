import { useDispatch, useSelector } from "react-redux"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, TableFooter, Typography } from "@mui/material";
import { addItem, clear, removeItem } from "../../Store/Slices/Cart";
import { RotatingSquare } from "react-loader-spinner";

export default function Cart() {
  const { list } = useSelector(state => state.cart)
  const dispatch = useDispatch()


  let totalPrice = 0

  const items = list?.map((e, index) => {
    totalPrice += e?.Price * (1 - e?.Discount / 100) * e?.quantity;
    return <TableRow key={index}>
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell align="center">{e.Name}</TableCell>
      <TableCell align="center">
        <img
          style={{ width: '60px', height: '60px' }}
          src={import.meta.env.VITE_BASE_URL + e?.Images[0].url} />
      </TableCell>
      <TableCell align="center">{e?.Price * (1 - e?.Discount / 100)}</TableCell>
      <TableCell align="center">{e.quantity}</TableCell>
      <TableCell align="center">$ {e?.Price * (1 - e?.Discount / 100) * e.quantity}</TableCell>
      <TableCell align="center">
        <Button sx={{ mx: '10px' }}
          onClick={() => dispatch(removeItem(e.Id))}
          variant='contained'
          color='error'>-</Button>
        <Button sx={{ mx: '10px' }}
          onClick={() => dispatch(addItem(e))}
          variant='contained'
          color='success'>+</Button>
      </TableCell>
    </TableRow>
  })

  return (
    <>
      {list.length > 0 ?
        <>
          <TableContainer component={Paper} sx={{width:{xs:'500px', md:'900px'}, ml:{xs:'30px'}}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Product Name</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Total Price</TableCell>
                  <TableCell align="center">Add/Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items}
              </TableBody>
              <TableFooter>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">Total Price: </TableCell>
                <TableCell align="center">{totalPrice} </TableCell>

              </TableFooter>
            </Table>
          </TableContainer>
          <Button size='large'
          variant='contained'
          color='error'
          sx={{margin:'50px'}}
          onClick={()=>dispatch(clear())}>Clear Cart</Button>
        </>
        :
        <>
        <Box>
          <RotatingSquare
         visible={true}
         height="100"
         width="100"
         color="#A6B37D"
         ariaLabel="rotating-square-loading"
         wrapperStyle={{}}
         wrapperClass=""/>
         </Box>
          <Typography component={'h2'}>your cart is empty</Typography>
        </>}

    </>
  )
}







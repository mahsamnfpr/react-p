import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import fetchData from "../../Utilies/FetchData"
import ProductCard from "./ProductCard"
import { Stack, Typography } from "@mui/material"
import SkeletonProduct from "./Skeleton"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';

export default function Search() {
  const [products, setProducts] = useState([]); // Default to an empty array
  const { query } = useParams();
  const [sortBy, setSortBy] = useState('createdAt:desc');
  const [price, setPrice] = useState([0, 1200000]);

  const loading = [];
  for (let i = 0; i < 8; i++) {
    loading.push(<SkeletonProduct key={i} />);
  }

  const handleChangeSort = (event) => {
    setSortBy(event.target.value);
  };

  const handleChangePrice = (event, newValue) => {
    setPrice(newValue);
  };

  function valuetextPrice(value) {
    return `$${value}`;
  }

  const marks = [];
  for (let i = 0; i <= 1200000; i += 100000) {
    marks.push({ value: i, label: `$${i}` });
  }

  useEffect(() => {
    (async () => {
      const res = await fetchData(`products?populate=*&filters[Price][$gte]=${price[0]}&filters[Price][$lte]=${price[1]}&filters[Name][$containsi]=${query}`);
      setProducts(res.data); // Ensure res.data is an array
      console.log(res.data);
    })();
  }, [query, sortBy, price]);

  const items = products?.map((e, index) => (
    <ProductCard 
      key={e.id} 
      id={e.id} 
      name={e.Name}  // Fix: Use `e.Name` for the product name
      price={e.Price}  // Fix: Use `e.Price` for the price
      discount={e.Discount || 0}  // Handle null discount
      img={e?.Images?.[0]?.url ? import.meta.env.VITE_BASE_URL + e.Images[0].url : '/default_image.jpg'}  // Handle empty Images array
    />
  ));

  return (
    <>
    <Stack sx={{width:"90%", height:'95%', overflow:'auto'}}>
      <Stack my={'10px'}>
        {products.length > 0 ? (
          <>
            <Stack sx={{}}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="sort-select-label">Sort</InputLabel>
                  <Select
                    labelId="sort-select-label"
                    id="sort-select"
                    value={sortBy}
                    label="SortBy"
                    onChange={handleChangeSort}
                  >
                    <MenuItem value={'Price:desc'}>Highest Price</MenuItem>
                    <MenuItem value={'Price:asc'}>Lowest Price</MenuItem>
                    <MenuItem value={'createdAt:desc'}>Newest</MenuItem>
                    <MenuItem value={'Discount:desc'}>Most Discount</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Stack direction={'row'} gap={'20px'} mx={'auto'} sx={{ width: '90%', mt:'10px'}}>
                <Typography component={'span'}>Price: </Typography>
                <Slider
                  getAriaLabel={() => 'Price range'}
                  value={price}
                  onChange={handleChangePrice}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetextPrice}
                  min={0}
                  max={1200000}
                  step={50000}
                  marks={marks}
                />
              </Stack>
            </Stack>
            <Stack justifyContent={'space-around'} gap={'10px'} flexWrap={'wrap'} direction={'row'} mt={'20px'}>
              {items}
            </Stack>
          </>
        ) : (
          <Stack direction={'row'} flexWrap={'wrap'} gap={'10px'} justifyContent={'center'}>
            {loading}
          </Stack>
        )}
      </Stack>
      </Stack>
    </>
  );
}

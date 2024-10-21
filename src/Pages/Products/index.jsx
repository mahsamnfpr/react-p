import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../../Utilies/FetchData'; // Ensure fetchData is properly configured to handle base URLs
import ProductCard from './ProductCard';
import { Stack, Box, InputLabel, MenuItem, FormControl, Select, Slider, Typography } from '@mui/material'; // Added Typography for label
import SkeletonProduct from './Skeleton';

export default function Products() {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();  // Extract categoryId from URL params
  const loading = [];
  for (let i = 0; i < 8; i++) {
    loading.push(<SkeletonProduct key={i} />);
  }

  // State for sorting
  const [sortBy, setSortBy] = useState('createdAt:desc');

  // State for price filtering
  const [price, setPrice] = useState([0, 1200000]);

  // Handle sorting change
  const handleChangeSort = (event) => {
    setSortBy(event.target.value);
  };

  // Handle price range change
  const handleChangePrice = (event, newValue) => {
    setPrice(newValue);
  };

  // Price range label function
  function valuetextPrice(value) {
    return `$${value}`;
  }

  // Marks for the slider
  const marks = [];
  for (let i = 0; i <= 1200000; i += 100000) {
    marks.push({ value: i, label: `$${i}` });
  }

  useEffect(() => {
    (async () => {
      try {
        // Sanitize the categoryId from URL params
        const sanitizedCategoryId = categoryId?.replace(':', '');

        // Log for debugging
        console.log('categoryId:', sanitizedCategoryId);

        // Construct the base query for products
        let query = `products?populate=*`;

        // If a specific category is selected, add the filter for the category
        if (sanitizedCategoryId && sanitizedCategoryId !== 'all-product') {
          query += `&filters[categories][id][$eq]=${sanitizedCategoryId}`;
        }

        // // Append price range and sorting filters
        query += `&filters[Price][$gte]=${price[0]}&filters[Price][$lte]=${price[1]}&sort=${sortBy}`;

        // Log the final query URL for debugging
        console.log('API query:', query);

        // Fetch the products from the API (ensuring correct URL format)
        const res = await fetchData(`${query}`);

        // Log the response from the API for debugging
        console.log('API response:', res);

        if (res && res.data && res.data.length > 0) {
          setProducts(res.data); // Set products if data is available
        } else {
          console.warn('No products found for the given category.');
          setProducts([]); // Set an empty array if no products are found
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    })();
  }, [categoryId, sortBy, price]);

  // Map over the products and render each product card
  const items = products?.map((product, index) => {
    const imageUrl = product.Images?.[0]?.formats?.large?.url
      ? `http://localhost:1337${product.Images[0].formats.large.url}`
      : 'default-image-path'; // Fallback image if none exists

    return (

      
      <ProductCard
        key={index}
        id={product.id}
        name={product.Name}  // Access Name property
        price={product.Price}  // Access Price property
        discount={product.Discount}  // Access Discount if available
        img={imageUrl}  // Pass the correct image URL
      />
    );
  });

  return (
    <>
    <Stack sx={{width:"90%", height:'95%', mt:'10px',mb:'10px', overflow:'auto'}}>
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
              <Stack direction={'row'} gap={'20px'} mx={'auto'} sx={{ width: '90%' }}>
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
            <Stack justifyContent={'space-around'} gap={'10px'} flexWrap={'wrap'} direction={'row'}>
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

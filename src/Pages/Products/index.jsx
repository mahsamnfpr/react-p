import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../../Utilies/FetchData';
import ProductCard from './ProductCard';
import { Stack } from '@mui/material';

export default function Products() {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();  // Extract categoryId from URL params

  useEffect(() => {
    (async () => {
      try {
        // Fetch products with correct filtering based on categoryId
        const query = `products?populate=*&${categoryId === 'all-products' ? '' : `filters[categories][id][$eq]=${categoryId}`}`;
        const res = await fetchData(query);
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    })();
  }, [categoryId]);

  const items = products?.map((product, index) => {
    // Correctly extract the image URL from the API response structure
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
      <Stack my={'10px'}>
        <Stack></Stack>
        <Stack justifyContent={'space-around'} gap={'10px'} flexWrap={'wrap'} direction={'row'}>
          {items}
        </Stack>
      </Stack>
    </>
  );
}

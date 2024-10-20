import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../../Utilies/FetchData';
import ProductCard from './ProductCard';
import { Stack } from '@mui/material';
import SkeletonProduct from './Skeleton';

export default function Products() {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();  // Extract categoryId from URL params
  const loading = [];
  for (let i = 0; i < 8; i++) {
    loading.push(<SkeletonProduct key={i} />);
  }

  useEffect(() => {
    (async () => {
      try {
        // Make sure categoryId matches exactly what you expect
        const sanitizedCategoryId = categoryId?.replace(':', '');

        // Log for debugging
        console.log('categoryId:', sanitizedCategoryId);

        // Construct the query based on sanitizedCategoryId
        let query = `products?populate=*`;
        if (sanitizedCategoryId && sanitizedCategoryId !== 'all-product') {
          query += `&filters[categories][id][$eq]=${sanitizedCategoryId}`;
        }

        console.log('API query:', query);  // Log the query for debugging

        const res = await fetchData(query);
        console.log('API response:', res);  // Log the API response for debugging

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
  }, [categoryId]);

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
      <Stack my={'10px'}>
        {products.length > 0 ? (
          <>
            <Stack></Stack>
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
    </>
  );
}

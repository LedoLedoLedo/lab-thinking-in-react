import React from 'react';
import { useState } from 'react';
import jsonData from '../data.json';
import ProductTable from './ProductTable';
import productsData from '../data.json';
import Searchbar from './SearchBar';


function ProductsPage() {
  const [products, setProducts] = useState(productsData);

  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const [search, setSearch] = useState('');

  const [filterInStock, setFilterInStock] = useState(false);

  const updateSearchAndFilter = (event) => {
    let newFilteredProductsArray;

    if (filterInStock) {
      newFilteredProductsArray = products.filter((individualProduct) => {
        return (
          individualProduct.name
            .toLowerCase()
            .includes(event.currentTarget.value.toLowerCase()) &&
          individualProduct.inStock
        );
      });
    } else {
      newFilteredProductsArray = products.filter((individualProduct) => {
        return individualProduct.name
          .toLowerCase()
          .includes(event.currentTarget.value.toLowerCase());
      });
    }

    setFilteredProducts(newFilteredProductsArray);

    setSearch(event.currentTarget.value);
  };

  const updateFilterInStock = (event) => {
    let newFilteredProductsArray;

    if (event.currentTarget.checked) {
      newFilteredProductsArray = products.filter((individualProduct) => {
        return (
          individualProduct.name.toLowerCase().includes(search.toLowerCase()) &&
          individualProduct.inStock
        );
      });
    } else {
      newFilteredProductsArray = products.filter((individualProduct) => {
        return individualProduct.name
          .toLowerCase()
          .includes(search.toLowerCase());
      });
    }

    setFilteredProducts(newFilteredProductsArray);
    setFilterInStock(event.currentTarget.checked);
  };
  return (
    <div  >
      <h1>IronStore </h1>
      <Searchbar
        search={search} 
        updateSearchAndFilter={updateSearchAndFilter}
        filterInStock={filterInStock}
        updateFilterInStock={updateFilterInStock}
      />
      <ProductTable products={filteredProducts} />
    </div>
  );
}

export default ProductsPage;
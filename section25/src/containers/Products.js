import React, { useContext } from "react";

import ProductItem from "../components/Products/ProductItem";
//import { ProductsContext } from "../context/products-context"; // 이거 Import 하고, useSelector 지움
import { useStore } from "../hooks-store/store";
import "./Products.css";

const Products = (props) => {
  //const productList = useSelector((state) => state.shop.products);
  //const productList = useContext(ProductsContext).products; //products에 접근
  const state = useStore()[0];
  return (
    <ul className='products-list'>
      {state.products.map((prod) => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;

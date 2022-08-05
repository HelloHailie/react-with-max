import React, { useState } from "react";

// context API에서 쓸 Context 객체 만들어주기
export const ProductsContext = React.createContext({
  products: [],
  toggleFav: (id) => {},
});

//컨텍스트 자체는 컴포넌트가 되지 않는다. 그래서 <컨텍스트명.Provider> 로 감싸준다.
export default (props) => {
  const [productsList, setProductsList] = useState([
    {
      id: "p1",
      title: "Red Scarf",
      description: "A pretty red scarf.",
      isFavorite: false,
    },
    {
      id: "p2",
      title: "Blue T-Shirt",
      description: "A pretty blue t-shirt.",
      isFavorite: false,
    },
    {
      id: "p3",
      title: "Green Trousers",
      description: "A pair of lightly green trousers.",
      isFavorite: false,
    },
    {
      id: "p4",
      title: "Orange Hat",
      description: "Street style! An orange hat.",
      isFavorite: false,
    },
  ]); // 여기서 관리하는 state는 products 배열이다.

  const toggleFavorite = (productId) => {
    setProductsList((currentProdList) => {
      const prodIndex = currentProdList.findIndex((p) => p.id === productId);
      const newFavStatus = !currentProdList[prodIndex].isFavorite;
      const updatedProducts = [...currentProdList];
      updatedProducts[prodIndex] = {
        ...currentProdList[prodIndex],
        isFavorite: newFavStatus,
      };
      return updatedProducts;
    });
  };

  return (
    <ProductsContext.Provider
      value={{ products: productsList, toggleFav: toggleFavorite }}
    >
      {/* state가 변경될때마다 Provider는 새로운 값 가지게 되고, Provider를 따르는 모든 자식들도 그 새로운 값을 가지게 된다. */}
      {props.children}
    </ProductsContext.Provider>
  ); // 해석: 이 컨텍스트를 모든 곳에 제공할거다.
};

//value 값은 이 컴포넌트 안에서 관리하는 값이다.
// 그래서 그 값은 바뀔 수 있어야하니까 useState 사용하기

import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  //렌더링이 두번 된다. 왜냐면 Search 컴포넌트에서도 가지고 오기 때문이다.
  // useEffect(() => {
  //   fetch(
  //     "https://react-hooks-update-with-max-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json"
  //   )
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       const loadedIngredients = [];
  //       for (const key in responseData) {
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount,
  //         });
  //       }
  //       setUserIngredients(loadedIngredients);
  //     });
  // }, []);

  useEffect(() => {
    console.log("rendering", userIngredients);
  }, [userIngredients]);

  //callback hook을 사용했기 때문에 Ingredients 컴포넌트가 리렌더링되도,이 함수는 새로 생성되지 않았기 때문에 값이 변하지 않는다.
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = (ingredient) => {
    fetch(
      "https://react-hooks-update-with-max-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
          //{ id: Math.random().toString(), ...ingredient },
        ]);
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    setUserIngredients((prevIngredients) => {
      prevIngredients.filter((ingredient) => ingredient.id !== ingredientId);
    });
  };

  return (
    <div className='App'>
      <IngredientForm onAddIngredientHandler={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {/* Need to add list here! */}
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;

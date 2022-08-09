import React, {
  useReducer,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
//reducer는 여러개의 입력을 받아 하나의 결과를 반환하는 함수다.
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

//라듀서는 컴포넌트 밖에 정의힌다. 컴포넌트가 렌더링될 때마다 리듀서 함수가 다시 생성되지 않도록/ 근데 props를 받으면 컴포넌트 안에도 오케이
const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...curHttpState, loading: false }; //기존 state에서 누락되는 값이 없도록
    case "ERROR":
      return { loading: false, error: action.errorMessage }; //기존 state에서 누락되는 값이 없도록
    case "CLEAR":
      return { ...curHttpState, error: null };
    default:
      throw new Error("Should not be reached!"); //이거 뜨면 처리되지 않은 액션이 디스패치 된거다.
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  //state들을 따로 관리하지만 동시에 업데이트한다.
  //const [userIngredients, setUserIngredients] = useState([]);

  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });
  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState(null);

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
    //setUserIngredients(filteredIngredients);
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = useCallback((ingredient) => {
    //setIsLoading(true);
    dispatchHttp({ type: "SEND" });
    fetch(
      "https://react-hooks-update-with-max-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        //setIsLoading(false);
        dispatchHttp({ type: "RESPONSE" });
        return response.json();
      })
      .then((responseData) => {
        // setUserIngredients((prevIngredients) => [
        //   ...prevIngredients,
        //   { id: responseData.name, ...ingredient },
        //   //{ id: Math.random().toString(), ...ingredient },
        // ]);
        dispatch({
          type: "ADD",
          ingredient: { id: responseData.name, ...ingredient },
        });
      });
  }, []);

  const removeIngredientHandler = useCallback((ingredientId) => {
    //setIsLoading(true);
    dispatchHttp({ type: "SEND" });
    fetch(
      `https://react-hooks-update-with-max-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients/${ingredientId}.json`,
      {
        method: "DELETE", // delete는 body, header 필요없다.
      }
    )
      .then((response) => {
        //setIsLoading(false);
        dispatchHttp({ type: "RESPONSE" });

        // setUserIngredients((prevIngredients) =>
        //   prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
        // );
        dispatch({ type: "DELETE", id: ingredientId });
      })
      .catch(
        (
          error //setError(error.message), setIsLoading(false))
        ) => dispatchHttp({ type: "ERROR", errorMessage: error.message })
      );
  }, []);

  const clearError = useCallback(() => {
    //setError(null);
    dispatchHttp({ type: "CLEAR" });
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className='App'>
      {/* {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>} */}
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}

      <IngredientForm
        onAddIngredientHandler={addIngredientHandler}
        // loading={isLoading}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {/* Need to add list here! */}
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;

import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngredients } = props; //onLoadIngredients함수가 바뀔 때마다 렌더링하고 싶다. 객체 구조분해할당으로 써줌
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    //firebase는 필러링을 지원한다.

    //입력된 내용이 타이머가 시작된 시점에 입력된 내용과 같으면 사용자가 입력을 멈췄다는 뜻이니까 그때만 요청을 보낸다.
    const timer = setTimeout(() => {
      // 0.5초 후 확인 하는 코드
      //타이머가 설정된 때 유저가 입력한 값 === 유저가 현재 입력한 코드
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        fetch(
          "https://react-hooks-update-with-max-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json" +
            query
        )
          .then((response) => response.json())
          .then((responseData) => {
            const loadedIngredients = [];
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
            }
            // Ingredients 컴포넌트에서 불러온다. 여기서 관리하니까
            onLoadIngredients(loadedIngredients);
          });
      }
    }, 500);
    //useEffect는 함수를 반환할 수 있다.(clean up 함수)
    //동일한 useEffect함수가 다시 실행되기 전에 실행된다.
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onLoadIngredients, inputRef]);

  return (
    <section className='search'>
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type='text'
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;

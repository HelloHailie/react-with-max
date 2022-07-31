import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../store/auth-context";
import Input from "../Input.js/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") }; // "USER_INPUT" 액션을 받을 때마다 여기서 value와 isValid를 모두 업데이트하는 것이다.
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 }; // "USER_INPUT" 액션을 받을 때마다 여기서 value와 isValid를 모두 업데이트하는 것이다.
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

// 리듀서 함수는 컴포넌트 함수 밖에 만듬. 왜냐면 리듀서 함수 내부에서는 컴포넌트 함수 내부에서 만들어진 어떤 데이터로 필요하지 않기 때문이다.
// 리듀서 함수 내부에서 요청되고 사용되는 모든 데이터는 리액트가 이 함수를 실행할 때 자동으로 이 함수로 전달된다.

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  //객체 디스트럭처링
  //값 할당이 아니라 별칭 할당이다.
  //useEffect를 더욱 최적화하고 이펙트가 불필요하게 실행되는 것을 피한다.

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]); // 2. 이렇게 바꾸면 값만 변경되고 유효성은 변경되지 않으면 이 이펙트는 다시 실행되지 않는다. (일단 비밀번호가 유효하면 더 타이핑해도 콘솔창에 더 안나타난다. )

  // }, [emailState, passwordState]); // 1. 의존성은 emailState, passwordState 전체이지 유효성 부분이 아니다.

  //여기서 setFormIsValid()를 재평가하고 유효성 검사 state 설정 함수를 다시 실행해야 한다. 이메일 및 비밀번호 변경 핸들러의 모든 키 입력에 대해서!
  //setTimeout 함수를 사용해서 500밀리초 후에만 이 작업 (유효성 검사)을 수행한다.

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    //setFormIsValid(enteredEmail.includes("@") && event.target.value.trim().length > 6)
    //setFormIsValid(emailState.value.includes("@") && event.target.value.trim().length > 6)
    // useReducer를 썼기 때문에 입력된 값을 저장할 것이기 때문에 emailState.value라고 씀

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
    // isValid 필드가 있어서 재검증 하는 대신 emailState.isValid가 true인지 확인 할 수 있다.
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" }); // 여기서는 인풋이 포커스를 잃었다는 것만 중요하기 때문에 추가해야하는 데이터가 없다.
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id='email'
          label='E-Mail'
          type='email'
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id='password'
          label='Password'
          type='password'
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

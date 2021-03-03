import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
const style = {
  error: { color: "red" },
  createMargin: {
    width: "30%",
    display: "inline-block"
  }
};
function LoginForm(props) {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (submit) => {
    console.log(submit);
    props.loginDetails({
      fname: submit.fname,
      password: submit.password,
      email: submit.email
    });
    props.history.push("/todolist");
  };
  return (
    <div className="loginPageCss">
      <form onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <br />
        <div>
          <lable style={style.createMargin}>Full Name  </lable>
          <input
            className="input"
            type="text"
            name="fname"
            placeholder="Enter Full Name"
            ref={register({
              required: { value: true, message: " *Full Name is Required " }
            })}
          />{" "}
          {errors.fname && (
            <span style={style.error}>{errors.fname.message}</span>
          )}
          <br />
          <br />
        </div>
        <div>
          <lable style={style.createMargin}> E-Mail  </lable>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Enter Email Id"
            ref={register({
              required: { value: true, message: " *Email-Id is Required " },
              pattern: {
                value: /^[\w-\.]+@([\w]+\.)+[\w]+$/,
                message: " *email is invalid"
              }
            })}
          />
          {errors.email && (
            <span style={style.error}>{errors.email.message}</span>
          )}
        </div>{" "}
        <br />
        <div>
          <lable style={style.createMargin}>Password  </lable>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Enter password"
            ref={register({
              required: { value: true, message: " *password is required " },
              minLength: {
                value: 8,
                message: " *password should be more than 8 characters "
              }
            })}
          />
          {errors.password && (
            <span style={style.error}>{errors.password.message}</span>
          )}
        </div>{" "}
        <br />
        <button className="button" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loginDetails: (val) => dispatch({ type: "LOGIN_DETAILS", payload: val })
  };
};
export default connect(null, mapDispatchToProps)(LoginForm);

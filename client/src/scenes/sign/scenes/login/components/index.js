import React from 'react';

const Login = ({ onLogin = f => f }) => {
  const loginInfo = {
    email: '',
    password: '',
  };

  const submit = (e) => {
    e.preventDefault();
    onLogin({
      email: loginInfo.email.value,
      password: loginInfo.password.value,
    });
  };

  return (
    <main className="login">
      <section className="row align-center">
        <form className="small-12 large-6 columns" onSubmit={submit}>
          <div className="row">
            <h1 className="small-12 columns"><span className="underlined">Login</span></h1>
          </div>
          <div className="row align-center">
            <div className="small-12 columns">
              <label for="email">Email: <span className="required">*</span></label>
              <input type="email" name="email" id="email" ref={input => loginInfo.email = input} required />
              <label for="password">Password: <span className="required">*</span></label>
              <input type="password" name="password" id="password" ref={input => loginInfo.password = input} required />
            </div>
          </div>
          <div className="row align-center">
            <button
              className="primary small-11 medium-10 large-10"
              type="submit">
              Login
        </button>
          </div>
        </form>
      </section>
    </main>
  )
};

export default Login;

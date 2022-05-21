/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userActions } from '../../redux/actions';

const LoginPage: React.FC = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;
  const loggingIn = useAppSelector((state: any) => state.authentication.loggingIn);
  const dispatch = useAppDispatch();
  const location = useLocation();

  // reset login status
  useEffect(() => {
    // dispatch(logout());
  }, []);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setInputs((input) => ({ ...input, [name]: value }));
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (username && password) {
      // get return url from location state or default to home page
      const { from }: any = location.state || { from: { pathname: '/' } };
      dispatch(userActions.login(username, password, from));
    }
  };

  return (
    <div className="col-lg-8 offset-lg-2">
      <h2>Login</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            className={`form-control${submitted && !username ? ' is-invalid' : ''}`}
          />
          {submitted && !username && <div className="invalid-feedback">Username is required</div>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className={`form-control${submitted && !password ? ' is-invalid' : ''}`}
          />
          {submitted && !password && <div className="invalid-feedback">Password is required</div>}
        </div>
        <div className="form-group">
          <button className="btn btn-primary">
            {loggingIn && <span className="spinner-border spinner-border-sm mr-1" />}
            Login
          </button>
          <Link to="/register" className="btn btn-link">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

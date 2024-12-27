/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Link, useInRouterContext, useLocation } from 'react-router-dom';
import { pathConstants } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { notificationActions, userActions } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [inputs, setInputs] = useState({
    userName: '',
    password: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { userName, password } = inputs;
  const loggingIn = useAppSelector((state: any) => state.authentication.loggingIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfo = useAppSelector((state: any) => state.authentication.userInfo);

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputs((input) => ({ ...input, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (userName && password) {
      try {
        await dispatch(userActions.login(userName, password));  // Dispatch login action
        // Sau khi login thành công, navigate tới trang phù hợp
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        if (userInfo.role === 0 || userInfo.role === 1) { // admin hoặc giáo viên đăng nhập
          navigate(pathConstants.FLASHCARD_PDF_CREATE
          );  // Redirect to FlashCard PDF page
        } 
        if (userInfo.role === 2) {
          navigate(pathConstants.STUDENT_PAGE);
        } else {
          navigate(pathConstants.ROOT);  // Redirect to ROOT page
        }
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  };

  return (
    <div className="col-lg-8 offset-lg-2">
      <div style={{ height: '100px' }} />
      <h2>Login</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={handleChange}
            className={`form-control${submitted && !userName ? ' is-invalid' : ''}`}
          />
          {submitted && !userName && <div className="invalid-feedback">userName is required</div>}
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
          <Link to={pathConstants.SIGNUP} className="btn btn-link">
            SignUp
          </Link>
          <div style={{ height: '50px' }} />
          <div><i>* Contact TungDK in case you need support:</i></div>
          <div><i>- Phone/ Zalo: 0918334306</i></div>
          <div><i>- Facebook: <a href="https://www.facebook.com/duongkhactung1610" target="_blank" rel="noopener noreferrer" >https://www.facebook.com/duongkhactung1610</a></i></div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

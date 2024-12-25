import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { pathConstants } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userActions } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const TabContainer = styled.div`
  margin-top: 20px;
  margin-left: 250px; //cách lề trái để tránh bị Header che mất.
`;

const SignupPage: React.FC = () => {
  const [user, setUser] = useState({
    email: '',
    userName: '',
    password: '',
    passwordConfirmation: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const signingUp = useAppSelector((state: any) => state.registration.signingUp);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Sau hãy thay bằng hàm getAll Teacher để list ra danh sách các giáo viên
  // useEffect(() => {
  //   dispatch(userActions.getAllUsers());
  // }, []);

  const handleChange = (e: any) =>{
    const { name, value } = e.target;
    setUser((userInfo) => ({ ...userInfo, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (user.email && user.userName && user.password && user.passwordConfirmation) {
      await dispatch(userActions.signup(user));
      navigate(pathConstants.LOGIN);
    }
  }

  return (
    <TabContainer>
      <div className="col-lg-8 offset-lg-2">
        <div style={{ height: '100px' }} />
        <h2>Sign Up</h2>
        <form name="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Type your email ..."
              className={`form-control${submitted && !user.email ? ' is-invalid' : ''}`}
            />
            {submitted && !user.email && <div className="invalid-feedback">Email is required</div>}
          </div>
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleChange}
              placeholder="Type your user name ..."
              className={`form-control${submitted && !user.userName ? ' is-invalid' : ''}`}
            />
            {submitted && !user.userName && (
              <div className="invalid-feedback">User Name is required</div>
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Type password ..."
              className={`form-control${submitted && !user.password ? ' is-invalid' : ''}`}
            />
            {submitted && !user.password && (
              <div className="invalid-feedback">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <label>Password Confirmation</label>
            <input
              type="password"
              name="passwordConfirmation"
              value={user.passwordConfirmation}
              onChange={handleChange}
              placeholder="Type password again..."
              className={`form-control${
                submitted && !user.passwordConfirmation ? ' is-invalid' : ''
              }`}
            />
            {submitted && !user.passwordConfirmation && (
              <div className="invalid-feedback">Password Confirmation is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">
              {signingUp && <span className="spinner-border spinner-border-sm mr-1" />}
              Sign Up
            </button>
            <Link to={pathConstants.LOGIN} className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </TabContainer>
  );
};

export default SignupPage;

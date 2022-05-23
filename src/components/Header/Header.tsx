/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { notificationActions, userActions } from '../../redux/actions';
import { history } from '../../helpers';
import { HeaderWrapper, NewBlogButton, RightSideWrapper } from './Header.styled';
import MeContainer from './MeContainer';
import { pathConstants } from '../../constants';

const styledNavItems = {
  margin: '10px'
};

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isUserLoggedIn = useAppSelector((state: any) => state.authentication.loggedIn);
  const userInfo = useAppSelector((state: any) => state.authentication.userInfo);

  const onLogout = () => {
    dispatch(userActions.logout());
    history.push(pathConstants.ROOT);
  };

  const onNewBlog = () => {
    if (isUserLoggedIn) history.push(pathConstants.BLOG_CREATE);
    else {
      history.push(pathConstants.LOGIN);
      dispatch(notificationActions.addNotification('You must log in to create new blog!', 'INFO'));
    }
  };

  const isAtBlogCreationPage = location.pathname === pathConstants.BLOG_CREATE;
  return (
    <>
      <HeaderWrapper>
        <MeContainer />
        <RightSideWrapper>
          {userInfo && <i>Hello {userInfo.userName},</i>}
          {!isAtBlogCreationPage && (
            <div>
              <NewBlogButton type="button" onClick={onNewBlog}>
                New Blog
              </NewBlogButton>
            </div>
          )}

          <nav>
            <Link to="/" style={styledNavItems}>
              Home
            </Link>
            {isUserLoggedIn ? (
              <Link to="/" style={styledNavItems} onClick={() => onLogout()}>
                Log out
              </Link>
            ) : (
              <>
                <Link to={pathConstants.LOGIN} style={styledNavItems}>
                  Log in
                </Link>
                <Link to={pathConstants.SIGNUP} style={styledNavItems}>
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </RightSideWrapper>
      </HeaderWrapper>
    </>
  );
};

export default Header;

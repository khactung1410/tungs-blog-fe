/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { notificationActions, userActions } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import {
  ExportFlashCardButton,
  HeaderWrapper,
  NewBlogButton,
  RightSideWrapper,
  StyledNavLink
} from './Header.styled';
import MeContainer from './MeContainer';
import { pathConstants } from '../../constants';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isUserLoggedIn = useAppSelector((state: any) => state.authentication.loggedIn);
  const userInfo = useAppSelector((state: any) => state.authentication.userInfo);

  const onLogout = () => {
    dispatch(userActions.logout());
    navigate(pathConstants.ROOT);
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(userActions.getLoggingInUserInforByToken(token));
    }
  }, [dispatch]);

  const onNewBlog = () => {
    if (isUserLoggedIn) navigate(pathConstants.BLOG_CREATE);
    else {
      navigate(pathConstants.LOGIN);
      dispatch(notificationActions.addNotification('You must log in to create new blog!', 'INFO'));
    }
  };

  const onNewFlashCardPDF = () => {
    if (isUserLoggedIn) navigate(pathConstants.FLASHCARD_PDF_CREATE);
    else {
      navigate(pathConstants.LOGIN);
      dispatch(
        notificationActions.addNotification('You must log in to generate flashcard PDF!', 'INFO')
      );
    }
  };

  const isAtBlogCreationPage = location.pathname === pathConstants.BLOG_CREATE;
  const isAtFlashcardPdfCreationPage = location.pathname === pathConstants.FLASHCARD_PDF_CREATE;
  return (
    <>
      <HeaderWrapper>
        <MeContainer />
        <RightSideWrapper>
          {userInfo && <i>Hello {userInfo.userName},</i>}
          {userInfo && !isAtBlogCreationPage && (
            <StyledNavLink to={pathConstants.BLOG_CREATE}>
              <NewBlogButton type="button" onClick={onNewBlog}>
                New Test
              </NewBlogButton>
            </StyledNavLink>
          )}
          {userInfo && !isAtFlashcardPdfCreationPage && (
            <StyledNavLink to={pathConstants.FLASHCARD_PDF_CREATE}>
              <ExportFlashCardButton type="button" onClick={onNewFlashCardPDF}>
                Flashcard/ Vocab Test
              </ExportFlashCardButton>
            </StyledNavLink>
          )}

          <nav>
            <StyledNavLink to="/" bold>
              HOME
            </StyledNavLink>
            {isUserLoggedIn ? (
              <StyledNavLink to="/" onClick={() => onLogout()}>
                Log out
              </StyledNavLink>
            ) : (
              <StyledNavLink to={pathConstants.LOGIN}>
                Log in
              </StyledNavLink>
            )}
            <StyledNavLink to={pathConstants.SIGNUP}>
                  New Teacher
            </StyledNavLink>
          </nav>
        </RightSideWrapper>
      </HeaderWrapper>
    </>
  );
};

export default Header;

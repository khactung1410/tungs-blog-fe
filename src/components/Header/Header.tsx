// Header.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { notificationActions, userActions } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import {
  HeaderWrapper,
  RightSideWrapper,
  NavLinksWrapper,
  NavItem,
  ToggleButton
} from './Header.styled';
import MeContainer from './MeContainer';
import { pathConstants } from '../../constants';

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activePath, setActivePath] = useState<string>('/');
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
    setActivePath(location.pathname);
  }, [dispatch, location.pathname]);

  const toggleBackground = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNavClick = (path: string) => {
    setActivePath(path);
    navigate(path);
  };

  return (
    <>
      <HeaderWrapper isdarkmode={isDarkMode}>
        <MeContainer />
        <RightSideWrapper>
          {userInfo && <i>Hello {userInfo.userName},</i>}
          <NavLinksWrapper>
            <NavItem
              isactive={activePath === '/'}
              onClick={() => handleNavClick('/')}
            >
              HOME
            </NavItem>
            {userInfo && (
              <NavItem
              isactive={activePath === pathConstants.MATCH_WORD_MEANING}
                onClick={() => handleNavClick(pathConstants.MATCH_WORD_MEANING)}
              >
                Game: Word-Meaning
              </NavItem>
            )}
            {userInfo && (
              <NavItem
              isactive={activePath === pathConstants.CLASSES_MANAGE}
                onClick={() => handleNavClick(pathConstants.CLASSES_MANAGE)}
              >
                Classes
              </NavItem>
            )}
            {userInfo && (
              <NavItem
              isactive={activePath === pathConstants.STUDENTS_MANAGE}
                onClick={() => handleNavClick(pathConstants.STUDENTS_MANAGE)}
              >
                Students
              </NavItem>
            )}
            {userInfo && (
              <NavItem
              isactive={activePath === pathConstants.RANDOM_TEAM}
                onClick={() => handleNavClick(pathConstants.RANDOM_TEAM)}
              >
                Random Teams
              </NavItem>
            )}
            {userInfo && (
              <NavItem
              isactive={activePath === pathConstants.FLASHCARD_PDF_CREATE}
                onClick={() => handleNavClick(pathConstants.FLASHCARD_PDF_CREATE)}
              >
                Flashcard/ Vocab Test
              </NavItem>
            )}
            {userInfo?.role===0 && (  // Chỉ có role admin(role=0) mới có quyền đi tạo giáo viên mới(giáo viên mặc định role=2)
              <NavItem
              isactive={activePath === pathConstants.SIGNUP}
                onClick={() => handleNavClick(pathConstants.SIGNUP)}
              >
                New Teacher
              </NavItem>
            )}

            {isUserLoggedIn ? (
              <NavItem onClick={onLogout}>
                Log out
              </NavItem>
            ) : (
              <NavItem
              isactive={activePath === pathConstants.LOGIN}
                onClick={() => handleNavClick(pathConstants.LOGIN)}
              >
                Log in
              </NavItem>
            )}
          </NavLinksWrapper>
          <ToggleButton onClick={toggleBackground}>
            Toggle Background
          </ToggleButton>
        </RightSideWrapper>
      </HeaderWrapper>
    </>
  );
};

export default Header;

// Header.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userActions } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import {
  HeaderWrapper,
  RightSideWrapper,
  NavLinksWrapper,
  NavItem,
  LogoutButton
} from './Header.styled';
import MeContainer from './MeContainer';
import { pathConstants } from '../../constants';

const Header: React.FC = () => {
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

  // Khôi phục userInfo từ localStorage khi component được mount
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      dispatch(userActions.loginSuccess(JSON.parse(savedUserInfo))); // Dispatch action để cập nhật Redux state
    }
  }, [dispatch]);

  const handleNavClick = (path: string) => {
    setActivePath(path);
    navigate(path);
  };

  return (
    <>
      <HeaderWrapper>
        <MeContainer />
        <RightSideWrapper>
          {userInfo && <i>Hello {userInfo.userName},</i>}
          <NavLinksWrapper>
            {userInfo && (
              <NavItem
              isactive={activePath === pathConstants.MATCH_WORD_MEANING}
                onClick={() => handleNavClick(pathConstants.MATCH_WORD_MEANING)}
              >
                Game: Nối Từ
              </NavItem>
            )}
            {userInfo?.role===0 && (
              <NavItem
              isactive={activePath === pathConstants.CLASSES_MANAGE}
                onClick={() => handleNavClick(pathConstants.CLASSES_MANAGE)}
              >
                Quản lý Lớp Học
              </NavItem>
            )}
            {userInfo?.role===0 && (
              <NavItem
              isactive={activePath === pathConstants.STUDENTS_MANAGE}
                onClick={() => handleNavClick(pathConstants.STUDENTS_MANAGE)}
              >
                Quản lý Học Sinh
              </NavItem>
            )}
            {userInfo && (
              <NavItem
              isactive={activePath === pathConstants.QUESTIONS_MANAGE}
                onClick={() => handleNavClick(pathConstants.QUESTIONS_MANAGE)}
              >
                Quản lý Câu Hỏi
              </NavItem>
            )}
            {userInfo && (
              <NavItem
              isactive={activePath === pathConstants.FLASHCARD_PDF_CREATE}
                onClick={() => handleNavClick(pathConstants.FLASHCARD_PDF_CREATE)}
              >
                Tạo thẻ từ/ Tạo bài test
              </NavItem>
            )}
            {userInfo && (
              <NavItem
              isactive={activePath === pathConstants.ATTENDANCE_MANAGE}
                onClick={() => handleNavClick(pathConstants.ATTENDANCE_MANAGE)}
              >
                Điểm Danh
              </NavItem>
            )}
            {userInfo?.role === 0 && (  // Chỉ có role admin (role=0) mới có quyền tạo giáo viên mới (giáo viên mặc định role=2)
              <NavItem
                isactive={activePath === pathConstants.TUITION_MANAGE}
                onClick={() => handleNavClick(pathConstants.TUITION_MANAGE)}
              >
                Học Phí
              </NavItem>
            )}
            {userInfo?.role === 0 && (  // Chỉ có role admin (role=0) mới có quyền tạo giáo viên mới (giáo viên mặc định role=2)
              <NavItem
              isactive={activePath === pathConstants.SIGNUP}
                onClick={() => handleNavClick(pathConstants.SIGNUP)}
              >
                Thêm Giáo Viên
              </NavItem>
            )}
          </NavLinksWrapper>
          {isUserLoggedIn ? (
            <LogoutButton onClick={onLogout}>
              Log out
            </LogoutButton>
          ) : (
            <LogoutButton
              onClick={() => handleNavClick(pathConstants.LOGIN)}
            >
              Log in
            </LogoutButton>
          )}
        </RightSideWrapper>
      </HeaderWrapper>
    </>
  );
};

export default Header;

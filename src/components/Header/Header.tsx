import { IconContext } from 'react-icons';
import { FaBars, FaUser, FaTasks, FaShieldAlt, FaLayerGroup, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { MdAttachMoney } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { SiTicktick } from "react-icons/si";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { GiCardPick } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userActions } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import MeContainer from './MeContainer';
import { pathConstants } from '../../constants';
import { Dropdown, DropdownItem, Footer, Logo, Nav, NavItem, NavLink, Sidebar, ToggleButton } from './Header.styled';
import my_avatar from '../../images/tung_english_avatar.png';

interface HeaderProps {
  expand: boolean;
  onExpandChange: (expand: boolean) => void;
}

const Header: React.FC<{ expand: boolean; onExpandChange: (expand: boolean) => void }> = React.memo(({ expand, onExpandChange }) => {
  const handleToggleExpand = () => {
    onExpandChange(!expand); // Thay đổi trạng thái thông qua callback từ component cha
  };
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // Để kiểm soát dropdown nào được mở

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu); // Đóng menu nếu click lại
  };

  const [activePath, setActivePath] = useState<string>('/');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
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
    <IconContext.Provider value={{ size: '1em' }}>
      <Sidebar expand={expand}>
        <div className="d-flex">
        <ToggleButton onClick={handleToggleExpand}>
            <FaBars />
          </ToggleButton>
          <Logo expand={expand}><strong>KT LANGUAGE CENTER</strong></Logo>
        </div>
        <Nav>
          <MeContainer 
            avatar={my_avatar} 
            text={expand ? userInfo.userName : ''}
          />
        {userInfo && (
          <NavItem>
            <NavLink
             expand={expand}
             href="#"
             isActive={activePath === pathConstants.MATCH_WORD_MEANING}
             onClick={() => handleNavClick(pathConstants.MATCH_WORD_MEANING)}
            >
              <IoGameController />
              <span>Game: Nối Từ</span>
            </NavLink>
          </NavItem>
        )}
        {userInfo?.role===0 && (
          <NavItem>
            <NavLink
              expand={expand}
              href="#"
              isActive={activePath === pathConstants.CLASSES_MANAGE}
              onClick={() => handleNavClick(pathConstants.CLASSES_MANAGE)}
            >
              <FaTasks />
              <span>Quản lý Lớp Học</span>
            </NavLink>
          </NavItem>
        )}
        {userInfo?.role===0 && (
          <NavItem>
            <NavLink
              expand={expand}
              href="#"
              isActive={activePath === pathConstants.STUDENTS_MANAGE}
              onClick={() => handleNavClick(pathConstants.STUDENTS_MANAGE)}
            >
              <PiStudentBold />
              <span>Quản lý Học Sinh</span>
            </NavLink>
          </NavItem>
        )}
        {userInfo && (
          <NavItem>
            <NavLink
              expand={expand}
              href="#"
              isActive={activePath === pathConstants.QUESTIONS_MANAGE}
              onClick={() => handleNavClick(pathConstants.QUESTIONS_MANAGE)}
            >
              <BsFillPatchQuestionFill />
              <span>Quản lý Câu Hỏi</span>
            </NavLink>
          </NavItem>
        )}
        {userInfo && (
          <NavItem>
            <NavLink
              expand={expand}
              href="#"
              isActive={activePath === pathConstants.FLASHCARD_PDF_CREATE}
              onClick={() => handleNavClick(pathConstants.FLASHCARD_PDF_CREATE)}
            >
              <GiCardPick />
              <span>Tạo Thẻ Từ/ test vocab</span>
            </NavLink>
          </NavItem>
        )}
        {userInfo && (
          <NavItem>
            <NavLink
              expand={expand}
              href="#"
              isActive={activePath === pathConstants.ATTENDANCE_MANAGE}
              onClick={() => handleNavClick(pathConstants.ATTENDANCE_MANAGE)}
            >
              <SiTicktick />
              <span>Điểm Danh</span>
            </NavLink>
          </NavItem>
        )}
        {userInfo?.role===0 && (
          <NavItem>
            <NavLink
              expand={expand}
              href="#"
              isActive={activePath === pathConstants.TUITION_MANAGE}
              onClick={() => handleNavClick(pathConstants.TUITION_MANAGE)}
            >
              <MdAttachMoney />
              <span>Học Phí</span>
            </NavLink>
          </NavItem>
        )}
        {userInfo?.role===0 && (
          <NavItem>
            <NavLink
              expand={expand}
              href="#"
              isActive={activePath === pathConstants.SIGNUP}
              onClick={() => handleNavClick(pathConstants.SIGNUP)}
            >
              <FaTasks />
              <span>Thêm Giáo Viên</span>
            </NavLink>
          </NavItem>
        )}
          <NavItem>
            <NavLink expand={expand} href="#">
              <FaUser />
              <span>User</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink expand={expand} href="#">
              <FaTasks />
              <span>Task</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink expand={expand} href="#" onClick={() => toggleDropdown('auth')}>
              <FaShieldAlt />
              <span>Auth</span>
              <span style={{ marginLeft: 'auto' }}>{activeDropdown === 'auth' ? '▲' : '▼'}</span>
            </NavLink>
            {activeDropdown === 'auth' && (
              <Dropdown expand={expand}>
                <DropdownItem>Login</DropdownItem>
                <DropdownItem>Register</DropdownItem>
              </Dropdown>
            )}
          </NavItem>
          <NavItem>
            <NavLink expand={expand} href="#" onClick={() => toggleDropdown('multi')}>
              <FaLayerGroup />
              <span>Multi Level</span>
              <span style={{ marginLeft: 'auto' }}>{activeDropdown === 'multi' ? '▲' : '▼'}</span>
            </NavLink>
            {activeDropdown === 'multi' && (
              <Dropdown expand={expand}>
                <DropdownItem>Link 1</DropdownItem>
                <DropdownItem>Link 2</DropdownItem>
              </Dropdown>
            )}
          </NavItem>
          <NavItem>
            <NavLink
             expand={expand} 
             href="#"
            >
              <FaBell />
              <span>Notification</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink expand={expand} href="#">
              <FaCog />
              <span>Setting</span>
            </NavLink>
          </NavItem>
        </Nav>
        <Footer>
          <NavLink expand={expand} href="#" onClick={onLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </NavLink>
        </Footer>
      </Sidebar>
    </IconContext.Provider>
  );
});

export default Header;
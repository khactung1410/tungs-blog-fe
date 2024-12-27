import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import 'moment/locale/vi';
moment.locale('vi');
import {
  Button,
  FormGroup,
  Label,
  Input,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Spinner, {
  AttendanceContainer,
  ActionBar,
  StyledTable,
  ModalContent,
  ButtonStyled,
  FilterForm,
  FormGroupStyled,
  ScrollableTableWrapper,
  StyledModal,
} from './AttendanceManage.styled';
import { studentActions, classActions, attendanceActions, userActions } from '../../redux/actions';
import { attendanceStudentRecordActions } from '../../redux/actions/attendanceStudentRecord.actions';
import { pathConstants } from '../../constants';
import { useNavigate } from 'react-router-dom';
import Loading from '../../common/Loading/loading';

interface StudentAttributes {
  id: number;
  name: string;
  dateOfBirth?: Date;
  phoneNumber?: string;
  fbLink?: string;
  note?: string;
  classId: number;
  startDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
interface AttendanceSessionAttributes {
  id: number;
  classId: number;
  date: Date;
  createdByTeacherId: number;
  lastUpdatedByTeacherId: number;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AttendanceManage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [searchText, setSearchText] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState(false);  // Trạng thái modal: sửa hay tạo mới
  const [filteredStudents, setFilteredStudents] = useState<StudentAttributes[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().tz('Asia/Ho_Chi_Minh').startOf('day').format('YYYY-MM-DD')
  );  
  const [attendanceSessionToEdit, setAttendanceSessionToEdit] = useState<AttendanceSessionAttributes | null>(null);
  const [isDuplicateSession, setIsDuplicateSession] = useState(false);
  const [errorDuplicatedSessionMessage, setErrorDuplicatedSessionMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading

  const userInfo = useAppSelector((state: any) => state.authentication.userInfo);

  const classes = useAppSelector((state: any) => state.classes.classesList);
  const students = useAppSelector((state: any) => state.students.studentsList);
  const teachers = useAppSelector((state: any) => state.users.items);
  const attendanceSessions = useAppSelector((state: any) => state.attendanceSessions.attendanceSessionsList);
  const currentMonthAttendanceStudentRecords = useAppSelector((state: any) => state.attendanceStudentRecords.attendanceStudentRecordsList);

  // Hàm kiểm tra trùng lặp
  const checkDuplicateSession = (classId: string, date: string) => {
    const duplicateSession = attendanceSessions.some(
      (session: AttendanceSessionAttributes) =>
        session.classId === Number(classId) && moment(session.date).format('YYYY-MM-DD') === date
    );

    if (duplicateSession) {
      const className = classes.find((cls: any) => cls.id === Number(classId))?.name || '';
      setErrorDuplicatedSessionMessage(`Đã tồn tại điểm danh rồi: lớp ${className} - ngày ${date}`);
      setIsDuplicateSession(true);
    } else {
      setErrorDuplicatedSessionMessage('');
      setIsDuplicateSession(false);
    }
  };

  // Hàm logout
  const onLogout = () => {
    dispatch(userActions.logout());
    navigate(pathConstants.ROOT);
  };

  // Kiểm tra accessToken hết hạn
  const isTokenExpired = (token: string | null) => {
    if (!token) return true; // Nếu không có token, coi như đã hết hạn
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64)); // Decode JWT payload
      const currentTime = Date.now() / 1000; // Thời gian hiện tại (tính bằng giây)
      return decodedPayload.exp < currentTime; // Token hết hạn nếu `exp` nhỏ hơn thời gian hiện tại
    } catch (error) {
      console.error('Invalid token:', error);
      return true; // Nếu token không hợp lệ, coi như đã hết hạn
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (isTokenExpired(accessToken)) {
      console.log('Token đã hết hạn, thực hiện logout...');
      onLogout();
    }
  }, []); // useEffect chỉ chạy một lần khi component được mount

  useEffect(() => {// Gọi hàm kiểm tra khi thay đổi lớp hoặc ngày
    if (selectedClass && selectedDate) {
      checkDuplicateSession(selectedClass, selectedDate);
    }
  }, [selectedClass, selectedDate]);

  useEffect(() => {
    // Đánh dấu bắt đầu tải dữ liệu
    setIsLoading(true);
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    Promise.all([
      dispatch(classActions.getAll()),
      dispatch(studentActions.getAll()),
      dispatch(userActions.getAllTeachers()),
      dispatch(attendanceActions.getAllAttendanceSessions()),
      dispatch(attendanceStudentRecordActions.getAttendanceStudentRecordByMonth(currentYear, currentMonth))
    ])
      .then(() => {
        setIsLoading(false); // Kết thúc tải dữ liệu
      })
      .catch((err) => {
        console.error('Error loading data:', err);
        setIsLoading(false);
      });
    
    
  }, [dispatch]);

  // useEffect mới để reset selectedStudents khi lớp thay đổi
  useEffect(() => {
    if (selectedClass) {
      setFilteredStudents(students.filter((student: StudentAttributes) => student.classId === Number(selectedClass)));
      
      if (isEditing && attendanceSessionToEdit) {
        // Lấy danh sách học sinh được chọn từ attendanceSessionToEdit (chỉ khi đang sửa)
        const studentsInSession = currentMonthAttendanceStudentRecords ? currentMonthAttendanceStudentRecords.filter(
          (record: any) => record.sessionId === attendanceSessionToEdit.id
        ): [];
  
        const selectedStudentIds = studentsInSession
          .filter((record: any) => record.isPresent === true)
          .map((record: any) => record.studentId);
  
        setSelectedStudents(selectedStudentIds); // Cập nhật danh sách học sinh có mặt
      } else {
        // Reset khi tạo mới
        setSelectedStudents([]);
      }
    } else {
      setFilteredStudents([]);
      setSelectedStudents([]); // Reset nếu không có lớp
    }
  }, [selectedClass, students, isEditing, attendanceSessionToEdit, currentMonthAttendanceStudentRecords]);
  

  const filteredSessions = 
   Array.isArray(attendanceSessions) && attendanceSessions.length > 0 ? 
   attendanceSessions.filter((session: AttendanceSessionAttributes) => {
    const sessionMonth = new Date(session.date).getMonth() + 1;
    const isClassMatch = selectedClass ? session.classId === Number(selectedClass) : true;
    const isMonthMatch = sessionMonth === selectedMonth;

    return isClassMatch && isMonthMatch;
  })
  .sort((a: AttendanceSessionAttributes, b: AttendanceSessionAttributes) => {
    const today = new Date();
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    const diffA = Math.abs(dateA.getTime() - today.getTime());
    const diffB = Math.abs(dateB.getTime() - today.getTime());

    return diffA - diffB; // Sắp xếp theo khoảng cách thời gian đến ngày hiện tại
  }): [];

  const resetModalState = () => {
    setSelectedClass('');
    setErrorDuplicatedSessionMessage('');
    setIsEditing(false);
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setSelectedStudents([]);
    setAttendanceSessionToEdit(null);  // Reset thông tin điểm danh đang sửa
  };
  
  const toggleModal = () => {
    resetModalState();  // Reset thông tin khi đóng modal
    setModalOpen(!modalOpen);
  };
  
  const handleCreateAttendance = () => {
    setIsEditing(false);  // Chế độ tạo mới
    // Lấy danh sách học sinh và trạng thái checkbox
    const attendanceSessionListStudentList = filteredStudents.map((student) => ({
      studentId: student.id,
      isPresent: selectedStudents.includes(student.id) ? 1 : 0, // true -> 1, false -> 0
    }));
  
    // Dispatch action với thông tin lớp, ngày điểm danh và danh sách học sinh
    dispatch(
      attendanceActions.createAttendanceSession(
        Number(selectedClass), // classId
        selectedDate, // date
        attendanceSessionListStudentList, // danh sách học sinh,
        userInfo.id,
        userInfo.id
      )
    );
    // Đóng modal sau khi tạo điểm danh
    toggleModal();
  };

  const handleEditAttendance = (session: AttendanceSessionAttributes) => {
    setIsEditing(true);  // Chế độ sửa
    // Khi ấn sửa, điền sẵn thông tin vào modal
    setAttendanceSessionToEdit(session);
    setSelectedClass(String(session.classId));
    setSelectedDate(new Date(session.date).toISOString().split('T')[0]);

    // Lọc ra những học sinh đã có mặt trong session này
    const studentsInSession = currentMonthAttendanceStudentRecords ? currentMonthAttendanceStudentRecords.filter(
      (record: any) => record.sessionId === session.id
    ) : [];
  
    // Tạo danh sách học sinh có mặt (dựa trên trường isPresent)
    const selectedStudentIds = studentsInSession
      .filter((record: any) => record.isPresent === true) // Chọn những học sinh có mặt
      .map((record: any) => record.studentId);
    setSelectedStudents(selectedStudentIds);
    setModalOpen(true);
  };  

  const handleSaveAttendance = () => {
    // Lưu lại điểm danh, xử lý logic lưu sửa điểm danh tại đây
    if (attendanceSessionToEdit) {
      const updatedAttendance = filteredStudents ? filteredStudents.map((student) => ({
        studentId: student.id,
        isPresent: selectedStudents.includes(student.id) ? 1 : 0,
      })) : [];

      // Dispatch action sửa điểm danh
      dispatch(
        attendanceActions.updateAttendanceSession(
          attendanceSessionToEdit.id,
          selectedDate,
          updatedAttendance,
          userInfo.id
        )
      );
    }

    setModalOpen(false);
  };

  return (
    <AttendanceContainer>
      {
        isLoading ? <Loading message="Đang tải dữ liệu, vui lòng đợi..." /> : ''
      }
      <ActionBar className="action-bar">
        <ButtonStyled color="primary" onClick={toggleModal}>
          Tạo Điểm Danh
        </ButtonStyled>
        <FilterForm inline>
          <FormGroupStyled>
            <Label for="classSelect">Lớp</Label>
            <Input
              type="select"
              name="classSelect"
              id="classSelect"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Chọn Lớp</option>
              {classes ? classes.map((cls: any) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              )): []}
            </Input>
          </FormGroupStyled>

          <FormGroupStyled>
            <Label for="monthSelect">Tháng</Label>
              <Input
                type="select"
                id="monthSelect"
                value={selectedMonth}
                onChange={(e) => {
                  const newMonth = Number(e.target.value);
                  setSelectedMonth(newMonth);
                  dispatch(attendanceStudentRecordActions.getAttendanceStudentRecordByMonth(new Date().getFullYear(), newMonth));
                }}
              >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Tháng {i + 1}
                </option>
              ))}
            </Input>
          </FormGroupStyled>

          <FormGroupStyled style={{ display: 'flex', alignItems: 'center' }}>
            <Label for="search" style={{ marginRight: '10px' }}>Tìm kiếm</Label>
            <Input
              type="text"
              id="search"
              placeholder="Nhập từ khóa"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </FormGroupStyled>
        </FilterForm>
      </ActionBar>

      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Lớp</th>
            <th>Ngày điểm danh</th>
            <th>Đi/Vắng</th>
            <th>GV tạo</th>
            <th>GV sửa cuối</th>
            <th>Ngày tạo</th>
            <th>Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          {filteredSessions.map((session: AttendanceSessionAttributes) => {
            const className = classes ? (classes.find((cls: any) => cls.id === session.classId)?.name || 'N/A') : [];
            const createdTeacherName = teachers ? (teachers.find((teacher: any) => teacher.id === session.createdByTeacherId)?.userName || 'N/A') : [];
            const lastUpdatedTeacherName = teachers ? (teachers.find((teacher: any) => teacher.id === session.lastUpdatedByTeacherId)?.userName || 'N/A') : [];
            const formattedDate = moment(session.date).locale('vi').format('dddd - DD/MM/YYYY');
            const createdAtFormatted = session.createdAt
              ? new Date(session.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
              : 'N/A';

            return (
              <tr key={session.id}>
                <td>{session.id}</td>
                <td>{className}</td> {/* Hiển thị tên lớp */}
                <td>{formattedDate}</td> {/* Hiển thị ngày định dạng dd/mm/yyyy */}
                <td>
                  {(() => {
                    const sessionRecords = currentMonthAttendanceStudentRecords ? currentMonthAttendanceStudentRecords.filter(
                      (record: any) => record.sessionId === session.id
                    ): [];

                    const totalStudents = sessionRecords.length;
                    const presentStudents = sessionRecords.filter((record: any) => record.isPresent).length;
                    const absentRecords = sessionRecords.filter((record: any) => !record.isPresent);
                    const absentStudentNames = absentRecords
                      .map((record: any) => students ? (students.find((student: any) => student.id === record.studentId)?.name) : [])
                      .filter(Boolean);

                    // Chia danh sách học sinh vắng thành các nhóm, mỗi nhóm tối đa 4 học sinh
                    const absentStudentGroups = absentStudentNames.reduce((groups: string[][], name: string, index: number) => {
                      const groupIndex = Math.floor(index / 4);
                      if (!groups[groupIndex]) groups[groupIndex] = [];
                      groups[groupIndex].push(name);
                      return groups;
                    }, []);

                    return (
                      <>
                        <div>{`Đi: ${presentStudents}/${totalStudents}; Vắng: ${totalStudents - presentStudents}`}</div>
                        {absentStudentGroups.length > 0 && (
                          <div style={{ color: 'red', fontSize: '12px' }}>
                            {absentStudentGroups.map((group: any[], index: React.Key | null | undefined) => (
                              <div key={index}>{group.join('; ')}</div>
                            ))}
                          </div>
                        )}
                      </>
                    );
                  })()}
                </td>
                <td>{createdTeacherName}</td> {/* Hiển thị tên giáo viên */}
                <td>{lastUpdatedTeacherName}</td> {/* Hiển thị tên giáo viên */}
                <td>{createdAtFormatted}</td> {/* Ngày tạo định dạng dd/mm/yyyy */}
                <td>
                  <Button color="info" size="sm" onClick={() => handleEditAttendance(session)}>
                    Sửa
                  </Button>
                  {' '}
                  <Button color="danger" size="sm" onClick={() => console.log('Delete')}>
                    Xóa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>

        <StyledModal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={() => setModalOpen(false)}>
            {attendanceSessionToEdit ? 'Sửa điểm danh' : 'Tạo điểm danh'}
        </ModalHeader>
        <ModalBody>
          <ModalContent>
            {/* Căn chỉnh hai trường "Lớp" và "Điểm danh ngày" */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'flex-start' }}>
              {/* Trường Lớp */}
              <FormGroup style={{ width: '150px' }}>
                <Label for="classSelectModal" style={{ display: 'block', marginBottom: '5px' }}>
                  Lớp
                </Label>
                <Input
                  type="select"
                  name="classSelect"
                  id="classSelectModal"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  disabled={isEditing}  // Disable khi sửa điểm danh
                >
                  <option value="">Chọn Lớp</option>
                  {classes ? classes.map((cls: any) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  )) : []}
                </Input>
              </FormGroup>

              {/* Trường Điểm danh ngày */}
              <FormGroup style={{ width: '180px' }}>
                <Label for="attendanceDate" style={{ display: 'block', marginBottom: '5px' }}>
                  Điểm danh ngày
                </Label>
                <Input
                  type="date"
                  name="attendanceDate"
                  id="attendanceDate"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  disabled={isEditing}  // Disable khi sửa điểm danh
                />
              </FormGroup>
              {isDuplicateSession && !isEditing && ( // Hiển thị thông báo lỗi nếu có
                <div style={{ color: 'red', marginTop: '10px' }}>
                  {errorDuplicatedSessionMessage}
                </div>
              )}
            </div>

            {/* Bảng chọn học sinh */}
            <ScrollableTableWrapper>
              <StyledTable>
                <thead>
                  <tr>
                    <th style={{ width: '50px' }}>
                      <div style={{ textAlign: 'center' }}>
                        <Label style={{ display: 'block' }}>Chọn tất cả</Label>
                        <Input
                          type="checkbox"
                          checked={filteredStudents.length > 0 && selectedStudents.length === filteredStudents.length}
                          onChange={(e) =>
                            setSelectedStudents(
                              e.target.checked ? filteredStudents.map((s: any) => s.id) : []
                            )
                          }
                        />
                      </div>
                    </th>
                    <th>Tên</th>
                    <th>Lớp</th>
                    <th>Ảnh</th>
                    <th>Ghi chú</th>
                    <th>SĐT</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student: StudentAttributes) => {
                    const className = classes ? (classes.find((cls: any) => cls.id === student.classId)?.name || '') : [];
                    return (
                      <tr key={student.id}>
                        <td>
                          <Input
                            type="checkbox"
                            checked={selectedStudents.includes(student.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedStudents([...selectedStudents, student.id]);
                              } else {
                                setSelectedStudents(selectedStudents.filter((id) => id !== student.id));
                              }
                            }}
                          />
                        </td>
                        <td>{student.name}</td>
                        <td>{className}</td>
                        <td>
                          <img
                            src={student.fbLink || ''}
                            alt={student.name}
                            width={50}
                            style={{ borderRadius: '5px' }}
                          />
                        </td>
                        <td>{student.note}</td>
                        <td>{student.phoneNumber}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </StyledTable>
            </ScrollableTableWrapper>
          </ModalContent>
        </ModalBody>
        <ModalFooter>
          <Button 
            color="primary" 
            onClick={attendanceSessionToEdit ? handleSaveAttendance : handleCreateAttendance}
            disabled={isDuplicateSession && !isEditing}
          >
            {attendanceSessionToEdit ? 'Sửa' : 'Tạo'}
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Hủy
          </Button>
        </ModalFooter>
      </StyledModal>
    </AttendanceContainer>
  );
};

export default AttendanceManage;

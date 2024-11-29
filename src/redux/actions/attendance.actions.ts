// attendanceActions.ts
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
  
const getAllAttendanceSessions = () => async (dispatch: any) => {
  const mockData: AttendanceSessionAttributes[] = [
    {
      id: 1,
      classId: 1,
      date: new Date('2024-11-01'),
      createdByTeacherId: 101,
      lastUpdatedByTeacherId: 102,
      note: 'Điểm danh tháng 11',
      createdAt: new Date('2024-11-01'),
      updatedAt: new Date('2024-11-05'),
    },
    {
      id: 2,
      classId: 2,
      date: new Date('2024-11-10'),
      createdByTeacherId: 103,
      lastUpdatedByTeacherId: 104,
      note: 'Điểm danh đặc biệt',
      createdAt: new Date('2024-11-10'),
      updatedAt: new Date('2024-11-11'),
    },
  ];

  dispatch({
    type: 'GET_ATTENDANCE_SESSIONS',
    payload: mockData,
  });
};

const createAttendance = (data: any) => async (dispatch: any) => {
  console.log('Creating Attendance:', data);
  // Mock dispatch
  dispatch({ type: 'CREATE_ATTENDANCE_SESSION', payload: data });
};

export const attendanceActions = {
    getAllAttendanceSessions, 
    createAttendance,
};
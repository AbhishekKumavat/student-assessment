import api from './api';

const attendanceService = {
  // Get all attendance records
  getAllAttendance: async () => {
    try {
      const response = await api.get('/attendance');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get attendance for a specific student
  getStudentAttendance: async (studentId) => {
    try {
      const response = await api.get(`/attendance/student/${studentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get attendance for a specific date
  getAttendanceByDate: async (date) => {
    try {
      const response = await api.get(`/attendance/date/${date}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Create a new attendance record
  createAttendance: async (attendanceData) => {
    try {
      const response = await api.post('/attendance', attendanceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Update an attendance record
  updateAttendance: async (id, attendanceData) => {
    try {
      const response = await api.put(`/attendance/${id}`, attendanceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Delete an attendance record
  deleteAttendance: async (id) => {
    try {
      const response = await api.delete(`/attendance/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default attendanceService; 
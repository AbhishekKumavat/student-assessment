import api from './api';

const assessmentService = {
  // Get all assessment records
  getAllAssessments: async () => {
    try {
      const response = await api.get('/assessments');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get assessments for a specific student
  getStudentAssessments: async (studentId) => {
    try {
      const response = await api.get(`/assessments/student/${studentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get assessments by name
  getAssessmentsByName: async (name) => {
    try {
      const response = await api.get(`/assessments/name/${name}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Create a new assessment record
  createAssessment: async (assessmentData) => {
    try {
      const response = await api.post('/assessments', assessmentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Update an assessment record
  updateAssessment: async (id, assessmentData) => {
    try {
      const response = await api.put(`/assessments/${id}`, assessmentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Delete an assessment record
  deleteAssessment: async (id) => {
    try {
      const response = await api.delete(`/assessments/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default assessmentService; 
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Box,
  Divider,
  Avatar,
} from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  EventAvailable as AttendanceIcon,
  Assessment as AssessmentIcon,
  EmojiEvents as AchievementIcon,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import studentService from '../services/studentService';
import attendanceService from '../services/attendanceService';
import assessmentService from '../services/assessmentService';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    students: 0,
    attendance: 0,
    assessments: 0,
    achievements: 0,
  });
  const [attendanceData, setAttendanceData] = useState({
    labels: ['Present', 'Absent', 'Late', 'Excused'],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ['#4CAF50', '#F44336', '#FFC107', '#2196F3'],
      },
    ],
  });
  const [assessmentData, setAssessmentData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Average Score (%)',
        data: [],
        backgroundColor: '#1976d2',
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch students
        const studentsResponse = await studentService.getAllStudents();
        const students = studentsResponse.data || [];
        
        // Fetch attendance
        const attendanceResponse = await attendanceService.getAllAttendance();
        const attendance = attendanceResponse.data || [];
        
        // Fetch assessments
        const assessmentsResponse = await assessmentService.getAllAssessments();
        const assessments = assessmentsResponse.data || [];
        
        // Calculate statistics
        const totalStudents = students.length;
        const totalAttendance = attendance.length;
        const totalAssessments = assessments.length;
        
        // Set overall stats
        setStats({
          students: totalStudents,
          attendance: totalAttendance,
          assessments: totalAssessments,
          achievements: 25, // Mock data for achievements
        });
        
        // Process attendance data for chart
        const attendanceCounts = {
          present: attendance.filter(a => a.status === 'present').length,
          absent: attendance.filter(a => a.status === 'absent').length,
          late: attendance.filter(a => a.status === 'late').length,
          excused: attendance.filter(a => a.status === 'excused').length,
        };
        
        setAttendanceData({
          labels: ['Present', 'Absent', 'Late', 'Excused'],
          datasets: [
            {
              data: [
                attendanceCounts.present,
                attendanceCounts.absent,
                attendanceCounts.late,
                attendanceCounts.excused,
              ],
              backgroundColor: ['#4CAF50', '#F44336', '#FFC107', '#2196F3'],
            },
          ],
        });
        
        // Process assessment data for chart
        const assessmentTypes = [...new Set(assessments.map(a => a.name))];
        const assessmentAverages = assessmentTypes.map(type => {
          const typeAssessments = assessments.filter(a => a.name === type);
          const total = typeAssessments.reduce((sum, curr) => sum + curr.percentage, 0);
          return total / (typeAssessments.length || 1);
        });
        
        setAssessmentData({
          labels: assessmentTypes,
          datasets: [
            {
              label: 'Average Score (%)',
              data: assessmentAverages,
              backgroundColor: '#1976d2',
            },
          ],
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Mock data for recent activity
  const recentActivities = [
    { id: 1, type: 'student', message: 'New student John Doe added', time: '2 hours ago' },
    { id: 2, type: 'attendance', message: 'Attendance updated for Class CS401', time: '3 hours ago' },
    { id: 3, type: 'assessment', message: 'Unit Test 2 scores uploaded', time: 'Yesterday' },
    { id: 4, type: 'achievement', message: 'Sarah Jane won the coding competition', time: '2 days ago' },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" className="page-title" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="card-hover" sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">Students</Typography>
                <Typography variant="h4">{stats.students}</Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                <PeopleIcon />
              </Avatar>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="card-hover" sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">Attendance Records</Typography>
                <Typography variant="h4">{stats.attendance}</Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56 }}>
                <AttendanceIcon />
              </Avatar>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="card-hover" sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">Assessments</Typography>
                <Typography variant="h4">{stats.assessments}</Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#ff9800', width: 56, height: 56 }}>
                <AssessmentIcon />
              </Avatar>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="card-hover" sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">Achievements</Typography>
                <Typography variant="h4">{stats.achievements}</Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#4caf50', width: 56, height: 56 }}>
                <AchievementIcon />
              </Avatar>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Assessment Performance" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={assessmentData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                          display: true,
                          text: 'Average Score (%)'
                        }
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Assessment Type'
                        }
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Attendance Overview" />
            <CardContent>
              <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Pie
                  data={attendanceData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Recent Activity" />
            <CardContent>
              {recentActivities.map((activity) => (
                <Box key={activity.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        mr: 2,
                        bgcolor: 
                          activity.type === 'student' ? 'primary.main' :
                          activity.type === 'attendance' ? 'secondary.main' :
                          activity.type === 'assessment' ? '#ff9800' : '#4caf50'
                      }}
                    >
                      {activity.type === 'student' && <PeopleIcon />}
                      {activity.type === 'attendance' && <AttendanceIcon />}
                      {activity.type === 'assessment' && <AssessmentIcon />}
                      {activity.type === 'achievement' && <AchievementIcon />}
                    </Avatar>
                    <Box>
                      <Typography variant="body1">{activity.message}</Typography>
                      <Typography variant="caption" color="textSecondary">{activity.time}</Typography>
                    </Box>
                  </Box>
                  <Divider />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 
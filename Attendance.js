import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Attendance = () => {
  return (
    <Box>
      <Typography variant="h4" className="page-title" gutterBottom>
        Attendance
      </Typography>
      
      <Card>
        <CardContent>
          <Typography variant="body1">
            This is the Attendance page where teachers can track and manage student attendance.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Attendance; 
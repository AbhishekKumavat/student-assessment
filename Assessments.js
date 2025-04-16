import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Assessments = () => {
  return (
    <Box>
      <Typography variant="h4" className="page-title" gutterBottom>
        Assessments
      </Typography>
      
      <Card>
        <CardContent>
          <Typography variant="body1">
            This is the Assessments page where teachers can track Unit Tests, Prelim exams, and other assessment scores.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Assessments; 
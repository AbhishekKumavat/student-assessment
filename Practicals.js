import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Practicals = () => {
  return (
    <Box>
      <Typography variant="h4" className="page-title" gutterBottom>
        Mock Practicals
      </Typography>
      
      <Card>
        <CardContent>
          <Typography variant="body1">
            This is the Mock Practicals page where teachers can record student performance in practical assessments and labs.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Practicals; 
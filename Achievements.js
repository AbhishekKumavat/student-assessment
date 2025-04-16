import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Achievements = () => {
  return (
    <Box>
      <Typography variant="h4" className="page-title" gutterBottom>
        Achievements
      </Typography>
      
      <Card>
        <CardContent>
          <Typography variant="body1">
            This is the Achievements page where teachers can record student accomplishments and extracurricular activities.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Achievements; 
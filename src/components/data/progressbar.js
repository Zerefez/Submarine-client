import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';

function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 40 }}>
          <Typography variant="body2" sx={{ color: 'text-zinc-200'  }}>
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }
  
  LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };
  
  export default function LinearWithValueLabel({ value }) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgressWithLabel value={value} />
      </Box>
    );
  }
  
  LinearWithValueLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };

export { LinearProgressWithLabel };

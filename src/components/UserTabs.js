import { useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function UserTabs({ children, onChange }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    let tab = "";
    if (newValue === 0) {
      tab = "posts";
    } else if (newValue === 1) {
      tab = "albums";
    } else if (newValue === 2) {
      tab = "likes"
    }
    onChange(tab);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="User posts and pictures">
          <Tab label="Posts" {...a11yProps(0)} />
          <Tab label="Pictures" {...a11yProps(1)} />
          <Tab label="Likes" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={value}>
        {children}
      </TabPanel>
    </Box>
  );
}

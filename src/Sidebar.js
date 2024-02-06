import React from 'react';
import './Sidebar.scss';
import { Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import DescriptionIcon from '@mui/icons-material/Description';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { NavLink, useLocation } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export const SideBarData = [
  {
    title: 'Books',
    icon: <DashboardIcon />,
    path: '/books'
  },
  {
    title: 'Members',
    icon: <AssessmentIcon />,
    path: '/members'
  },
  {
    title: 'Issuance',
    icon: <SpaceDashboardIcon />,
    path: '/issuance'
  },
  {
    title: 'Return Status',
    icon: <DescriptionIcon />,
    path: '/return-status'
  }
];

const SideBar = () => {
  const location = useLocation();

  return (
    <div className='sideBar'>
      <div className='sideBarLogo' style={{ cursor: 'pointer' }}>
        <MenuBookIcon sx={{ backgroundColor: '#605bff', borderRadius: '50% 50%', width: '50px', height: '50%', color: 'white' }} />
        <Typography variant='h6'>BOOK WORLD</Typography>
      </div>
      <ul className='sideBarList'>
        {SideBarData.map((e, index) => (
          <li key={index} className='sideBarRow'>
            <NavLink to={e.path} className='row'>
              <div className="listContainer">
                <div className='icon'>
                  {e.icon}
                </div>
                <Typography
                  component='span'
                  variant='subtitle1'
                  className='title'
                >
                  {e.title}
                </Typography>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;

import React from 'react';
import './Sidebar.scss';
import { Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
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
    title: 'Pending Status',
    icon: <DescriptionIcon />,
    path: '/return-status'
  }
];

const SideBar = () => {
  const location = useLocation();

  return (
    <div className='sideBar'>
      <div className='sideBarLogo' style={{ cursor: 'pointer' }}>
        <MenuBookIcon sx={{ borderRadius: '50% 50%', width: '50px', height: '50%', color: '#E78895' }} />
        <Typography variant='h5' sx={{color: '#7F27FF', paddingRight:'10px', fontWeight:'200px'}}>BOOK WORLD</Typography>
      </div>
      <ul className='sideBarList'>
        {SideBarData.map((e, index) => (
          <li key={index} className='sideBarRow'>
            <NavLink to={e.path} className='row' style={{textDecoration:'none', color:'black'}}>
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

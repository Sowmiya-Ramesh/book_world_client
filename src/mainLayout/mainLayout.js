import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';
import './mainLayout.scss';
import Sidebar from '../Sidebar'

const MainLayout = () => {
  return (
    <>
      <Grid container spacing={1} columnSpacing={{ xs: 2 }} className='grid'>
        <Grid item md={2}>
          <Sidebar />
        </Grid>
        <Grid style={{ marginLeft: '3%' }}></Grid>
        <Grid item md={9} style={{ paddingLeft: '0px' }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default MainLayout;
import React, { Fragment } from 'react';
import { Spinner } from 'reactstrap';

const SpinnerLoading = props => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
      <h4 className={'mt-sm-2'}>Memuat data...</h4>
    </div>
  );
};

export default SpinnerLoading;

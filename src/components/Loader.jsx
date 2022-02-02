import React from 'react';
import { TailSpin } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className="loader d-flex align-items-center justify-content-center">
      <TailSpin color="#eee" height={ 80 } width={ 80 } />
    </div>
  );
}

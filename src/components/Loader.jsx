import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function Loader() {
  return (
    <div className="loader d-flex align-items-center justify-content-center">
      <Spinner animation="border" variant="light" size="xxl" />
    </div>
  );
}

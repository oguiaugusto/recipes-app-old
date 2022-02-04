import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GeneralContext from '../context/GeneralContext';

export default function NotFound() {
  const { user } = useContext(GeneralContext);
  const [pathToGo, setPathToGo] = useState('to go to Foods');
  const [pathname, setPathname] = useState('/foods');

  useEffect(() => {
    console.log(user);
    if (user.email === '') {
      setPathToGo('to login');
      setPathname('/');
    }
  }, [user]);

  return (
    <div className="text-light text-center">
      <h1 className="mb-1">Not Found</h1>
      <Link to={ pathname }>
        <p>{ `Please, click here ${pathToGo}` }</p>
      </Link>
    </div>
  );
}

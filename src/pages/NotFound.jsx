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
    <div className="not-found-page text-light text-center">
      <div className="not-found-container pb-2 px-4">
        <h1 className="for-o-for">404</h1>
        <p className="mb-0">Page not found</p>
        <Link to={ pathname }>
          <span>{ `Please, click here ${pathToGo}` }</span>
        </Link>
      </div>
    </div>
  );
}

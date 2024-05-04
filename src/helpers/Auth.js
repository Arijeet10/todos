"use client";

import { useEffect } from 'react';
// import Router from 'next/router';
import { useRouter } from 'next/navigation';

const Auth = (WrappedComponent) => {


  const AuthComponent = (props) => {
    const router=useRouter();

    useEffect(() => {

      // Check if user is authenticated 
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("No tokennnnn")
        // If not authenticated, redirect to login page
        router.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default Auth;

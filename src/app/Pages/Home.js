"use client"
import React, { useEffect } from 'react';
import useUserStore from '../components/userStore';
import Writer from '../components/Writer';
import Publisher from '../components/Publisher';

const HomePage = () => {
  const { userType, setUserType } = useUserStore();

  useEffect(() => {
    const disableRightClick = (event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
      if (event.key === 'PrintScreen') {
        document.getElementById('screenshot-overlay').classList.remove('hidden');
      }
      if (event.shiftKey && event.key === 's' && event.metaKey) {
        document.getElementById('screenshot-overlay').classList.remove('hidden');
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'PrintScreen' || (event.shiftKey && event.key === 's' && event.metaKey)) {
        document.getElementById('screenshot-overlay').classList.add('hidden');
      }
    };

    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className='flex flex-col items-center m-5'>
      <div id="screenshot-overlay" className="hidden fixed inset-0 bg-black opacity-75 z-50"></div>
      <h1 className='text-center'>Test Task</h1>
      <h2 className='text-center'>upload and manage text content in a browser-based database</h2>
      <h3 className='text-center'>User Type: {userType}</h3>
      <div>
        <button onClick={() => setUserType('Writer')} className='m-2'>Writer</button>
        <button onClick={() => setUserType('Publisher')} className='m-2'>Publisher</button>
      </div>
      
      {userType === 'Writer' ? (
        <Writer />
      ) : (
        <Publisher />
      )}
    </div>
  );
};

export default HomePage;
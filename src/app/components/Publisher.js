// pages/publisher.js
import { useEffect, useState } from 'react';
import localforage from 'localforage';
import CryptoJS from 'crypto-js';

export default function Publisher() {
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadEncryptedContent('Writer');
      setContentList(data || []);
    };
    loadData();

    const channel = new BroadcastChannel('session_sync');
    channel.onmessage = async (event) => {
      if (event.data.session === 'Writer') {
        const data = await loadEncryptedContent('Writer');
        setContentList(data);
      }
    };
  }, []);

  const loadEncryptedContent = async (session) => {
    const data = await localforage.getItem(session);
    return data ? data.map((item) => {
      const bytes = CryptoJS.AES.decrypt(item, 'secret-key');
      return bytes.toString(CryptoJS.enc.Utf8);
    }) : [];
  };

  return (
    <div>
      <h1 className='text-red-600'>Publisher Page</h1>
      <ul className='list-none p-0 m-0'>
        {contentList.map((item, index) => (
          <li key={index} className='p-2 border-b border-gray-300 last:border-b-0 text-lg'>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}


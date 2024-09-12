// pages/writer.js
import { useState, useEffect } from 'react';
import localforage from 'localforage';
import useUserStore from './userStore';
import CryptoJS from 'crypto-js';

export default function Writer() {
  const { userType } = useUserStore();
  const [content, setContent] = useState('');
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadEncryptedContent('Writer');
      setContentList(data || []);
    };
    loadData();
  }, []);

  const handleUpload = async () => {
    await saveEncryptedContent('Writer', content);
    setContent('');
    const data = await loadEncryptedContent('Writer');
    setContentList(data);
    syncData('Writer', content);
  };

  const saveEncryptedContent = async (session, content) => {
    const encrypted = CryptoJS.AES.encrypt(content, 'secret-key').toString();
    const currentData = (await localforage.getItem(session)) || [];
    currentData.push(encrypted);
    await localforage.setItem(session, currentData);
  };

  const loadEncryptedContent = async (session) => {
    const data = await localforage.getItem(session);
    return data ? data.map((item) => {
      const bytes = CryptoJS.AES.decrypt(item, 'secret-key');
      return bytes.toString(CryptoJS.enc.Utf8);
    }) : [];
  };

  const syncData = (session, content) => {
    const channel = new BroadcastChannel('session_sync');
    channel.postMessage({ session, content });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      setContent(text);
    };
    reader.readAsText(file);
  };


  return (
    <div className=''>
      <h1>Writer Page</h1>
      <textarea
        value={content}
        className='py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 m-5'
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your text here..."
      />
      <button onClick={handleUpload} className='bg-green-600 p-2 rounded-md'>Upload Text</button>

      <input type="file" onChange={handleFileUpload} className='m-5 rounded-md bg-slate-500' />
    </div>
  );
}

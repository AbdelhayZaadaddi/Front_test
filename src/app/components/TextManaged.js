"use client";

import React, { useEffect, useState } from 'react';

const TextManaged = () => {

    const [text, SetText] = useState('');
    const [textList, setTextList] = useState(() => {
        const savedTextList = localStorage.getItem('textList');
        return savedTextList ? JSON.parse(savedTextList) : [];
    });

    useEffect(() => {
        localStorage.setItem('textList', JSON.stringify(textList));
    }, [textList]);

    const handleChange = (e) => {
        SetText(e.target.value);
    };

    const handleSubmit = () => {
        setTextList([...textList, text]);
        SetText('');
    };

    const deleteText = (index) => {
        const newList = textList.filter((_, i) => i !== index);
        setTextList(newList);
    };

  return (
    <div class="mt-5 max-w-sm space-y-9">
        <textarea class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" rows="3" 
        placeholder="Enter your text"
        value={text}
        onChange={handleChange}
        >
        </textarea>
        <button onClick={handleSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        <div>
            {textList.map((text, index) => (
                <div key={index} className='flex items-center justify-between mt-2'>
                    <p>{text}</p>
                    <button onClick={() => deleteText(index)} className='bg-red-500 rounded-full p-1'>X</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TextManaged
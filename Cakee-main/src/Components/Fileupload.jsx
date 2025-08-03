 


import React, { useState, useRef } from 'react';
import axios from 'axios';

function Fileupload() {
    const [file, setFile] = useState();
    const [fileName, setFilename] = useState("");
    const [message, setMessage] = useState("");
    const fileInput = useRef();

    // Function to handle file input
    const imageFile = () => {
        const selectedFile = fileInput.current.files[0];
        setFile(selectedFile);
        setFilename(selectedFile.name);
    };

    // Function to upload file
    const uploadFile = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('filename', fileName);

        try {
            const res = await axios.post('https://cake-server-7c9k.onrender.com/upload', formData);
            setMessage(res.data.message);
            fileInput.current.value = "";
        } catch (error) {
            setMessage("Error uploading file.");
        }
    };

    return (
        <div className='m-5'>
            <input type="file" ref={fileInput} onChange={imageFile} />
            <button onClick={uploadFile} className='bg-pink-400'> Upload </button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Fileupload;

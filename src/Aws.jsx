import React, { useEffect, useState } from 'react';
import ThreeDBackground from './ThreeDBackground'; 
import './Aws.css'; 

const Aws = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/message')
            .then(res => res.json())
            .then(data => setMessage(data.message))
            .catch(error => console.error('Error fetching message:', error));
    }, []);

    const handleSaveMessage = async () => {
        if (inputMessage.trim() === '') {
            alert('Please enter a message before saving.');
            return;
        }

        const res = await fetch('http://localhost:5000/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: inputMessage })
        });

        const result = await res.json();
        if (result.success) {
            setResponse(result.message);
        } else {
            setResponse('Failed to save the message.');
        }
    };

    return (
        <div className="container">
            <ThreeDBackground /> {/* Add 3D background here */}
            <div className="card">
                <h1 className="title">Node.js Server Response</h1>
                <p className="message">{message}</p>
                <input
                    type="text"
                    placeholder="Enter your message"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="input"
                />
                <button onClick={handleSaveMessage} className="button">
                    Save
                </button>
                {response && <p className="response">{response}</p>}
            </div>
        </div>
    );
};

export default Aws;

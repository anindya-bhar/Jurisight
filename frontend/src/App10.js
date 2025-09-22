import React, { useState, useEffect } from 'react';
import { jurisightService } from './api/jurisight';
import Header from "./MyComponents/Header";
import Body from "./MyComponents/Body";
import Footer from "./MyComponents/Footer";


function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // Handle file selection
  const handleFileSelect = (file) => {
    setUploadedFile(file);
  };

  // Handle text input change
  const handleTextChange = (text) => {
    setTextInput(text);
  };

  // Process both file and text together
  const handleProcess = async () => {
    console.log('abcd');
    try {
      
      let fileResult = null;
      let textResult = null;

      // Process file if uploaded
      if (uploadedFile) {
        const formData = new FormData();
        formData.append('file', uploadedFile);
        const response = await jurisightService.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        fileResult = response.data;
      }

      // Process text if entered
      if (textInput.trim()) {
        textResult = await jurisightService.processDocument({
          text: textInput,
          task: 'analyze'
        });
      }

      // Add to chat history
      const entry = {
        id: Date.now(),
        fileResult,
        textResult,
        fileName: uploadedFile?.name || null,
        inputText: textInput,
        timestamp: new Date().toLocaleTimeString()
      };

      setChatHistory(prev => [...prev, entry]);
      
      // Clear inputs after processing
      setTextInput('');
      setUploadedFile(null);

    } catch (error) {
      console.error('Processing failed:', error);
      // Add error to chat
      setChatHistory(prev => [...prev, {
        id: Date.now(),
        error: error.message,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  };

  return (
    <div className="App">
      <Header/>
      {/* <p className="status">Backend Status: {apiStatus}</p> */}
      <Body uploadedFile={uploadedFile}
        textInput={textInput}
        chatHistory={chatHistory}
        onFileSelect={handleFileSelect}
        onTextChange={handleTextChange}
        onProcess={handleProcess}/>
      <Footer/>
    </div>
  );
}

export default App;

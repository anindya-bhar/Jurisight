import React, { useState } from 'react';
import { jurisightService } from './api/jurisight';
import './MyComponents/Header.css';
import './MyComponents/Footer.css';
import './MyComponents/Body.css';
import './MyComponents/Left.css';
import './MyComponents/Right.css';
import './MyComponents/Textbox.css';
import './App.css';
import './MyComponents/ChatHis.css';

import sendIcon from "./images/send.jpeg";
import uploadIcon from "./images/upload.svg";

import ChatAI from './MyComponents/ChatAI';
import ChatUser from "./MyComponents/ChatUser";

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [lastUploadedFileName, setLastUploadedFileName] = useState(null);
  
  // ✅ FIX #1: This state will now be the single source of truth for the document context.
  const [processedFileName, setProcessedFileName] = useState(null);

  const handleFileSelect = (file) => {
    setUploadedFile(file);
  };

  const handleTextChange = (text) => {
    setTextInput(text);
  };

  // ✅ FIX #2: Rewritten handleProcess function for clarity and correct state management.
  const handleProcess = async () => {
    // Determine what action to take
    const isFileAction = uploadedFile !== null;
    const isTextAction = textInput.trim() !== '';
    
    // Create a new entry for the chat history
    const entry = { id: Date.now(), timestamp: new Date().toLocaleTimeString(), inputText: textInput };

    try {
      // --- A) Handle the file upload and processing ---
      if (isFileAction) {
        entry.fileName = uploadedFile.name;
        const formData = new FormData();
        formData.append('file', uploadedFile);
        const response = await jurisightService.uploadFile(formData);
        
        entry.fileResult = response.data;
        
        // This is the most important change: We remember the file's name for future questions.
        setProcessedFileName(uploadedFile.name); 
      }

      // --- B) Handle the text query (a question) ---
      else if (isTextAction) {
        if (!processedFileName) {
          // If the user asks a question before uploading a file
          entry.error = "Please upload a document before asking a question about it.";
        } else {
          // Send the question along with the name of the document we're talking about
          const response = await jurisightService.processDocument({
            text: textInput,
            task: 'analyze',
            document_type: processedFileName // Send the context!
          });
          entry.textResult = response.data;
        }
      }
      
      setChatHistory(prev => [...prev, entry]);

    } catch (error) {
      console.error('Processing failed:', error);
      entry.error = error.message;
      setChatHistory(prev => [...prev, entry]);
    } finally {
        // ✅ FIX #3: Only clear the inputs that were used in this action.
        if (isFileAction) {
          setUploadedFile(null); // Clear the file from the upload queue
        }
        if (isTextAction) {
          setTextInput(''); // Clear the text box
        }
    }
  };

  // const handleProcess = async () => {
  //   try {
  //     const entry = { id: Date.now(), timestamp: new Date().toLocaleTimeString() };

  //     if (uploadedFile) {
  //       const formData = new FormData();
  //       formData.append('file', uploadedFile);
  //       const response = await jurisightService.uploadFile(formData);
  //       entry.fileResult = response.data;
  //       setLastUploadedFileName(uploadedFile.name); // Remember the file name
  //     } else if (textInput.trim()) {
  //       if (!lastUploadedFileName) {
  //         entry.error = "Please upload a document first.";
  //       } else {
  //         const response = await jurisightService.processDocument({
  //           text: textInput,
  //           task: 'analyze',
  //           document_type: lastUploadedFileName // Send the last uploaded file name
  //         });
  //         entry.textResult = response.data;
  //       }
  //     }

  //     setChatHistory(prev => [...prev, entry]);
  //     setTextInput('');
  //     setUploadedFile(null);
  //   } catch (error) {
  //     console.error('Processing failed:', error);
  //     setChatHistory(prev => [...prev, {
  //       id: Date.now(),
  //       error: error.message,
  //       timestamp: new Date().toLocaleTimeString()
  //     }]);
  //   }
  // };

  return (
    <div className="App">
      <header>
        <img src="./MyComponents/juri.png" alt="" />
        Jurisight AI
      </header>
      <div className='main-body'> 
        {/* Use a separate function for the file form submission */}
        <form className='left' onSubmit={(e) => { e.preventDefault(); handleProcess(); }}>
            <span className='left-title'>DOCUMENT</span>
            <div className="upload-file">
                <input type="file" id="file-up" accept=".pdf,.doc,.docx,.txt" className="file-up" onChange={(e) => handleFileSelect(e.target.files[0])}/>
                <label htmlFor="file-up" className="file-up-label">
                  <img src={uploadIcon} alt="" className='file-up-photo'/>
                  <span className='file-up-text'>{uploadedFile ? uploadedFile.name : 'Drag & Drop or Browse File'}</span>     
                </label>
                <p className="file-type">PDF, DOCX, TXT (Max 10MB)</p>
            </div>
            {/* The button is now only for processing the document */}
            <button className="process-button" type='submit' disabled={!uploadedFile}>Process Document</button>
            {/* ... other form elements */}
        </form>
        <div className='right'>
            <div className='chat-history'>
              {chatHistory.length === 0 ? (
                <ChatAI message="Please upload a legal document to begin." />
              ) : (
                chatHistory.map(entry => {
                  // This component renders a complete chat turn (user + AI)
                  return (
                    <div key={entry.id}>
                      {entry.fileName && <ChatUser message={`Processed file: ${entry.fileName}`} />}
                      {entry.inputText && <ChatUser message={entry.inputText} />}
                      <ChatAI
                        message={
                          entry.error
                            ? `Error: ${entry.error}`
                            : entry.fileResult
                              ? entry.fileResult.result
                              : entry.textResult
                                ? entry.textResult.result
                                : 'Processing...'
                        }
                      />
                    </div>
                  );
                })
              )}
            </div>
              <form className='textbox' onSubmit={(e) => { e.preventDefault(); handleProcess(); }}>
                <input 
                  type="text" 
                  placeholder={processedFileName ? `Ask about ${processedFileName}... `: 'Upload a document first...'} 
                  className='prompt' 
                  value={textInput} 
                  onChange={(e) => handleTextChange(e.target.value)}
                  disabled={!processedFileName} // Disable input until a file is processed
                />
                <button type="submit" className="send" disabled={!textInput.trim()}>
                    <img src={sendIcon} alt="send" className='send-button' />
                </button>
              </form>
        </div>
    </div>
    <footer>
         <p className='footer-text'>
            &copy; 2023 Jurisight AI. Powered by Google Gemini & Cloud Vision.
        </p>
    </footer>
    </div>
  );
}

export default App;
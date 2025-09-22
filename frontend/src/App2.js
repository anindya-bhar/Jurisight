// src/App.js
// Updated App.js to use the new API service

import React, { useState, useEffect } from 'react';
import { jurisightService } from './api/jurisight';
import './App.css';

function App() {
  const [apiStatus, setApiStatus] = useState('⏳ Checking...');
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check API health when component mounts
  useEffect(() => {
    checkAPIHealth();
  }, []);

  const checkAPIHealth = async () => {
    try {
      await jurisightService.healthCheck();
      setApiStatus('✅ Connected');
    } catch (error) {
      setApiStatus('❌ Disconnected');
      console.error('Health check failed:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await jurisightService.processDocument({
        text: inputText,
        task: 'analyze'
      });
      setResult(response);
    } catch (error) {
      setError(error.message);
      console.error('Processing failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🇮🇳 JuriSight Legal AI</h1>
        <p className="status">Backend Status: {apiStatus}</p>
        
        <div className="main-content">
          <form onSubmit={handleSubmit} className="input-form">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your legal document or question here..."
              rows={6}
              cols={60}
              disabled={loading}
            />
            <br />
            <button 
              type="submit" 
              disabled={loading || !inputText.trim()}
              className="submit-btn"
            >
              {loading ? '⏳ Processing...' : '🔍 Analyze Document'}
            </button>
          </form>

          {error && (
            <div className="error-message">
              <h3>❌ Error</h3>
              <p>{error}</p>
              <button onClick={checkAPIHealth} className="retry-btn">
                🔄 Check Connection
              </button>
            </div>
          )}

          {result && (
            <div className="result-container">
              <h3>📋 Legal Analysis Result</h3>
              <div className="result-content">
                <p><strong>Result:</strong> {result.result}</p>
                <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%</p>
                <p><strong>Task:</strong> {result.task}</p>
                <p><strong>Status:</strong> {result.status}</p>
                {result.document_type && (
                  <p><strong>Document Type:</strong> {result.document_type}</p>
                )}
                {result.suggestions && (
                  <div>
                    <strong>Suggestions:</strong>
                    <ul>
                      {result.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <footer className="app-footer">
          <p>⚡ Powered by Google Cloud | 🏆 Gen AI Exchange Hackathon 2025</p>
        </footer>
      </header>
    </div>
  );
}

export default App;
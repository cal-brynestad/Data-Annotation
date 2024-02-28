const mockRequest = {
    json: () => Promise.resolve({ messages: [{ role: 'user', content: 'Hello, GPT-4!' }] }),
  };
  
  const mockResponse = {
    write: console.log, // Log the output for testing purposes
  };
  
  // Import and call the POST function
  import POST from './index.js';
POST(mockRequest, mockResponse);
  
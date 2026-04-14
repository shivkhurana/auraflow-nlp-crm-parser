import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [text, setText] = useState('');
  const [parsedData, setParsedData] = useState<any>(null);

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:8000/api/parse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setParsedData(data.parsed_data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AuraFlow NLP Parser</h1>
      <textarea
        className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
        placeholder="Paste raw customer emails/notes here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Parse
      </button>
      {parsedData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Parsed Insights</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded">
              <strong>Name:</strong> {parsedData.Name}
            </div>
            <div className="p-4 border rounded">
              <strong>Email:</strong> {parsedData.Email}
            </div>
            <div className="p-4 border rounded">
              <strong>Company:</strong> {parsedData.Company}
            </div>
            <div className="p-4 border rounded">
              <strong>Intent:</strong> {parsedData.Intent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
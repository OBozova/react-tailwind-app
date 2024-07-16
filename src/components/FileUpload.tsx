// src/components/FileUpload.tsx

import { ChangeEvent, FormEvent, useState } from "react";
import api from "../api";

const FileUpload = () => {
    const [file, setFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setUploadMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('csvfile', file);

    try {
      const response = await api.post('/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadMessage('Failed to upload file');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="csvfile" className="block text-sm font-medium text-gray-700">
            Choose a CSV file
          </label>
          <div className="mt-1 flex items-center space-x-4">
            <input
              type="file"
              id="csvfile"
              name="csvfile"
              accept=".csv"
              onChange={handleFileChange}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload CSV
            </button>
          </div>
        </div>
        {uploadMessage && (
          <p className="text-sm text-gray-500">{uploadMessage}</p>
        )}
      </form>
    </div>
  );
};

export default FileUpload;

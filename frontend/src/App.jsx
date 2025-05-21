import { useState, useEffect } from "react";
import "./App.css";

// Footer component
const Footer = () => (
  <footer className="mt-20 py-6 border-t border-gray-200">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Scientific Metadata Extractor
          </p>
        </div>
        <div className="flex space-x-4">
          <a href="https://github.com/burak-albayrak/scientific-metadata-extractor" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 transition-colors">
            <span className="sr-only">GitHub</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// File item component
const FileItem = ({ file, onRemove, status, results }) => {
  return (
    <div className={`p-3 rounded-lg mb-2 flex items-center justify-between ${
      status === 'completed' ? 'bg-green-50 border border-green-200' :
      status === 'error' ? 'bg-red-50 border border-red-200' :
      status === 'processing' ? 'bg-blue-50 border border-blue-200' :
      'bg-gray-50 border border-gray-200'
    }`}>
      <div className="flex items-center">
        <div className="mr-3">
          {status === 'completed' ? (
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : status === 'error' ? (
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          ) : status === 'processing' ? (
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {file.name}
          </p>
          <p className="text-xs text-gray-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB · PDF
          </p>
        </div>
      </div>
      <div className="flex items-center">
        {status === 'completed' && (
          <button 
            onClick={() => results && window.scrollTo({
              top: document.getElementById(`result-${file.name}`).offsetTop - 120,
              behavior: 'smooth'
            })} 
            className="mr-2 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 py-1 px-2 rounded-md transition-colors duration-75"
          >
            View
          </button>
        )}
        {status !== 'processing' && (
          <button
            onClick={() => onRemove(file)}
            className="text-blue-500 hover:text-red-500 bg-blue-50 hover:bg-red-50 p-1 rounded-full transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

function App() {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState({});
  const [fileStatus, setFileStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [isDownloadingExcel, setIsDownloadingExcel] = useState({});

  useEffect(() => {
    // Trigger entrance animation after component mounts
    setAnimateIn(true);
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      const newFiles = Array.from(e.target.files);
      addFiles(newFiles);
    }
  };

  const addFiles = (newFiles) => {
    // Filter out duplicate files by name
    const fileMap = new Map(files.map(f => [f.name, f]));
    newFiles.forEach(file => {
      if (!fileMap.has(file.name) && file.type === 'application/pdf') {
        fileMap.set(file.name, file);
      }
    });
    
    const updatedFiles = Array.from(fileMap.values());
    setFiles(updatedFiles);
    
    // Initialize status for new files
    const newStatus = { ...fileStatus };
    updatedFiles.forEach(file => {
      if (!newStatus[file.name]) {
        newStatus[file.name] = 'pending';
      }
    });
    setFileStatus(newStatus);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files?.length) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const pdfFiles = droppedFiles.filter(file => file.type === 'application/pdf');
      if (pdfFiles.length > 0) {
        addFiles(pdfFiles);
      }
    }
  };

  const removeFile = (fileToRemove) => {
    setFiles(files.filter(file => file.name !== fileToRemove.name));
    
    // Also remove from results if exists
    if (results[fileToRemove.name]) {
      const newResults = { ...results };
      delete newResults[fileToRemove.name];
      setResults(newResults);
    }
    
    // Remove from status
    const newStatus = { ...fileStatus };
    delete newStatus[fileToRemove.name];
    setFileStatus(newStatus);
  };

  const processFiles = async () => {
    if (files.length === 0) return;
    setLoading(true);

    // Process files one by one
    for (const file of files) {
      // Skip already processed files
      if (fileStatus[file.name] === 'completed') continue;
      
      // Update status to processing
      setFileStatus(prev => ({ ...prev, [file.name]: 'processing' }));
      
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("https://scientific-metadata-extractor.onrender.com/api/extract", {
          method: "POST",
          body: formData,
        });
        
        const json = await res.json();
        
        if (json.error) {
          setFileStatus(prev => ({ ...prev, [file.name]: 'error' }));
        } else {
          // Store result
          setResults(prev => ({ 
            ...prev, 
            [file.name]: json 
          }));
          setFileStatus(prev => ({ ...prev, [file.name]: 'completed' }));
        }
      } catch (err) {
        setFileStatus(prev => ({ ...prev, [file.name]: 'error' }));
      }
    }
    
    setLoading(false);
  };

  // Count files by status
  const pendingCount = Object.values(fileStatus).filter(status => status === 'pending').length;
  const completedCount = Object.values(fileStatus).filter(status => status === 'completed').length;
  const errorCount = Object.values(fileStatus).filter(status => status === 'error').length;
  const processingCount = Object.values(fileStatus).filter(status => status === 'processing').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 bg-animated flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-grow">
        <header className={`mb-10 text-center ${animateIn ? 'fade-in' : 'opacity-0'}`} style={{ transitionDelay: '300ms' }}>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-2">
            Scientific Metadata Extractor
          </h1>
          <p className="text-gray-600">Extract structured data from scientific PDFs using AI</p>
        </header>

        <div className="max-w-3xl mx-auto">
          <div 
            className={`relative border-2 border-dashed rounded-xl p-10 ${
              dragActive 
                ? "border-blue-500 bg-blue-50 pulse-animation" 
                : files.length > 0
                  ? "border-green-400 bg-green-50" 
                  : "border-gray-300 hover:border-gray-400"
            } ${animateIn ? 'fade-in' : 'opacity-0'} card-hover transition-colors duration-75`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto floating">
                {files.length > 0 ? (
                  <div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-700">
                {files.length > 0 
                  ? `${files.length} PDF file${files.length > 1 ? 's' : ''} selected` 
                  : "Drag & drop PDF files here"}
              </h3>
              <p className="text-sm text-gray-500">
                {files.length > 0 
                  ? `${completedCount} processed, ${pendingCount} pending${errorCount > 0 ? `, ${errorCount} with errors` : ''}` 
                  : "or click to browse files (you can select multiple PDFs)"}
              </p>
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
              />
            </div>
          </div>

          {files.length > 0 && (
            <div className={`mt-6 ${animateIn ? 'fade-in' : 'opacity-0'}`} style={{ transitionDelay: '600ms' }}>
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Selected files ({files.length})</h3>
                <div className="max-h-64 overflow-y-auto pr-2">
                  {files.map(file => (
                    <FileItem 
                      key={file.name} 
                      file={file} 
                      onRemove={removeFile} 
                      status={fileStatus[file.name]}
                      results={results[file.name]}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className={`mt-6 flex justify-center ${animateIn ? 'fade-in' : 'opacity-0'}`} style={{ transitionDelay: '700ms' }}>
            <button
              onClick={processFiles}
              disabled={loading || files.length === 0 || pendingCount === 0}
              className={`
                ${loading || files.length === 0 || pendingCount === 0 ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600'}
                text-white py-3 px-8 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2
              `}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="ml-2">Processing... ({processingCount}/{files.length})</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="ml-2">
                    {files.length === 0 
                      ? "Extract Metadata"
                      : pendingCount > 0
                        ? `Extract Metadata (${pendingCount} file${pendingCount > 1 ? 's' : ''})`
                        : 'All files processed'}
                  </span>
                </>
              )}
            </button>
          </div>

          {Object.keys(results).length > 0 && (
            <div className="mt-12 space-y-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Extracted Results
                <div className="mt-2 text-sm font-normal text-gray-500">
                  {Object.keys(results).length} document{Object.keys(results).length > 1 ? 's' : ''} processed
                </div>
              </h2>
              
              {Object.entries(results).map(([fileName, data]) => (
                <div 
                  id={`result-${fileName}`}
                  key={fileName} 
                  className="bg-white rounded-xl shadow-xl overflow-hidden transition-all slide-up border border-gray-100 hover:border-blue-200 hover:shadow-blue-100"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 truncate">
                          {fileName}
                        </h2>
                        <p className="text-xs text-gray-500">
                          Showing extracted metadata for this document
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-6">
                      {(() => {
                        // İstenen sıralama
                        const fieldOrder = [
                          'doi',
                          'title',
                          'authors',
                          'objective', // purpose of the article
                          'findings', // key findings
                          'limitations',
                          'study_region',
                          'methodology_type', // methodology
                          'publication_year', // year
                          'focus_topic', // focused topic
                          'recommendations'
                        ];
                        
                        // Sıralanmış alanları oluştur
                        const sortedEntries = [];
                        
                        // Önce belirtilen sırada olan alanları ekle
                        fieldOrder.forEach(field => {
                          if (data[field] !== undefined) {
                            sortedEntries.push([field, data[field]]);
                          }
                        });
                        
                        // Sonra diğer tüm alanları ekle (belirtilmeyen alanlar)
                        Object.entries(data).forEach(([key, value]) => {
                          if (!fieldOrder.includes(key)) {
                            sortedEntries.push([key, value]);
                          }
                        });
                        
                        return sortedEntries.map(([key, value], index) => {
                          const isImportantField = ['title', 'authors', 'doi', 'publication_year', 'objective', 'findings'].includes(key);
                        
                        return (
                          <div 
                            key={key} 
                              className={`p-4 rounded-lg border border-gray-100 transition-all duration-200 hover:border-blue-100 hover:bg-blue-50/30 ${
                              isImportantField ? 'bg-blue-50/20' : 'bg-white'
                              } metadata-card`}
                            style={{ 
                              animation: `fadeIn 0.5s ease forwards`, 
                              animationDelay: `${index * 0.05}s`,
                              opacity: 0
                            }}
                          >
                            <div className="text-sm font-medium text-blue-600 mb-2 capitalize flex items-center">
                              {key === 'title' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              )}
                              {key === 'authors' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                              )}
                              {key === 'doi' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              )}
                              {key.replace(/_/g, ' ')}
                            </div>
                              <div className="text-gray-800 break-words overflow-x-auto metadata-value">
                              {Array.isArray(value) ? (
                                <div className="flex flex-wrap gap-2">
                                  {value.map((item, i) => (
                                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm inline-flex items-center">
                                      {key === 'authors' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                      )}
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              ) : typeof value === "object" ? (
                                  <pre className="text-sm bg-gray-50 p-3 rounded h-full overflow-y-auto">{JSON.stringify(value, null, 2)}</pre>
                              ) : key === 'doi' ? (
                                <a 
                                  href={value.startsWith('http') ? value : `https://doi.org/${value}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline inline-flex items-center"
                                >
                                  {value}
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </a>
                              ) : key === 'title' ? (
                                <h3 className="font-medium">{value}</h3>
                              ) : key === 'publication_year' ? (
                                  <div className="h-full flex items-start">{value || "Not specified"}</div>
                              ) : (
                                  <div className="h-full flex items-start">{value || "Not specified"}</div>
                              )}
                            </div>
                          </div>
                        );
                        });
                      })()}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 text-center">
                    <button 
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="text-xs bg-white hover:bg-gray-100 text-gray-600 py-1 px-3 rounded-md transition-colors duration-75 border border-gray-200 inline-flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      Back to top
                    </button>
                    {/* Download as Excel button with loading spinner */}
                    <button
                      onClick={async () => {
                        setIsDownloadingExcel(prev => ({ ...prev, [fileName]: true }));
                        try {
                          const file = files.find(f => f.name === fileName);
                          if (!file) return;
                          const formData = new FormData();
                          formData.append("file", file);
                          const res = await fetch("https://scientific-metadata-extractor.onrender.com/api/extract_excel", {
                            method: "POST",
                            body: formData,
                          });
                          if (res.ok) {
                            const blob = await res.blob();
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `extracted_metadata_${file.name.replace(/\.[^/.]+$/, "")}.xlsx`;
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                            window.URL.revokeObjectURL(url);
                          }
                        } finally {
                          setIsDownloadingExcel(prev => ({ ...prev, [fileName]: false }));
                        }
                      }}
                      disabled={isDownloadingExcel[fileName]}
                      className={`ml-2 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 py-1 px-3 rounded-md transition-colors duration-75 border border-blue-200 inline-flex items-center ${isDownloadingExcel[fileName] ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                      {isDownloadingExcel[fileName] ? (
                        <svg className="animate-spin h-4 w-4 mr-1 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4H4zm4 8h8m-4-4v8" />
                        </svg>
                      )}
                      {isDownloadingExcel[fileName] ? 'Preparing...' : 'Download as Excel'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
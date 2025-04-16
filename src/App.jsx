import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';

const App = () => {
  const [components, setComponents] = useState(() => {
    const saved = localStorage.getItem('savedLayout');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [savedTemplates, setSavedTemplates] = useState(() => {
    const saved = localStorage.getItem('savedTemplates');
    return saved ? JSON.parse(saved) : [];
  });

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const handleDrop = (type, props = {}) => {
    const newComponent = {
      id: Date.now(),
      type,
      props,
    };
    setComponents((prev) => [...prev, newComponent]);
  };

  const handleDelete = (id) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

  const handleUpdate = (id, updatedProps) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, props: { ...comp.props, ...updatedProps } } : comp
      )
    );
  };

  const handleClearCanvas = () => {
    setComponents([]);
  };

  const handleSaveTemplate = () => {
    if (templateName.trim() === '') {
      alert('Please provide a template name');
      return;
    }

    const newTemplate = {
      name: templateName,
      components: components,
    };

    // Save the new template to localStorage
    setSavedTemplates((prev) => {
      const updatedTemplates = [...prev, newTemplate];
      localStorage.setItem('savedTemplates', JSON.stringify(updatedTemplates));
      return updatedTemplates;
    });

    // Clear the canvas after saving
    handleClearCanvas();
    setShowSaveModal(false);
    setTemplateName('');
  };

  useEffect(() => {
    localStorage.setItem('savedTemplates', JSON.stringify(savedTemplates));
  }, [savedTemplates]);

  useEffect(() => {
    localStorage.setItem('savedLayout', JSON.stringify(components));
  }, [components]);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <Sidebar onDragStart={(e, item) => {
        const payload = JSON.stringify({ type: item });
        e.dataTransfer.setData('componentType', payload);
      }} savedTemplates={savedTemplates} />

      {/* Canvas */}
      <Canvas
        components={components}
        onDrop={handleDrop}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onClear={handleClearCanvas}
        onSave={handleSaveTemplate}
      />

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Save Template</h3>
            <input
              type="text"
              placeholder="Enter template name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                onClick={() => setShowSaveModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={handleSaveTemplate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

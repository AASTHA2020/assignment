import React, { useState } from 'react';
import DraggableComponents from './DraggableComponents';

const Canvas = ({ components, onDrop, onDelete, onUpdate, onClear, onSave }) => {
  const [showModal, setShowModal] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('componentType');
    if (data) {
      try {
        const { type, props } = JSON.parse(data);
        onDrop(type, props);
      } catch {
        onDrop(data);
      }
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSave = () => {
    setShowModal(true);
  };

  const handleConfirmSave = () => {
    // Save components to localStorage
    const saved = JSON.parse(localStorage.getItem('savedTemplates')) || [];
    const newTemplate = {
      name: templateName || `Template ${saved.length + 1}`,
      type: 'Group',
      props: { components },
    };

    // Save the new template and update localStorage
    localStorage.setItem('savedTemplates', JSON.stringify([...saved, newTemplate]));
    
    // Remove the components from the canvas after saving
    onSave(newTemplate);

    setShowModal(false);
    setTemplateName('');
  };

  const handleCancel = () => {
    onClear(); // Clear canvas
  };

  return (
    <main
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="flex-1 overflow-auto p-10 bg-gradient-to-br from-white to-gray-50"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">🖼️ Canvas</h2>
        <div className="min-h-[500px] bg-white border-2 border-dashed border-gray-300 rounded-2xl p-8 shadow-md transition hover:border-blue-400">
          <div className="relative bg-gray-100 p-4 rounded-lg border border-gray-300">
            {components.length === 0 ? (
              <p className="text-gray-400 text-center pt-24 text-lg">
                Drag components here to build your UI
              </p>
            ) : (
              components.map((component) => (
                <DraggableComponents
                  key={component.id}
                  id={component.id}
                  type={component.type}
                  content={component.content}
                  style={component.style}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              ))
            )}
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showModal && (
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
                onClick={() => {
                  setShowModal(false);
                  setTemplateName('');
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={handleConfirmSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Canvas;

import React, { useEffect, useState } from 'react';

const Sidebar = ({ onDragStart }) => {
  const [savedComponents, setSavedComponents] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedTemplates');
    if (saved) {
      setSavedComponents(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="h-screen w-[280px] bg-gray-800 text-white p-6 flex flex-col justify-between shadow-lg">
      <div>
        <h2 className="text-xl font-semibold mb-6">🧩 Components</h2>
        {/* Default components can still be draggable */}
        {['Input', 'Dropdown', 'Button'].map((item) => (
          <div
            key={item}
            draggable
            onDragStart={(e) => onDragStart(e, item)}
            className="px-4 py-2 mb-3 bg-gray-700 text-sm border border-gray-600 rounded-md cursor-move hover:bg-gray-600 transition"
          >
            {item}
          </div>
        ))}

        {/* Saved components */}
        {savedComponents.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mt-6 mb-3">💾 Saved</h3>
            {savedComponents.map((item, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => onDragStart(e, item.type, item.props)}
                className="px-4 py-2 mb-3 bg-gray-700 text-sm border border-gray-500 rounded-md cursor-move hover:bg-gray-600"
              >
                {item.name || `${item.type} ${index + 1}`}
              </div>
            ))}
          </>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center mt-6">
        Drag → Drop → Customize
      </p>
    </div>
  );
};

export default Sidebar;

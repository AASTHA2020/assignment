import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import RightSidebar from './components/RightSidebar';
import './App.css'

export default function App() {
  const [savedComponents, setSavedComponents] = useState(() => {
    try {
      const saved = localStorage.getItem('savedTemplates');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [components, setComponents] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null); // new

  const handleDragStart = (e, type, props = {}) => {
    e.dataTransfer.setData('componentType', type);
    e.dataTransfer.setData('componentProps', JSON.stringify(props));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('componentType');
    const props = JSON.parse(e.dataTransfer.getData('componentProps'));
    if (type) {
      setComponents((prev) => [...prev, { type, props }]);
    }
  };

  const handleComponentClick = (index) => {
    setSelectedIndex(index);
  };

  const handleUpdateProps = (updatedProps) => {
    const updated = [...components];
    updated[selectedIndex].props = { ...updated[selectedIndex].props, ...updatedProps };
    setComponents(updated);
  };

  return (
    <div className="flex h-screen ">
     <Sidebar
  onDragStart={handleDragStart}
  savedComponents={savedComponents}
  setSavedComponents={setSavedComponents}
/>

      <DndContext>
        <Canvas components={components} onDrop={handleDrop} onComponentClick={handleComponentClick} setComponents={setComponents}/>
      </DndContext>
      <RightSidebar
        component={components[selectedIndex]}
        onChange={handleUpdateProps}
      />
    </div>
  );
}

import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Make sure to install react-icons
import '../App.css';

export default function Sidebar({ onDragStart, savedComponents, setSavedComponents }) {
    const handleSaveComponent = () => {
        const name = prompt('Enter name for the saved component:');
        if (name) {
            const newComponent = { type: 'Button', props: { label: name }, name };
            const updated = [...(savedComponents || []), newComponent];
            localStorage.setItem('savedTemplates', JSON.stringify(updated));
            setSavedComponents(updated);
        }
    };

    const handleDeleteSaved = (index) => {
        const updated = [...savedComponents];
        updated.splice(index, 1);
        localStorage.setItem('savedTemplates', JSON.stringify(updated));
        setSavedComponents(updated);
    };

    const handleEditSaved = (index) => {
        const newName = prompt('Edit component name:', savedComponents[index].name || '');
        if (newName) {
            const updated = [...savedComponents];
            updated[index].name = newName;
            if (updated[index].type === 'Button') {
                updated[index].props.label = newName;
            }
            localStorage.setItem('savedTemplates', JSON.stringify(updated));
            setSavedComponents(updated);
        }
    };

    return (
        <div className="h-full w-72 sm:w-64 md:w-56 lg:w-72 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 text-white shadow-lg">
            <h2 className="text-xl font-semibold mb-6">🧩 Components</h2>

            {['Input', 'Dropdown', 'Button', 'Avatar'].map((item) => (
                <div
                    key={item}
                    draggable
                    onDragStart={(e) => onDragStart(e, item)}
                    className="flex items-center justify-between p-2 mb-3 bg-gray-700 rounded-lg cursor-move hover:bg-gray-600"
                >
                    {item}
                </div>
            ))}

            {Array.isArray(savedComponents) && savedComponents.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold mt-6 mb-3">💾 Saved</h3>
                    {savedComponents.map((item, index) => (
                        <div
                            key={index}
                            draggable
                            onDragStart={(e) => onDragStart(e, item.type, item.props)}
                            className="flex items-center justify-between px-3 py-2 mb-2 bg-gray-700 text-sm border border-gray-500 rounded-md cursor-move hover:bg-gray-600 transition"
                        >
                            <span className="truncate">{item.name || `${item.type} ${index + 1}`}</span>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleEditSaved(index)} className="text-yellow-400 hover:text-yellow-300">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDeleteSaved(index)} className="text-red-400 hover:text-red-300">
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            )}

            <button
                onClick={handleSaveComponent}
                className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
                ➕ Save Sample Button
            </button>
        </div>
    );
}

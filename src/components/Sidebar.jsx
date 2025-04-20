import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Icons for edit and delete actions
import '../App.css';

export default function Sidebar({ onDragStart, savedComponents, setSavedComponents }) {
    // Save a new component to the savedComponents list
    const handleSaveComponent = () => {
        const name = prompt('Enter name for the saved component:');
        if (name) {
            const newComponent = { type: 'Button', props: { label: name }, name };
            const updated = [...(savedComponents || []), newComponent];
            localStorage.setItem('savedTemplates', JSON.stringify(updated)); // Persist to localStorage
            setSavedComponents(updated); // Update state
        }
    };

    // Delete a saved component by index
    const handleDeleteSaved = (index) => {
        const updated = savedComponents.filter((_, i) => i !== index); // Remove the selected component
        localStorage.setItem('savedTemplates', JSON.stringify(updated)); // Persist changes
        setSavedComponents(updated); // Update state
    };

    // Edit the name of a saved component
    const handleEditSaved = (index) => {
        const newName = prompt('Edit component name:', savedComponents[index]?.name || '');
        if (newName) {
            const updated = [...savedComponents];
            updated[index] = {
                ...updated[index],
                name: newName,
                props: { ...updated[index].props, label: newName }, // Update label if it's a Button
            };
            localStorage.setItem('savedTemplates', JSON.stringify(updated)); // Persist changes
            setSavedComponents(updated); // Update state
        }
    };

    return (
        <div className="h-full w-72 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 text-white shadow-lg">
            {/* Sidebar Header */}
            <h2 className="text-xl font-semibold mb-6">🧩 Components</h2>

            {/* Draggable Default Components */}
            {['Input', 'Dropdown', 'Button', 'Avatar'].map((item) => (
                <div
                    key={item}
                    draggable
                    onDragStart={(e) => onDragStart(e, item)} // Pass type on drag start
                    className="flex items-center justify-between p-2 mb-3 bg-gray-700 rounded-lg cursor-move hover:bg-gray-600"
                >
                    {item}
                </div>
            ))}

            {/* Saved Components Section */}
            {Array.isArray(savedComponents) && savedComponents.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold mt-6 mb-3">💾 Saved</h3>
                    {savedComponents.map((item, index) => (
                        <div
                            key={index}
                            draggable
                            onDragStart={(e) => onDragStart(e, item.type, item.props)} // Pass type and props on drag start
                            className="flex items-center justify-between px-3 py-2 mb-2 bg-gray-700 text-sm border border-gray-500 rounded-md cursor-move hover:bg-gray-600 transition"
                        >
                            {/* Display component name */}
                            <span className="truncate">{item.name || `${item.type} ${index + 1}`}</span>
                            <div className="flex items-center gap-2">
                                {/* Edit Button */}
                                <button onClick={() => handleEditSaved(index)} className="text-yellow-400 hover:text-yellow-300">
                                    <FaEdit />
                                </button>
                                {/* Delete Button */}
                                <button onClick={() => handleDeleteSaved(index)} className="text-red-400 hover:text-red-300">
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            )}

            {/* Save New Component Button */}
            <button
                onClick={handleSaveComponent}
                className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
                ➕ Save Sample Button
            </button>
        </div>
    );
}

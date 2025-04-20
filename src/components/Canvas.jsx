import React, { useState, useEffect } from 'react';
import DroppedComponent from './DroppedComponent';
import { Rnd } from 'react-rnd';
import '../App.css';

// Canvas component to manage a draggable and resizable area for components
export default function Canvas({ components, onDrop, onComponentClick, setComponents }) {
    const [text, setText] = useState(''); // State to manage text input

    // Load saved text and components from localStorage on component mount
    useEffect(() => {
        const savedText = localStorage.getItem('canvasText');
        const savedComponents = localStorage.getItem('canvasComponents');

        if (savedText) setText(savedText); // Restore saved text
        if (savedComponents) {
            setComponents((prev) => [...prev, ...JSON.parse(savedComponents)]); // Restore saved components
        }
    }, [setComponents]);

    // Save text and components to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('canvasText', text);
        localStorage.setItem('canvasComponents', JSON.stringify(components));
    }, [text, components]);

    // Clear the canvas and remove saved data from localStorage
    const handleClear = () => {
        setText(''); // Clear text
        setComponents([]); // Clear components
        localStorage.removeItem('canvasText'); // Remove text from localStorage
        localStorage.removeItem('canvasComponents'); // Remove components from localStorage
    };

    // Update a specific component's properties
    const updateComponent = (index, updates) => {
        setComponents((prev) =>
            prev.map((comp, i) => (i === index ? { ...comp, ...updates } : comp)) // Update only the targeted component
        );
    };

    // Adjust component positions when the window is resized to ensure they stay within bounds
    useEffect(() => {
        const handleResize = () => {
            setComponents((prev) =>
                prev.map((comp) => ({
                    ...comp,
                    x: Math.min(comp.x, window.innerWidth - parseInt(comp.width || '150px', 10)), // Ensure x is within bounds
                    y: Math.min(comp.y, window.innerHeight - parseInt(comp.height || '40px', 10)), // Ensure y is within bounds
                }))
            );
        };

        window.addEventListener('resize', handleResize); // Add resize event listener
        return () => window.removeEventListener('resize', handleResize); // Cleanup event listener on unmount
    }, [setComponents]);

    return (
        <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50 dark:bg-gray-50 transition-all duration-300">
            {/* Drop area for components */}
            <div
                onDrop={onDrop} // Handle drop event
                onDragOver={(e) => e.preventDefault()} // Allow drag over
                id="canvas"
                className="relative w-full min-h-[80vh] border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 bg-white shadow-md transition-all duration-300"
            >
                {/* Header with title and clear button */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-700">Drop Components Below</h2>
                    <button
                        onClick={handleClear} // Clear canvas on button click
                        className="px-4 py-2 text-sm md:text-base bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition"
                    >
                        Clear
                    </button>
                </div>

                {/* Render each component as a draggable and resizable element */}
                {components.map((component, index) => (
                    <Rnd
                        key={index} // Unique key for each component
                        size={{ width: component.width || '150px', height: component.height || '40px' }} // Set initial size
                        position={{ x: component.x || 0, y: component.y || 0 }} // Set initial position
                        onDragStop={(e, data) => updateComponent(index, { x: data.x, y: data.y })} // Update position on drag stop
                        onResizeStop={(e, direction, ref, delta, position) =>
                            updateComponent(index, {
                                width: ref.offsetWidth + 'px', // Update width
                                height: ref.offsetHeight + 'px', // Update height
                                x: position.x, // Update x position
                                y: position.y, // Update y position
                            })
                        }
                        bounds="parent" // Restrict movement within parent container
                        enableResizing={{
                            top: true,
                            right: true,
                            bottom: true,
                            left: true,
                            topRight: true,
                            bottomRight: true,
                            bottomLeft: true,
                            topLeft: true,
                        }} // Enable resizing from all sides
                        className="rounded shadow-lg border border-gray-300 bg-white hover:ring-2 ring-blue-400 focus-within:ring-2 transition-all duration-200"
                    >
                        {/* Component content */}
                        <div
                            onClick={() => onComponentClick(index)} // Handle component click
                            className="w-full h-full flex items-center justify-center cursor-pointer"
                        >
                            <DroppedComponent
                                type={component.type} // Render the dropped component based on its type
                                props={{
                                    ...component.props, // Pass component-specific props
                                    width: component.width, // Pass width
                                    height: component.height, // Pass height
                                }}
                            />
                        </div>
                    </Rnd>
                ))}
            </div>
        </div>
    );
}

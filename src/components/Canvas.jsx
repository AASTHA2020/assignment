import React, { useState, useEffect } from 'react';
import DroppedComponent from './DroppedComponent';
import { Rnd } from 'react-rnd';
import '../App.css';

export default function Canvas({ components, onDrop, onComponentClick, setComponents }) {
    const [text, setText] = useState('');

    useEffect(() => {
        const savedText = localStorage.getItem('canvasText');
        const savedComponents = localStorage.getItem('canvasComponents');

        if (savedText) setText(savedText);
        if (savedComponents) {
            const parsedComponents = JSON.parse(savedComponents);
            setComponents((prevComponents) => [...prevComponents, ...parsedComponents]);
        }
    }, [setComponents]);

    useEffect(() => {
        localStorage.setItem('canvasText', text);
        localStorage.setItem('canvasComponents', JSON.stringify(components));
    }, [text, components]);

    const handleClear = () => {
        setText('');
        setComponents([]);
        localStorage.removeItem('canvasText');
        localStorage.removeItem('canvasComponents');
    };

    const handleDragStop = (index, e, data) => {
        const updatedComponents = [...components];
        updatedComponents[index] = {
            ...updatedComponents[index],
            x: data.x,
            y: data.y,
        };
        setComponents(updatedComponents);
    };

    const handleResizeStop = (index, e, direction, ref, delta, position) => {
        const updatedComponents = [...components];
        updatedComponents[index] = {
            ...updatedComponents[index],
            width: ref.offsetWidth + 'px',
            height: ref.offsetHeight + 'px',
            x: position.x,
            y: position.y,
        };
        setComponents(updatedComponents);
    };

    useEffect(() => {
        const handleResize = () => {
            setComponents((prevComponents) =>
                prevComponents.map((component) => ({
                    ...component,
                    x: Math.min(component.x, window.innerWidth - parseInt(component.width || '150px', 10)),
                    y: Math.min(component.y, window.innerHeight - parseInt(component.height || '40px', 10)),
                }))
            );
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setComponents]);

    return (
        <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50 dark:bg-gray-50 transition-all duration-300">
            <div
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
                id="canvas"
                className="relative w-full min-h-[80vh] border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 bg-white shadow-md transition-all duration-300"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-700">Drop Components Below</h2>
                    <button
                        onClick={handleClear}
                        className="px-4 py-2 text-sm md:text-base bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition"
                    >
                        Clear
                    </button>
                </div>

                {components.map((component, index) => (
                    <Rnd
                        key={index}
                        size={{
                            width: component.width || '150px',
                            height: component.height || '40px',
                        }}
                        position={{
                            x: component.x || 0,
                            y: component.y || 0,
                        }}
                        onDragStop={(e, data) => handleDragStop(index, e, data)}
                        onResizeStop={(e, direction, ref, delta, position) =>
                            handleResizeStop(index, e, direction, ref, delta, position)
                        }
                        bounds="parent"
                        enableResizing={{
                            top: true,
                            right: true,
                            bottom: true,
                            left: true,
                            topRight: true,
                            bottomRight: true,
                            bottomLeft: true,
                            topLeft: true,
                        }}
                        className="rounded shadow-lg border border-gray-300 bg-white hover:ring-2 ring-blue-400 focus-within:ring-2 transition-all duration-200"
                    >
                        <div
                            onClick={() => onComponentClick(index)}
                            className="w-full h-full flex items-center justify-center cursor-pointer"
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <DroppedComponent
                                type={component.type}
                                props={{
                                    ...component.props,
                                    width: component.width,
                                    height: component.height,
                                }}
                            />
                        </div>
                    </Rnd>
                ))}
            </div>
        </div>
    );
}

import React, { useState, useRef, useEffect } from 'react';

const DraggableComponents = ({ type, id, onDelete, onUpdate }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(type === 'Button' ? 'Click Me' : '');
    const [placeholder, setPlaceholder] = useState('Enter text');
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(60);
    const [fontSize, setFontSize] = useState(16);
    const [textColor, setTextColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');

    const boxRef = useRef(null);
    const isResizing = useRef(false);

    // Resize functionality
    const handleMouseDown = (e) => {
        isResizing.current = true;
        e.stopPropagation();
    };

    const handleMouseMove = (e) => {
        if (isResizing.current) {
            setWidth(e.clientX - boxRef.current.getBoundingClientRect().left);
            setHeight(e.clientY - boxRef.current.getBoundingClientRect().top);
        }
    };

    const handleMouseUp = () => {
        isResizing.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const handleSave = () => {
        setIsEditing(false);
        onUpdate(id, { text, placeholder, fontSize, textColor, backgroundColor });
    };

    const renderComponent = () => {
        switch (type) {
            case 'Input':
                return (
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-full p-2 border border-gray-300 rounded outline-none"
                        style={{ fontSize: `${fontSize}px`, color: textColor, backgroundColor }}
                    />
                );
            case 'Dropdown':
                return (
                    <select
                        className="w-full h-full p-2 border border-gray-300 rounded outline-none"
                        style={{ fontSize: `${fontSize}px`, color: textColor, backgroundColor }}
                    >
                        <option>{text || 'Select option'}</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                    </select>
                );
            case 'Button':
                return (
                    <button
                        className="w-full h-full bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        style={{ fontSize: `${fontSize}px`, color: textColor, backgroundColor }}
                    >
                        {text}
                    </button>
                );
            default:
                return null;
        }
    };

    return (
        <div
            ref={boxRef}
            className="relative mb-6 border border-gray-200 rounded-lg bg-white group p-2 shadow-sm"
            style={{ width: `${width}px`, height: `${height}px` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                <div className="absolute top-2 right-2 flex gap-2 z-10">
                    <button
                        className="text-xs bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                        onClick={() => setIsEditing(true)}
                    >
                        ✏️
                    </button>
                    <button
                        className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={() => onDelete(id)}
                    >
                        ❌
                    </button>
                </div>
            )}

            <div className="w-full h-full">{renderComponent()}</div>

            {/* Resizer Handle */}
            <div
                onMouseDown={handleMouseDown}
                className="absolute bottom-1 right-1 w-4 h-4 bg-gray-300 cursor-se-resize rounded-sm"
            />

            {/* Modal for Editing */}
            {isEditing && (
    <div
        className="fixed bg-black bg-opacity-50 flex items-center z-50"
        style={{
            top: boxRef.current?.getBoundingClientRect().top || 0,
            left: (boxRef.current?.getBoundingClientRect().right || 0) + 10, // Position to the right with some spacing
            position: 'absolute',
        }}
    >
        <div className="bg-white p-6 rounded shadow-lg w-96 h-full overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Edit Component</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Text</label>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Font Size</label>
                <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Text Color</label>
                <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Background Color</label>
                <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="flex justify-end gap-2">
                <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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

export default DraggableComponents;

import React from 'react';
import '../App.css';

export default function RightSidebar({ component, onChange, onSave }) {
    if (!component) return (
        <div className="w-72 bg-gray-50 dark:bg-gray-800 p-6 border-l border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 shadow-lg">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 italic">
                Select a component to edit
            </p>
        </div>
    );

    const { type, props } = component;

    const resetStyles = () => {
        onChange({
            backgroundColor: '#ffffff',
            color: '#000000',
            fontSize: '16px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            width: '200px',
            height: '200px',
            label: '',
            placeholder: '',
            options: type === 'Dropdown' ? ['Option 1', 'Option 2'] : undefined,
            image: type === 'Avatar' ? '' : undefined,
        });
    };

    return (
        <div className="w-72 bg-white dark:bg-gray-800 p-6 border-l border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-center border-b pb-2">
                Edit {type}
            </h3>

            <div className="space-y-4">
                {/* Background Color */}
                <label className="block text-sm font-medium">
                    Background Color
                    <input
                        type="color"
                        value={props.backgroundColor || '#ffffff'}
                        onChange={(e) => onChange({ backgroundColor: e.target.value })}
                        className="w-full mt-1 border rounded px-2 py-1 hover:shadow focus:ring focus:ring-blue-300"
                    />
                </label>

                {/* Text Color */}
                <label className="block text-sm font-medium">
                    Text Color
                    <input
                        type="color"
                        value={props.color || '#000000'}
                        onChange={(e) => onChange({ color: e.target.value })}
                        className="w-full mt-1 border rounded px-2 py-1 hover:shadow focus:ring focus:ring-blue-300"
                    />
                </label>

                {/* Font Size */}
                <label className="block text-sm font-medium">
                    Font Size (px)
                    <input
                        type="number"
                        value={props.fontSize?.replace('px', '') || 16}
                        onChange={(e) => onChange({ fontSize: `${e.target.value}px` })}
                        className="w-full mt-1 border rounded px-2 py-1 hover:shadow focus:ring focus:ring-blue-300"
                    />
                </label>

                {/* Font Style */}
                <div className="block text-sm font-medium">
                    Font Style
                    <div className="flex items-center space-x-4 mt-1">
                        <label className="flex items-center space-x-1">
                            <input
                                type="checkbox"
                                checked={props.fontWeight === 'bold'}
                                onChange={(e) =>
                                    onChange({ fontWeight: e.target.checked ? 'bold' : 'normal' })
                                }
                                className="rounded focus:ring focus:ring-blue-300"
                            />
                            <span>Bold</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input
                                type="checkbox"
                                checked={props.fontStyle === 'italic'}
                                onChange={(e) =>
                                    onChange({ fontStyle: e.target.checked ? 'italic' : 'normal' })
                                }
                                className="rounded focus:ring focus:ring-blue-300"
                            />
                            <span>Italic</span>
                        </label>
                    </div>
                </div>

                {/* Width */}
                <label className="block text-sm font-medium">
                    Width (px)
                    <input
                        type="number"
                        value={props.width?.replace('px', '') }
                        onChange={(e) => onChange({ width: `${e.target.value}px`  })}
                        className="w-full mt-1 border rounded px-2 py-1 hover:shadow focus:ring focus:ring-blue-300"
                    />
                </label>

                {/* Height */}
                <label className="block text-sm font-medium">
                    Height (px)
                    <input
                        type="number"
                        value={props.height?.replace('px', '') ||''}
                        onChange={(e) => onChange({ height: `${e.target.value}px` })}
                        className="w-full mt-1 border rounded px-2 py-1 hover:shadow focus:ring focus:ring-blue-300"
                    />
                </label>

                {/* Label / Placeholder */}
                <label className="block text-sm font-medium">
                    Text / Placeholder
                    <input
                        type="text"
                        value={props.label || props.placeholder || ''}
                        onChange={(e) =>
                            onChange({ label: e.target.value, placeholder: e.target.value })
                        }
                        className="w-full mt-1 border rounded px-2 py-1 hover:shadow focus:ring focus:ring-blue-300"
                    />
                </label>

                {/* Editable Dropdown Options */}
                {type === 'Dropdown' && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Dropdown Options</label>

                        {(props.options || []).map((opt, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => {
                                        const newOptions = [...props.options];
                                        newOptions[idx] = e.target.value;
                                        onChange({ options: newOptions });
                                    }}
                                    className="flex-1 border px-2 py-1 rounded"
                                />
                                <button
                                    onClick={() => {
                                        const newOptions = props.options.filter((_, i) => i !== idx);
                                        onChange({ options: newOptions });
                                    }}
                                    className="text-red-500"
                                >
                                    ❌
                                </button>
                            </div>
                        ))}

                        <button
                            onClick={() => {
                                const newOptions = [...(props.options || []), `Option ${props.options?.length + 1 || 1}`];
                                onChange({ options: newOptions });
                            }}
                            className="text-blue-500 hover:underline text-sm mt-1"
                        >
                            ➕ Add Option
                        </button>
                    </div>
                )}

                {/* Avatar Upload */}
                {type === 'Avatar' && (
                    <label className="block text-sm font-medium">
                        Upload Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    onChange({ image: reader.result });
                                };
                                if (file) {
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="mt-1"
                        />
                    </label>
                )}

                {/* Reset Button */}
                <button
                    onClick={resetStyles}
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 focus:ring focus:ring-red-300"
                >
                    Reset to Default
                </button>

                {/* Save Button */}
                <button
                    onClick={() => onSave(props)}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:ring focus:ring-blue-300"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}

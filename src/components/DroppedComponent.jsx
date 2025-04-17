import React from 'react';
import '../App.css';

export default function DroppedComponent({ type, props }) {
    const commonStyle = {
        backgroundColor: props.backgroundColor,
        color: props.color,
        fontSize: props.fontSize,
        resize: 'both', // Allow resizing in both directions
        overflow: 'auto', // Handle overflow when resized
    };

    switch (type) {
        case 'Input':
            return (
              <input
                {...props}
                placeholder={props.placeholder || 'Enter text'}
                style={{
                  ...commonStyle,
                  width: props.width || '100px',
                  height: props.height || '100px',
                }}
                className="p-2 border rounded"
              />
            );
          
            case 'Dropdown':
                return (
                  <select
                    {...props}
                    style={{
                      ...commonStyle,
                      width: props.width || '100px',
                      height: props.height || '40px',
                    }}
                    className="p-2 border rounded"
                  >
                    {(props.options || ['Option 1', 'Option 2']).map((opt, i) => (
                      <option key={i}>{opt}</option>
                    ))}
                  </select>
                );
                case 'Avatar':
                    return (
                      <div style={{ ...commonStyle, width: props.width || '100px', height: props.height || '100px' }}>
                        <img
                          src={props.image || 'https://via.placeholder.com/100'}
                          alt="Avatar"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                        />
                      </div>
                    );
                  
        case 'Button':
            return (
                <button
                    {...props}
                    style={commonStyle}
                    className="px-4 py-2 rounded hover:opacity-90"
                >
                    {props.label || 'Click Me'}
                </button>
            );
        default:
            return null;
    }
}

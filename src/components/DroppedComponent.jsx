import React from 'react';
import '../App.css';

// DroppedComponent renders different UI elements based on the 'type' prop
export default function DroppedComponent({ type, props }) {
  // Common styles applied to all components
  const commonStyle = {
    backgroundColor: props.backgroundColor,
    color: props.color,
    fontSize: props.fontSize,
    resize: 'both', // Allows resizing
    overflow: 'auto', // Ensures content is scrollable if it overflows
  };

  // Render components based on the 'type' prop
  switch (type) {
    case 'Input':
      return (
        <input
          {...props} // Spread additional props
          placeholder={props.placeholder || 'Enter text'} // Default placeholder
          style={{
            ...commonStyle,
            width: props.width || '100px', // Default width
            height: props.height || '100px', // Default height
          }}
          className="border rounded" // CSS classes for styling
        />
      );

    case 'Dropdown':
      return (
        <select
          {...props} // Spread additional props
          style={{
            ...commonStyle,
            width: props.width || '100px', // Default width
            height: props.height || '40px', // Default height
          }}
          className="p-2 border rounded" // CSS classes for styling
        >
          {/* Render dropdown options, defaulting to 'Option 1' and 'Option 2' */}
          {(props.options || ['Option 1', 'Option 2']).map((opt, i) => (
            <option key={i}>{opt}</option>
          ))}
        </select>
      );

    case 'Avatar':
      return (
        <div
          style={{
            ...commonStyle,
            width: props.width || '100px', // Default width
            height: props.height || '100px', // Default height
          }}
        >
          {/* Render an image with a circular shape */}
          <img
            src={props.image || 'https://via.placeholder.com/100'} // Default image
            alt="Avatar"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensures the image covers the container
              borderRadius: '50%', // Makes the image circular
            }}
          />
        </div>
      );

    case 'Button':
      return (
        <button
          {...props} // Spread additional props
          style={commonStyle}
          className="px-4 py-2 rounded hover:opacity-90" // CSS classes for styling
        >
          {props.label || 'Click Me'} {/* Default button label */}
        </button>
      );

    default:
      return null; // Return nothing if 'type' is not recognized
  }
}

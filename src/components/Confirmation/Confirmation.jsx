import React from 'react';

const Confirmation = ({ message, onCancel, onConfirm }) => {
  return (
    <div>
      <h2>{message}</h2>
      <div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default Confirmation;

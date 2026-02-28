'use client';
import Alert from 'react-bootstrap/Alert';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

export default function AlertMessage({ show, onClose, variant = "success", message, duration = 3000 }) {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [show]);

  if (!show || !mounted) return null;

  return ReactDOM.createPortal(
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      zIndex: 9999,
      minWidth: "300px"
    }}>
      <Alert variant={variant} onClose={onClose} dismissible>
        {message}
      </Alert>
    </div>,
    document.body
  );
}
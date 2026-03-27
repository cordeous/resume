import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Toast.css';

let toastQueue = [];
let toastListeners = [];

export const showToast = (message, type = 'success', duration = 3000) => {
  const id = Date.now() + Math.random();
  const toast = { id, message, type, duration };
  toastQueue = [...toastQueue, toast];
  toastListeners.forEach(fn => fn([...toastQueue]));
};

const Toast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const listener = (queue) => setToasts(queue);
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter(fn => fn !== listener);
    };
  }, []);

  const dismiss = (id) => {
    toastQueue = toastQueue.filter(t => t.id !== id);
    toastListeners.forEach(fn => fn([...toastQueue]));
  };

  useEffect(() => {
    toasts.forEach(toast => {
      const timer = setTimeout(() => dismiss(toast.id), toast.duration);
      return () => clearTimeout(timer);
    });
  }, [toasts]);

  return (
    <div className="toast-container" role="region" aria-live="polite" aria-label="Notifications">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            className={`toast toast--${toast.type}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="status"
          >
            <span className="toast-message">{toast.message}</span>
            <button
              className="toast-close"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;

import React, { useState, useEffect } from "react";
import { IconCheckCircle, IconClose } from "./Icons";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <IconCheckCircle />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-100";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 flex items-center p-4 mb-4 text-gray-500 rounded-lg shadow ${getBackgroundColor()}`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
        {getIcon()}
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        onClick={() => {
          setIsVisible(false);
          onClose();
        }}
      >
        <span className="sr-only">Close</span>
        <IconClose />
      </button>
    </div>
  );
};

export default Toast;

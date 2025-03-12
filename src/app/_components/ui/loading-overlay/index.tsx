import React from "react";

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message = "Processing, please wait..." 
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
      <div className="h-12 w-12 rounded-full border-4 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent animate-spin"></div>
      <p className="mt-4 text-white font-medium">{message}</p>
    </div>
  );
};

export default LoadingOverlay;

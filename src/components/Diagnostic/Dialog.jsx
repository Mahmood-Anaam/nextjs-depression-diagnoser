"use client";


export default function Dialog({ diagnosis, message, onClose, onConsult }) {
  const isNotDepressed = diagnosis === "Not Depressed";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden w-full max-w-lg">
        {/* Header with Background */}
        <div className="bg-blue-950 dark:bg-blue-950 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">{diagnosis}</h2>
            <button onClick={onClose} aria-label="Close">
              <svg
                className="w-6 h-6 text-white hover:text-gray-200 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300">{message}</p>
        </div>
        {/* Footer with Buttons */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 flex justify-end space-x-4">
          {isNotDepressed ? (
            <button
              className="px-4 py-2 rounded-lg bg-blue-950 text-white font-medium  hover:bg-blue-900 transition"
              onClick={onClose}
            >
              Close
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded-lg bg-blue-950 text-white font-medium hover:bg-blue-900 transition"
              onClick={onConsult}
            >
              Get Your Consultation Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


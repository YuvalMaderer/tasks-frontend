import { Link } from "react-router-dom";

function TaskDetailPage({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
        onClick={(e) => e.stopPropagation()} // Prevents onClose when clicking inside the modal
      >
        <div className="p-4">
          <button
            onClick={onClose}
            className="float-right text-gray-700 hover:text-gray-900"
          >
            <Link to="/tasks">X</Link>
          </button>
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailPage;

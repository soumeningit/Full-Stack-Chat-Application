import React from 'react';

const LogoutModal = ({ showModal, onClose, onLogout }) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            <div className="relative bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 shadow-lg z-30 w-80">
                <h2 className="text-2xl font-bold text-white mb-4">Logout</h2>
                <p className="text-white mb-6">Are you sure you want to logout?</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;

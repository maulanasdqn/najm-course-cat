import React from 'react';
import toast from 'react-hot-toast';

interface DeleteConfirmationProps {
    onConfirm: () => void;
    toastId: string;
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onConfirm, toastId }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-gray-800 mb-4">Apakah Anda yakin ingin menghapus pengguna ini?</p>
            <div className="flex justify-end space-x-2">
                <button
                    onClick={() => toast.dismiss(toastId)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                    Batal
                </button>
                <button
                    onClick={() => {
                        onConfirm();
                        toast.dismiss(toastId);
                    }}
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Hapus
                </button>
            </div>
        </div>
    );
};
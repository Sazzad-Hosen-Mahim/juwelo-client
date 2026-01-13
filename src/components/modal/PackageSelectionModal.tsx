import React, { useState } from "react";
import { X } from "lucide-react";

interface PackageSelectionModalProps {
    open: boolean;
    onClose: () => void;
    availableSlots: number[];
    onSelectPackage: (amount: number) => void;
    isLoading?: boolean;
}

const PackageSelectionModal: React.FC<PackageSelectionModalProps> = ({
    open,
    onClose,
    availableSlots,
    onSelectPackage,
    isLoading = false,
}) => {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

    if (!open) return null;

    const handleConfirm = () => {
        if (selectedAmount !== null) {
            onSelectPackage(selectedAmount);
        }
    };

    const formatAmount = (amount: number) => {
        return amount.toLocaleString();
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Select Package
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    <p className="text-sm text-gray-600 mb-4">
                        Choose a package to start your orders
                    </p>

                    {/* Package Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {availableSlots.map((amount) => (
                            <button
                                key={amount}
                                onClick={() => setSelectedAmount(amount)}
                                className={`
                  py-4 px-3 rounded-lg font-medium text-center transition-all
                  ${selectedAmount === amount
                                        ? "bg-gray-900 text-white border-2 border-gray-900"
                                        : "bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-400"
                                    }
                `}
                            >
                                <div className="text-lg font-bold">৳{formatAmount(amount)}</div>
                            </button>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-4 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={selectedAmount === null || isLoading}
                            className={`
                flex-1 py-3 px-4 rounded-lg font-medium transition-colors
                ${selectedAmount === null || isLoading
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-gray-900 text-white hover:bg-gray-800"
                                }
              `}
                        >
                            {isLoading ? "Processing..." : "Confirm"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageSelectionModal;
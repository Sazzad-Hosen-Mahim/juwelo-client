import React from "react";
import { X } from "lucide-react";

interface AccountDetails {
    name: string;
    userId: number;
    quantityOfOrders: number;
    userBalance: number;
    memberTotalRecharge: number;
    userType: string;
}

interface AccountDetailsModalProps {
    open: boolean;
    onClose: () => void;
    data: AccountDetails;
}

const AccountDetailsModal: React.FC<AccountDetailsModalProps> = ({
    open,
    onClose,
    data,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b">
                    <h2 className="text-lg font-semibold">Account Details</h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                    {/* Full width fields */}
                    <div className="space-y-2">
                        <div>
                            <p className="text-xs text-gray-500">Name</p>
                            <p className="font-medium">{data.name}</p>
                        </div>


                    </div>

                    {/* Two column layout */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                            <p className="text-xs text-gray-500">Orders Quantity</p>
                            <p className="font-medium">{data.quantityOfOrders}</p>
                        </div>



                        <div>
                            <p className="text-xs text-gray-500">Balance</p>
                            <p className="font-medium">{data.userBalance}</p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">Total Recharge</p>
                            <p className="font-medium">{data.memberTotalRecharge}</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t">
                    <button
                        onClick={onClose}
                        className="w-full py-2 bg-black text-white rounded hover:bg-gray-900"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountDetailsModal;

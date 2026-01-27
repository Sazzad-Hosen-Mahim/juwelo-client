import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
// import { X } from "lucide-react";

interface ConfirmWithdrawPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (password: string) => void;
}

const ConfirmWithdrawPasswordModal = ({
    isOpen,
    onClose,
    onConfirm,
}: ConfirmWithdrawPasswordModalProps) => {
    const [password, setPassword] = useState("");

    // Reset password when modal closes
    useEffect(() => {
        if (!isOpen) {
            setPassword("");
        }
    }, [isOpen]);

    const handleConfirm = () => {
        if (!password) {
            toast.error("Please enter your withdrawal password");
            return;
        }

        onConfirm(password);
        onClose();
        setPassword("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-4 ">
                    <h2 className="text-lg font-semibold text-center w-full">Confirm Withdrawal Password</h2>
                    {/* <button onClick={onClose} className="p-1 rounded-full cursor-ponter hover:bg-slate-100">
                        <X className="w-5 h-5 text-slate-500" />
                    </button> */}
                </div>

                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="password"
                            placeholder="Enter withdrawal password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="w-full sm:w-auto cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            className="bg-black text-white cursor-pointer hover:bg-gray-800 w-full sm:w-auto"
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmWithdrawPasswordModal;

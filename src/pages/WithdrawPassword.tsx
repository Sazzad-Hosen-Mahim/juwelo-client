import { useUpdateWithdrawPasswordMutation } from "@/store/api/user/userApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const WithdrawPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const id = localStorage.getItem("userId");
    const userId = id ? parseInt(id) : 0;

    const [updateWithdrawPassword, { isLoading }] = useUpdateWithdrawPasswordMutation();

    const handleSubmit = async () => {
        if (!password || !confirmPassword) {
            toast.error("Please fill in both fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            await updateWithdrawPassword({ userId, withdrawPassword: password }).unwrap();
            toast.success("Withdraw password set successfully");
            navigate("/cash-out");
        } catch (err: any) {
            console.error(err);
            toast.error(err?.data?.message || "Failed to set withdraw password");
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-8 h-screen bg-white">
            <h1 className="text-xl font-bold text-center mb-8">Set E-Wallet Password</h1>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-black text-white py-3.5 rounded-lg font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8 cursor-pointer"
                >
                    {isLoading ? "Setting Password..." : "Confirm"}
                </button>
            </div>
        </div>
    );
};

export default WithdrawPassword;
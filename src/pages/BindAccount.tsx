import { useBindAccountMutation } from "@/store/api/withdraw/withdrawApi";
import { useState } from "react";
import { toast } from "sonner";

const BindAccount = () => {
    const [bankName, setBankName] = useState("");
    const [withdrawalAddress, setWithdrawalAddress] = useState("");

    const id = localStorage.getItem("userId");
    const userId = id ? id : "";

    const [bindAccount, { isLoading, isError }] =
        useBindAccountMutation();

    const handleSubmit = async () => {
        if (!bankName || !withdrawalAddress) return;

        try {
            await bindAccount({
                userId,
                BankName: bankName,
                withdrawalAddress,
            }).unwrap();

            toast("Account bound successfully");
        } catch (err) {
            console.error("Bind account failed", err);
        }
    };

    return (
        <div className="max-w-md space-y-4 h-screen py-12 mx-auto">
            <input
                type="text"
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full border px-3 py-2 rounded"
            />

            <input
                type="text"
                placeholder="Withdrawal Address"
                value={withdrawalAddress}
                onChange={(e) => setWithdrawalAddress(e.target.value)}
                className="w-full border px-3 py-2 rounded"
            />

            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-black text-white py-2 rounded cursor-pointer"
            >
                {isLoading ? "Binding..." : "Bind Account"}
            </button>

            {isError && (
                <p className="text-red-500 text-sm">
                    Failed to bind account. Try again.
                </p>
            )}
        </div>
    );
};

export default BindAccount;

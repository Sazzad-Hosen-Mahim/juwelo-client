import { useGetSingleUserQuery } from "@/store/api/user/userApi";
import { useBindAccountMutation } from "@/store/api/withdraw/withdrawApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BindAccount = () => {
    const id = localStorage.getItem("userId");
    const userId = id ? parseInt(id) : 0;
    const { data: userData } = useGetSingleUserQuery(userId);

    const [name, setName] = useState("");
    const [accountType, setAccountType] = useState<"BankTransfer" | "MobileBanking" | "">("");

    // Bank Transfer fields
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState(""); // Changed to string
    const [branchName, setBranchName] = useState("");
    const [districtName, setDistrictName] = useState("");

    // Mobile Banking fields
    const [provider, setProvider] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");

    useEffect(() => {
        if (userData?.data?.name) {
            setName(userData.data.name);
        }
    }, [userData]);

    const navigate = useNavigate();

    const [bindAccount, { isLoading, isError }] = useBindAccountMutation();

    const handleSubmit = async () => {
        if (!accountType) {
            toast.error("Please select an account type");
            return;
        }

        if (!name) {
            toast.error("Please enter your name");
            return;
        }

        let payload: any = {
            userId,
            name,
            withdrawMethod: accountType,
        };

        if (accountType === "BankTransfer") {
            if (!bankName || !accountNumber || !districtName) {
                toast.error("Please fill all required fields");
                return;
            }
            payload = {
                ...payload,
                bankName,
                bankAccountNumber: Number(accountNumber),
                district: districtName,
            };

            // Only add branchName if it's not empty
            if (branchName) {
                payload.branchName = branchName;
            }
        } else if (accountType === "MobileBanking") {
            if (!provider || !mobileNumber) {
                toast.error("Please fill all required fields");
                return;
            }
            payload = {
                ...payload,
                mobileBankingName: provider,
                mobileBankingAccountNumber: Number(mobileNumber),
            };
        }

        try {
            console.log("FINAL PAYLOAD 👉", payload);
            const result = await bindAccount(payload).unwrap();
            console.log("API Response:", result);
            toast.success("Account bound successfully");
            navigate("/index");
        } catch (err: any) {
            console.error("Bind account failed", err);
            toast.error(err?.data?.message || "Failed to bind account");
        }
    };

    return (
        <div className="max-w-md space-y-4 h-screen py-12 mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Bind Account</h2>

            <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            {/* Account Type Selection */}
            <div className="space-y-2">
                <label className="block text-sm font-medium">Withdrawal Method *</label>
                <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value as "BankTransfer" | "MobileBanking")}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="">Select Withdrawal Method</option>
                    <option value="BankTransfer">Bank Transfer</option>
                    <option value="MobileBanking">Mobile Banking</option>
                </select>
            </div>

            {/* Bank Transfer Fields */}
            {accountType === "BankTransfer" && (
                <>
                    <div>
                        <label className="block text-sm font-medium mb-1">Bank Name *</label>
                        <input
                            type="text"
                            placeholder="e.g., DBBL, City Bank"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Account Number *</label>
                        <input
                            type="text"
                            placeholder="Enter account number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Branch Name</label>
                        <input
                            type="text"
                            placeholder="e.g., Dhanmondi"
                            value={branchName}
                            onChange={(e) => setBranchName(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">District *</label>
                        <input
                            type="text"
                            placeholder="e.g., Dhaka, Chittagong"
                            value={districtName}
                            onChange={(e) => setDistrictName(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                </>
            )}

            {/* Mobile Banking Fields */}
            {accountType === "MobileBanking" && (
                <>
                    <div>
                        <label className="block text-sm font-medium mb-1">Provider *</label>
                        <input
                            type="text"
                            placeholder="e.g., bKash, Nagad, Rocket"
                            value={provider}
                            onChange={(e) => setProvider(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Mobile Number *</label>
                        <input
                            type="tel"
                            placeholder="Enter mobile number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                </>
            )}

            <button
                onClick={handleSubmit}
                disabled={isLoading || !accountType || !name}
                className="w-full bg-black text-white py-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-6"
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
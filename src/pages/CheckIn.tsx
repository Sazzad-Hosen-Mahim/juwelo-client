import moneyBag from "@/assets/money-bag.png";
import { useGetSingleUserQuery } from "@/store/api/user/userApi";
import { useClaimCheckInRewardMutation } from "@/store/api/user/userApi"; // we'll add this
import { BsFileLock } from "react-icons/bs";
import { toast } from "sonner";


// Define reward structure with required amount (numeric) and day number
const rewards = [
    { day: "1 Day", amount: "৳300", numericAmount: 300, dayNum: 1 },
    { day: "2 Day", amount: "৳700", numericAmount: 700, dayNum: 2 },
    { day: "3 Day", amount: "৳1500", numericAmount: 1500, dayNum: 3 },
    { day: "4 Day", amount: "৳3400", numericAmount: 3400, dayNum: 4 },
    { day: "5 Day", amount: "৳6000", numericAmount: 6000, dayNum: 5 },
    { day: "6 Day", amount: "৳12000", numericAmount: 12000, dayNum: 6 },
    { day: "7 Day", amount: "৳20000", numericAmount: 20000, dayNum: 7 },
];

export default function CheckIn() {
    const id = localStorage.getItem("userId");
    const userId = id ? parseInt(id) : 0;

    const { data: userData, isLoading } = useGetSingleUserQuery(userId, {
        skip: !userId,
        refetchOnMountOrArgChange: true,
    });

    const [claimReward, { isLoading: isClaiming }] = useClaimCheckInRewardMutation();

    const orderCount = userData?.data?.orderCountForCheckIn ?? 0;
    // Example: you might later get claimed days from backend
    // For now we'll use a simple local simulation (you should replace with real data)
    const claimedDays = userData?.data?.claimedCheckInDays || []; // e.g. [1,2,3]

    const handleClaim = async (dayNum: number, amount: number) => {
        if (isClaiming) return;

        try {
            await claimReward({
                userId,
                checkInAmount: amount,
            }).unwrap();

            console.log(`Claimed day ${dayNum} → ৳${amount}`);
        } catch (err) {
            console.error("Claim failed:", err);
        }
    };

    if (isLoading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div>
            {/* Hero Section */}
            <div className="">
                <div className="rounded-b-lg relative bg-[url('/src/assets/check-in/checkin.jpg')] h-[280px] bg-cover bg-center flex items-center justify-center">
                    <div className="rounded-b-lg absolute inset-0 bg-black/45" />
                    <div className="relative z-10 mx-8 px-4 py-10 max-w-2xl rounded-lg shadow-xl text-center">
                        <h2 className="text-4xl text-white font-semibold mb-5">Daily Check In</h2>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mt-5 mx-auto rounded-xl bg-white p-5 shadow">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-gray-800">Daily Check in</h3>
                </div>

                {/* Rewards Grid */}
                <div className="flex flex-col gap-6">
                    {/* Top row */}
                    <div className="flex justify-between gap-2 flex-wrap">
                        {rewards.slice(0, 5).map((item) => (
                            <RewardItem
                                key={item.dayNum}
                                {...item}
                                isClaimed={claimedDays.includes(item.dayNum)}
                                isUnlocked={orderCount >= 40} // adjust logic per day if needed
                                onClaim={() => handleClaim(item.dayNum, item.numericAmount)}
                            />
                        ))}
                    </div>

                    {/* Bottom row - centered */}
                    <div className="flex justify-center gap-10 flex-wrap">
                        {rewards.slice(5).map((item) => (
                            <RewardItem
                                key={item.dayNum}
                                {...item}
                                isClaimed={claimedDays.includes(item.dayNum)}
                                isUnlocked={orderCount >= 40} // adjust logic per day if needed
                                onClaim={() => handleClaim(item.dayNum, item.numericAmount)}
                            />
                        ))}
                    </div>
                </div>

                {/* You can keep a global Check In button or remove it */}
                {/* <button className="mt-6 w-full rounded-lg bg-gray-900 py-3 text-white font-medium">
          Check In
        </button> */}

                {/* <p className="mt-4 text-center text-sm text-gray-500">
                    +৳20000 You can get Reward for signing in for 7 days
                </p> */}
            </div>
        </div>
    );
}

interface RewardItemProps {
    day: string;
    amount: string;
    numericAmount: number;
    dayNum: number;
    isClaimed?: boolean;
    isUnlocked?: boolean;
    onClaim: () => void;
}

function RewardItem({
    day,
    amount,
    isClaimed = false,
    isUnlocked = false,
    onClaim,
}: RewardItemProps) {

    const handleClick = () => {
        if (!isUnlocked && !isClaimed) {
            toast.info("Complete 40 orders to unlock the reward");
            return;
        }

        if (!isClaimed) {
            onClaim();
        }
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={handleClick}
                className={`
                    relative flex flex-col items-center gap-1 p-3 rounded-xl transition-all
                    ${isClaimed
                        ? "bg-green-50 border border-green-200"
                        : isUnlocked
                            ? "bg-blue-50 hover:bg-blue-100 border border-blue-200 active:scale-95"
                            : "bg-gray-100 border border-gray-200"}
                `}
            >
                {/* LOCK OVERLAY */}
                {!isUnlocked && !isClaimed && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/30">
                        <BsFileLock className="text-white text-2xl" />
                    </div>
                )}

                <div
                    className={`
                        flex h-14 w-14 items-center justify-center rounded-full
                        ${isClaimed ? "bg-green-100" : "bg-gray-200"}
                    `}
                >
                    {isClaimed ? (
                        <span className="text-green-600 text-xl font-bold">✓</span>
                    ) : (
                        <img src={moneyBag} alt="money bag" className="h-7 w-7" />
                    )}
                </div>

                <span className="text-xs text-gray-600 font-medium">{day}</span>
                <span
                    className={`text-xs font-semibold ${isClaimed ? "text-green-600" : "text-red-500"
                        }`}
                >
                    {isClaimed ? "Claimed" : amount}
                </span>
            </button>
        </div>
    );
}

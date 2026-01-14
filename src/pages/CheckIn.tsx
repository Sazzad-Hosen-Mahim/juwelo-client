import moneyBag from "@/assets/money-bag.png";

const rewards = [
    { day: "1 Day", amount: "৳300" },
    { day: "2 Day", amount: "৳700" },
    { day: "3 Day", amount: "৳1500" },
    { day: "4 Day", amount: "৳3400" },
    { day: "5 Day", amount: "৳6000" },
    { day: "6 Day", amount: "৳12000" },
    { day: "7 Day", amount: "৳20000" },
];

export default function CheckIn() {
    return (
        <div>
            <div className="">
                <div className="rounded-b-lg relative bg-[url('/src/assets/check-in/checkin.jpg')] h-[280px] bg-cover bg-center flex items-center justify-center">
                    {/* Optional overlay */}
                    <div className="rounded-b-lg absolute inset-0 bg-black/45" />

                    {/* Middle Text Box */}
                    <div className="relative z-10 mx-8 px-4 py-10 max-w-2xl rounded-lg shadow-xl text-center">
                        <h2 className="text-4xl text-white font-semibold mb-5">
                            Daily Check In
                        </h2>
                    </div>
                </div>
            </div>
            <div className="mt-5 mx-auto rounded-xl bg-white p-5 shadow">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-gray-800">Daily Check in</h3>
                    <span className="text-sm text-gray-500">0/7Day</span>
                </div>

                {/* Rewards */}
                <div className="flex flex-col gap-6">
                    {/* Top Row */}
                    <div className="flex justify-between">
                        {rewards.slice(0, 5).map((item, idx) => (
                            <RewardItem key={idx} {...item} />
                        ))}
                    </div>

                    {/* Bottom Row */}
                    <div className="flex justify-center gap-10">
                        {rewards.slice(5).map((item, idx) => (
                            <RewardItem key={idx} {...item} />
                        ))}
                    </div>
                </div>

                {/* Button */}
                <button className="mt-6 w-full rounded-lg bg-gray-900 py-3 text-white font-medium">
                    Check In
                </button>

                {/* Footer Text */}
                <p className="mt-2 text-center text-sm text-gray-500">
                    +৳20000 You can get Reward for signing in for
                </p>
            </div>
        </div>
    );
}

function RewardItem({
    day,
    amount,
}: {
    day: string;
    amount: string;
}) {
    return (
        <div className="flex flex-col items-center gap-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200">
                <img src={moneyBag} alt="money bag" className="h-7 w-7" />
            </div>

            <span className="text-xs text-gray-600">{day}</span>
            <span className="text-xs font-semibold text-red-500">{amount}</span>
        </div>
    );
}

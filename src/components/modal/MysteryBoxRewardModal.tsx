import React, { useState, useEffect } from "react";
import { Gift, X } from "lucide-react";

interface MysteryBoxModalProps {
    open: boolean;
    onClose: () => void;
    mysteryReward: number;
    onContinue: () => void;
}

interface BoxReveal {
    boxIndex: number;
    amount: string;
    isWinning: boolean;
}

const MysteryBoxRewardModal: React.FC<MysteryBoxModalProps> = ({
    open,
    onClose,
    mysteryReward,
    onContinue,
}) => {
    const [selectedBox, setSelectedBox] = useState<number | null>(null);
    const [revealedBoxes, setRevealedBoxes] = useState<BoxReveal[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Reset state when modal opens
        if (open) {
            setSelectedBox(null);
            setRevealedBoxes([]);
            setIsAnimating(false);
        }
    }, [open]);

    if (!open) return null;

    const generateRandomAmount = (): string => {
        // Generate random amount between 50% to 150% of mystery reward
        const min = Math.floor(mysteryReward * 0.5);
        const max = Math.floor(mysteryReward * 1.5);
        const amount = Math.floor(Math.random() * (max - min + 1)) + min;
        return amount.toLocaleString();
    };

    const generateUniqueAmounts = (count: number): string[] => {
        const amounts = new Set<string>();

        while (amounts.size < count) {
            amounts.add(generateRandomAmount());
        }

        return Array.from(amounts);
    };

    const handleBoxClick = (boxIndex: number) => {
        if (selectedBox !== null || isAnimating) return;

        setIsAnimating(true);
        setSelectedBox(boxIndex);

        // Reveal selected box first (winning amount)
        setTimeout(() => {
            setRevealedBoxes((prev) => [
                ...prev,
                {
                    boxIndex,
                    amount: mysteryReward.toLocaleString(),
                    isWinning: true,
                },
            ]);
        }, 500);

        // Reveal other boxes after a delay with unique random amounts
        setTimeout(() => {
            const otherBoxes = [0, 1, 2].filter((i) => i !== boxIndex);
            const uniqueAmounts = generateUniqueAmounts(2);

            const reveals: BoxReveal[] = otherBoxes.map((idx, i) => ({
                boxIndex: idx,
                amount: uniqueAmounts[i],
                isWinning: false,
            }));

            setRevealedBoxes((prev) => [...prev, ...reveals]);
            setIsAnimating(false);
        }, 1500);
    };

    const getRevealedAmount = (boxIndex: number): BoxReveal | undefined => {
        return revealedBoxes.find((box) => box.boxIndex === boxIndex);
    };

    const isBoxRevealed = (boxIndex: number): boolean => {
        return revealedBoxes.some((box) => box.boxIndex === boxIndex);
    };

    const handleContinue = () => {
        onContinue();
        onClose();
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 rounded-2xl w-full max-w-md relative overflow-hidden">
                {/* Animated background effects */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400 via-transparent to-transparent animate-pulse"></div>
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                    disabled={isAnimating}
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Content */}
                <div className="relative z-10 p-6">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-block p-3 bg-yellow-400 rounded-full mb-3 animate-bounce">
                            <Gift className="w-8 h-8 text-purple-900" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Mystery Reward!
                        </h2>
                        <p className="text-purple-200">
                            {selectedBox === null
                                ? "Choose your mystery box"
                                : "Congratulations!"}
                        </p>
                    </div>

                    {/* Mystery Boxes */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {[0, 1, 2].map((boxIndex) => {
                            const revealed = getRevealedAmount(boxIndex);
                            const isRevealed = isBoxRevealed(boxIndex);
                            const isSelected = selectedBox === boxIndex;

                            return (
                                <button
                                    key={boxIndex}
                                    onClick={() => handleBoxClick(boxIndex)}
                                    disabled={selectedBox !== null || isAnimating}
                                    className={`
                                        relative aspect-square rounded-xl transition-all duration-500 transform
                                        ${!isRevealed
                                            ? "bg-gradient-to-br from-yellow-400 to-orange-500 hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-2xl"
                                            : ""
                                        }
                                        ${isSelected && !isRevealed ? "animate-pulse scale-110" : ""}
                                        ${selectedBox !== null && !isRevealed ? "opacity-50" : ""}
                                        ${isRevealed && revealed?.isWinning ? "scale-110" : ""}
                                    `}
                                >
                                    {!isRevealed ? (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Gift
                                                className={`w-12 h-12 text-white ${isSelected ? "animate-spin" : ""}`}
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className={`
                                                absolute inset-0 flex flex-col items-center justify-center rounded-xl
                                                ${revealed?.isWinning
                                                    ? "bg-gradient-to-br from-green-400 to-emerald-600 animate-pulse"
                                                    : "bg-gradient-to-br from-gray-400 to-gray-600"
                                                }
                                            `}
                                        >
                                            <div className="text-xs text-white mb-1">₹</div>
                                            <div
                                                className={`text-xl font-bold text-white ${revealed?.isWinning ? "animate-bounce" : ""}`}
                                            >
                                                {revealed?.amount}
                                            </div>
                                            {revealed?.isWinning && (
                                                <div className="text-xs text-white mt-1">YOU WIN!</div>
                                            )}
                                        </div>
                                    )}

                                    {/* Box number */}
                                    {!isRevealed && (
                                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-xs font-semibold">
                                            #{boxIndex + 1}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Result message */}
                    {revealedBoxes.length === 3 && (
                        <div className="text-center animate-fadeIn">
                            <div className="bg-amber-700 bg-opacity-20 rounded-lg p-4 mb-4">
                                <p className="text-white text-lg font-semibold mb-1">
                                    Your Prize
                                </p>
                                <p className="text-yellow-300 text-3xl font-bold">
                                    ₹{mysteryReward.toLocaleString()}
                                </p>
                            </div>
                            <button
                                onClick={handleContinue}
                                className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 font-bold text-lg rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105"
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {/* Instructions */}
                    {selectedBox === null && (
                        <div className="text-center text-purple-200 text-sm">
                            <p>Pick a box to reveal your reward!</p>
                            {/* <p className="text-xs mt-1 opacity-75">
                                Mystery Reward: ₹{mysteryReward.toLocaleString()}
                            </p> */}
                        </div>
                    )}
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-yellow-400 rounded-full opacity-20 -translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-400 rounded-full opacity-20 translate-x-16 translate-y-16"></div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </div>
    );
};

export default MysteryBoxRewardModal;
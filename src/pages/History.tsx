import { useGetHistoryQuery } from '@/store/api/withdraw/withdrawApi';
import { useState } from 'react';

type HistoryType = 'checkIn' | 'withdraw' | 'recharge';

interface HistoryItem {
    _id: string;
    userId: string;
    historyType: HistoryType;
    amount: number;
    time: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const History = () => {
    const [activeTab, setActiveTab] = useState<HistoryType>('checkIn');

    // Replace with actual userId from your auth state
    const id = localStorage.getItem("mongodbId");
    const userId = id ? id : "";
    const { data, isLoading, error } = useGetHistoryQuery({
        userId,
        historyType: activeTab
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatAmount = (amount: number) => {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const getHistoryIcon = (type: HistoryType) => {
        switch (type) {
            case 'checkIn':
                return '✓';
            case 'withdraw':
                return '↓';
            case 'recharge':
                return '↑';
        }
    };

    const getHistoryColor = (type: HistoryType) => {
        switch (type) {
            case 'checkIn':
                return 'text-blue-600';
            case 'withdraw':
                return 'text-red-600';
            case 'recharge':
                return 'text-green-600';
        }
    };

    const tabs: { label: string; value: HistoryType }[] = [
        { label: 'Check In', value: 'checkIn' },
        { label: 'Withdraw', value: 'withdraw' },
        { label: 'Recharge', value: 'recharge' }
    ];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Transaction History</h1>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={`px-6 py-3 font-medium text-sm transition-colors ${activeTab === tab.value
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-600 hover:text-gray-800'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow">
                {isLoading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {/* {error && (
                    <div className="p-6 text-center text-red-600">
                        <p className="text-lg font-semibold">Error loading history</p>
                        <p className="text-sm mt-2">Please try again later</p>
                    </div>
                )} */}

                {!isLoading && !error && data?.data && data.data.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        <p className="text-lg font-semibold">No transactions found</p>
                        <p className="text-sm mt-2">You haven't made any {activeTab} transactions yet</p>
                    </div>
                )}

                {!isLoading && !error && data?.data && data.data.length > 0 && (
                    <div className="divide-y divide-gray-100">
                        {data.data.map((item: HistoryItem) => (
                            <div
                                key={item._id}
                                className="p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeTab === 'checkIn' ? 'bg-blue-100' :
                                            activeTab === 'withdraw' ? 'bg-red-100' :
                                                'bg-green-100'
                                            }`}>
                                            <span className={`text-xl ${getHistoryColor(item.historyType)}`}>
                                                {getHistoryIcon(item.historyType)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800 capitalize">
                                                {item.historyType}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {formatDate(item.time)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-lg font-bold ${getHistoryColor(item.historyType)}`}>
                                            {item.historyType === 'withdraw' ? '-' : '+'}
                                            {formatAmount(item.amount)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
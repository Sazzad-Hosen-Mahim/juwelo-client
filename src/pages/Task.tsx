import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import prod1 from "@/assets/product/prod-1.webp";
import prod2 from "@/assets/product/prod-2.webp";
import prod3 from "@/assets/product/prod-3.webp";
import prod4 from "@/assets/product/prod-4.webp";
import prod5 from "@/assets/product/prod-5.webp";
import AccountDetailsModal from "@/components/modal/AccountDetailsModal";
import PackageSelectionModal from "@/components/modal/PackageSelectionModal";
import MysteryBoxModal from "@/components/modal/MysteryBoxModal";
import { useGetSingleUserQuery, useUpdateSelectedPackageMutation } from "@/store/api/user/userApi";

interface TaskItem {
  id: number;
  image: string;
  title: string;
  reviews: string;
}

const Task: React.FC = () => {
  const navigate = useNavigate();
  const tasks: TaskItem[] = [
    {
      id: 1,
      image: prod1,
      title: "Nepal Kyanite Steel Bangle (Riya)",
      reviews: "6,507 Reviews",
    },
    {
      id: 2,
      image: prod2,
      title: "Purple Diamond Ring in 14K Gold",
      reviews: "16,772 Reviews",
    },
    {
      id: 3,
      image: prod3,
      title: "Sky Blue Topaz Platinum Pendant",
      reviews: "14,803 Reviews",
    },
    {
      id: 4,
      image: prod4,
      title: "hmIPULSE FLEECE REGULAR CREW",
      reviews: "5,458 Reviews",
    },
    {
      id: 5,
      image: prod5,
      title: "DBU 88 REPLICA JERSEY S/S",
      reviews: "10,237 Reviews",
    },
  ];

  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [openPackageModal, setOpenPackageModal] = useState(false);
  const [openMysteryBoxModal, setOpenMysteryBoxModal] = useState(false);
  const [mysteryBoxData, setMysteryBoxData] = useState<any>(null);

  // Fetch user data - Replace 7872843 with actual userId from auth/context
  const userId = 7872843;
  const { data: userData, isLoading } = useGetSingleUserQuery(userId);
  const [updatePackage, { isLoading: isUpdating }] =
    useUpdateSelectedPackageMutation();

  const user = userData?.data;

  const accountDetailsData = {
    name: user?.name || "sajjadhosenmahim",
    userId: user?.userId || 7872843,
    quantityOfOrders: user?.quantityOfOrders || 25,
    userBalance: user?.userBalance || 0,
    memberTotalRecharge: user?.memberTotalRecharge || 0,
    userType: user?.userType || "Normal",
  };

  const handleStartClick = () => {
    // Check if user has admin assigned products with mystery box
    if (user?.adminAssaignProducts && user.adminAssaignProducts.length > 0) {
      const productWithMysteryBox = user.adminAssaignProducts.find(
        (product: any) => product.mysterybox && product.mysterybox.method && product.mysterybox.amount
      );

      if (productWithMysteryBox) {
        setMysteryBoxData(productWithMysteryBox.mysterybox);
        setOpenMysteryBoxModal(true);
        return;
      }
    }

    // Check if user has selected package
    if (!user?.userSelectedPackage) {
      // Show package selection modal
      setOpenPackageModal(true);
    } else {
      // Navigate to product page
      navigate("/product");
    }
  };

  const handlePackageSelection = async (amount: number) => {
    try {
      await updatePackage({ userId, amount }).unwrap();
      setOpenPackageModal(false);
      // After successful update, the query will refetch automatically
      console.log("Package selected successfully:", amount);
    } catch (error) {
      console.error("Failed to update package:", error);
      // You can add error handling/toast notification here
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[500px] mx-auto bg-white h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[500px] mx-auto bg-white h-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span className="hover:text-gray-900 cursor-pointer">Home</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-900">Go Shopping</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Hummel Order</h1>
      </div>

      {/* Tab Headers */}
      <div className="grid grid-cols-2 border-b border-gray-300">
        <div className="text-center py-3 font-semibold text-gray-900 border-b-2 border-gray-900">
          Ng.Collection
        </div>
        <div className="text-center py-3 font-semibold text-gray-600">
          Description
        </div>
      </div>

      {/* Product List */}
      <div className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            {/* Left Side: Number + Image + Details */}
            <div className="flex items-center gap-4 flex-1">
              {/* Number */}
              <div className="text-lg font-semibold text-gray-900 w-6">
                {task.id}
              </div>

              {/* Product Image */}
              <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                <img
                  src={task.image}
                  alt={task.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect fill='%23e5e7eb' width='64' height='64'/%3E%3C/svg%3E%3C/svg%3E";
                  }}
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  {task.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Star className="w-3 h-3 fill-current text-gray-900" />
                  <span>{task.reviews}</span>
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="max-w-[500px] px-5 mx-auto bg-white border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2 mb-4 my-8">
          <button
            onClick={() => setOpenAccountModal(true)}
            className="py-4 cursor-pointer text-white bg-gray-600 hover:bg-gray-700 font-medium transition-colors"
          >
            Account Details
          </button>

          <button className="py-4 cursor-pointer text-white bg-gray-600 hover:bg-gray-700 font-medium transition-colors">
            Order Record
          </button>
        </div>
        <button
          onClick={handleStartClick}
          className="w-full py-4 text-white cursor-pointer bg-black hover:bg-gray-900 font-semibold text-lg transition-colors"
        >
          Start
        </button>
      </div>

      {/* Modals */}
      <AccountDetailsModal
        open={openAccountModal}
        onClose={() => setOpenAccountModal(false)}
        data={accountDetailsData}
      />

      <PackageSelectionModal
        open={openPackageModal}
        onClose={() => setOpenPackageModal(false)}
        availableSlots={user?.userOrderAmountSlot || []}
        onSelectPackage={handlePackageSelection}
        isLoading={isUpdating}
      />

      {mysteryBoxData && (
        <MysteryBoxModal
          open={openMysteryBoxModal}
          onClose={() => {
            setOpenMysteryBoxModal(false);
            setMysteryBoxData(null);
            // After closing mystery box, navigate to product
            navigate("/product");
          }}
          mysteryBoxData={mysteryBoxData}
        />
      )}

      {/* Add padding at bottom to prevent content from being hidden behind fixed buttons */}
      <div className="h-32"></div>
    </div>
  );
};

export default Task;
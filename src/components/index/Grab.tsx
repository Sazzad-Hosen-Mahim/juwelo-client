import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PackageSelectionModal from "@/components/modal/PackageSelectionModal";
import {
  useGetSingleUserQuery,
  useUpdateSelectedPackageMutation
} from "@/store/api/user/userApi";
import { toast } from "sonner";

const Grab = () => {
  const navigate = useNavigate();
  const [openPackageModal, setOpenPackageModal] = useState(false);

  const isLoggedIn = !!localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const userIdNumber = userId ? parseInt(userId) : 0;

  // Fetch user data to check userSelectedPackage
  const { data: userData } = useGetSingleUserQuery(userIdNumber, {
    skip: !isLoggedIn || !userId,
  });

  const [updatePackage, { isLoading: isUpdating }] = useUpdateSelectedPackageMutation();

  const user = userData?.data;

  const handleGrabOrder = () => {
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      navigate("/login");
      return;
    }

    // Check if user has already selected a package
    if (user?.userSelectedPackage && user.userSelectedPackage > 0) {
      // User already has a package selected, go directly to task page
      navigate("/task");
    } else {
      // User hasn't selected a package yet, show modal
      setOpenPackageModal(true);
    }
  };

  const handlePackageSelection = async (amount: number) => {
    if (!userId) return;

    try {
      await updatePackage({ userId: userIdNumber, amount }).unwrap();
      setOpenPackageModal(false);
      toast.success("Package selected successfully");
      // Navigate to task page
      navigate("/task");
    } catch (error) {
      console.error("Failed to update package:", error);
      toast.error("Failed to update package");
    }
  };

  return (
    <div className="bg-[url('/src/assets/home-page/jewel-1.jpg')] h-[430px] bg-cover bg-center flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-3 bg-black/60 p-2 rounded-md">
        <h1 className="text-2xl text-white font-bold">
          Do more with{" "}
          <span className="text-golden uppercase font-extrabold">Juwelo</span>
        </h1>
        <p className="text-md text-white">
          Browse and purchase products in various styles and materials.
        </p>

        <button
          onClick={handleGrabOrder}
          className="bg-black cursor-pointer text-white rounded-md px-4 py-2 w-32 text-center hover:opacity-90"
        >
          Grab Order
        </button>
      </div>

      {/* Package Selection Modal - Only shown if userSelectedPackage is 0 or not set */}
      {isLoggedIn && (
        <PackageSelectionModal
          open={openPackageModal}
          onClose={() => setOpenPackageModal(false)}
          availableSlots={user?.userOrderAmountSlot || []}
          onSelectPackage={handlePackageSelection}
          isLoading={isUpdating}
        />
      )}
    </div>
  );
};

export default Grab;
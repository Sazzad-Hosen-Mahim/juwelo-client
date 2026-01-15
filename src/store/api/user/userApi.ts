import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get single user data
        getSingleUser: builder.query({
            query: (userId: number) => ({
                url: `/user/getSingle/${userId}`,
                method: "GET",
            }),
            providesTags: ["Auth"],
        }),

        // Update selected package amount
        updateSelectedPackage: builder.mutation({
            query: ({ userId, amount }: { userId: number; amount: number }) => ({
                url: `/user/update-selected-package-amount/${userId}`,
                method: "PATCH",
                body: { amount },
            }),
            invalidatesTags: ["Auth"],
        }),

        // Get purchase order (product to purchase)
        getPurchaseOrder: builder.query({
            query: (userId: number) => ({
                url: `/user/purchase-order/${userId}`,
                method: "GET",
            }),
            providesTags: ["Auth"],
            // Force refetch on every mount/navigation
            keepUnusedDataFor: 0,
        }),

        // Confirm purchase order
        confirmPurchaseOrder: builder.mutation({
            query: ({ userId, productId }: { userId: number; productId: number }) => ({
                url: `/user/confirmed-purchase-order/${userId}/${productId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Auth"],
        }),

        // Remove mystery reward (reset to 0)
        removeMysteryReward: builder.mutation({
            query: (userId: number) => ({
                url: `/user/remove-mystery-reward/${userId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Auth"],
        }),

        claimCheckInReward: builder.mutation<
            any, // response type (you can type it if you have one)
            { userId: number; checkInAmount: number }
        >({
            query: ({ userId, checkInAmount }) => ({
                url: `/user/add-check-in-reward/${userId}`,
                method: "POST",
                body: { checkInAmount },
            }),
            invalidatesTags: ["Auth"], // so user data refetches
        }),

        getUserCompletedProducts: builder.query({
            query: (userId: number) => ({
                url: `/user/get-user-completed-products/${userId}`,
                method: "GET",
            }),
            providesTags: ["Auth"],
        }),
    }),
});

export const {
    useGetSingleUserQuery,
    useUpdateSelectedPackageMutation,
    useGetPurchaseOrderQuery,
    useConfirmPurchaseOrderMutation,
    useRemoveMysteryRewardMutation,
    useClaimCheckInRewardMutation,
    useGetUserCompletedProductsQuery,
} = userApi;
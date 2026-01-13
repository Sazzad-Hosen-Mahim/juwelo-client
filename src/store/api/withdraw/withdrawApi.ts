// src/redux/api/withdrawApi.ts

import { baseApi } from "../baseApi";

interface BindAccountPayload {
    userId: string;
    BankName: string;
    withdrawalAddress: string;
}

export const withdrawApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        bindAccount: builder.mutation<any, BindAccountPayload>({
            query: ({ userId, BankName, withdrawalAddress }) => ({
                url: `/user/update-withdrawal-address/${userId}`,
                method: "PATCH",
                body: {
                    BankName,
                    withdrawalAddress,
                },
            }),
            invalidatesTags: ["Withdraw"],
        }),
    }),
});

export const { useBindAccountMutation } = withdrawApi;

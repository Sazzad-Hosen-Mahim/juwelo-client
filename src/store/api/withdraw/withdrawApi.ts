// src/redux/api/withdrawApi.ts

import { baseApi } from "../baseApi";

interface BindAccountPayload {
    userId: string;
    BankName: string;
    withdrawalAddress: string;
}

interface BindAccountResponse {
    success: boolean;
    message: string;
    data: any;
}

interface CreateWithdrawPayload {
    userId: number;
    amount: number;
}

interface CreateWithdrawResponse {
    success: boolean;
    message: string;
    data?: any;
}

export const withdrawApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        bindAccount: builder.mutation<BindAccountResponse, BindAccountPayload>({
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
        createWithdraw: builder.mutation<CreateWithdrawResponse, CreateWithdrawPayload>({
            query: (payload) => ({
                url: "/withdraw/create-withdraw",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Withdraw"],
        }),
    }),
});

export const {
    useBindAccountMutation,
    useCreateWithdrawMutation
} = withdrawApi;
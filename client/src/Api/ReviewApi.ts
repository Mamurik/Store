import { IReview } from "@/Types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const ReviewsApi = createApi({
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3000"}),
    endpoints:(builder)=>({
        getReviews:builder.query<IReview[],void>({
            query:()=>"/reviews",
            transformResponse: (response: IReview[]) => {
                localStorage.setItem('reviews', JSON.stringify(response));
                return response;
            },
        }),
        addReview:builder.mutation<IReview,IReview>({
            query:(body)=> ({
                method:"POST",
                url:'/reviews',
                body
            })

        })
    })
})
export const {useGetReviewsQuery,useAddReviewMutation} = ReviewsApi
export default ReviewsApi
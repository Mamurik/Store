import { IReview } from "@/Types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IReviewSlice{
reviews:IReview[]
}
const initialState:IReviewSlice = {
reviews:[]
}

const ReviewSlice = createSlice({
    name:"reviews",
    initialState,
    reducers:{
        setReviews:(state,action:PayloadAction<IReview[]>)=>{
            state.reviews = action.payload
        }
    }
})
export const {setReviews} = ReviewSlice.actions
export default ReviewSlice.reducer
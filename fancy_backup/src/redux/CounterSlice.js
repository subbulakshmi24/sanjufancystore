import { createSlice } from '@reduxjs/toolkit'
const data=localStorage.getItem("count")


// const initialState = {
//   famousCount:34,
//   unfamouscount:2,
//   TotalCount:36,
// }
const initialState = {
  famousCount:JSON.parse(data) || 34,
  unfamouscount:2,
  TotalCount:36,
}



export const FamousFoodSlice = createSlice({
  name: 'famous',
  initialState,
  reducers: {

    // incrementfamous: (state) => {
    //   state.famousCount += 1
    // },
    incrementfamous: (state,action) => {
      state.famousCount += action.payload
       localStorage.setItem("count", JSON.stringify(state.famousCount))

    },
   decrementfamous: (state) => {
     state.famousCount -= 1
    },
    
    incrementunfamous: (state) => {
      state.unfamouscount += 1
    },
    decrementunfamous:(state)=>{  
     state.unfamouscount -=  1
    },

  },
})

// Action creators are generated for each case reducer function
export const { incrementfamous, decrementfamous, incrementunfamous,decrementunfamous } = FamousFoodSlice.actions;

export default FamousFoodSlice.reducer;
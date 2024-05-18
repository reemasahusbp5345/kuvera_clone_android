import { createSlice } from "@reduxjs/toolkit";

const portfolioSlice=createSlice({
    name:"portfolio",
    initialState:{
        portfolioData:[],
        modal:false,
        selectedStock:null
    },
    reducers:{
        getPortfolio:(state,action)=>{
            state.portfolioData= action?.payload;
        },
        addToPortfolio:(state,action)=>{
            state.portfolioData= [action?.payload,...state.portfolioData]
        },
        editPortfolio:(state,action)=>{
            state.portfolioData= state?.portfolioData?.map(item => (item?._id === action?.payload?.id ? action?.payload?.data : item))
        },
        deletePortfolio:(state,action)=>{
            state.portfolioData=state?.portfolioData?.filter(item => item?._id !== action?.payload?.id)
        },
        openModal:(state,action)=>{
            state.modal=true;
            state.selectedStock=action?.payload
        },
        closeModal:(state,action)=>{
            state.modal=false;
            state.selectedStock=null
        }
    }
});

export const {getPortfolio, addToPortfolio, editPortfolio, deletePortfolio,openModal,closeModal}=portfolioSlice?.actions;

export default portfolioSlice.reducer;
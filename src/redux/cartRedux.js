import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: localStorage.getItem("cartProducts") ? JSON.parse(localStorage.getItem("cartProducts")) : [],
        quantity: localStorage.getItem("cartQuantity") ? parseInt(localStorage.getItem("cartQuantity")) : 0,
        total: localStorage.getItem("cartTotal") ? parseFloat(localStorage.getItem("cartTotal")) : 0.0,
    },
    reducers: {
        addProduct: (state, action) => {
            const productIndex = state.products.findIndex(
            (product) => product._id === action.payload._id && product.color === action.payload.color && product.size === action.payload.size
            );
            if(productIndex === -1){
                state.products.push(action.payload);  
            }
            if(productIndex > -1){
                state.products[productIndex].quantity += action.payload.quantity;   
            }
            state.quantity += action.payload.quantity;
            state.total += action.payload.price * action.payload.quantity;
          
            localStorage.setItem("cartProducts", JSON.stringify(state.products));   
            localStorage.setItem("cartQuantity", state.quantity);
            localStorage.setItem("cartTotal", state.total);
        },
        removeFromCart: (state, action) => {
            const productIndex = state.products.findIndex(
                (product) => product._id === action.payload._id && product.color === action.payload.color && product.size === action.payload.size
            );
            if(state.quantity === 1 || state.products.length === 1){
                state.products = [];
                state.quantity = 0;
                state.total = 0.0;
                localStorage.setItem("cartProducts", "[]");   
                localStorage.setItem("cartQuantity", 0);
                localStorage.setItem("cartTotal", 0.0);
                return;
            }
            if(productIndex >= 0){
                state.products.splice(productIndex, 1);
                state.quantity -= action.payload.quantity;
                state.total -= action.payload.price * action.payload.quantity; 
            }
            localStorage.setItem("cartProducts", JSON.stringify(state.products));   
            localStorage.setItem("cartQuantity", state.quantity);
            localStorage.setItem("cartTotal", state.total);
        },
        decreaseFromCart: (state, action) => {
            const productIndex = state.products.findIndex(
                (product) => product._id === action.payload._id && product.color === action.payload.color && product.size === action.payload.size
            );
            if(state.quantity === 1){
                state.products = [];
                state.quantity = 0;
                state.total = 0.0;
                localStorage.setItem("cartProducts", "[]");   
                localStorage.setItem("cartQuantity", 0);
                localStorage.setItem("cartTotal", 0.0);
                return;
            }
            else if(state.products[productIndex].quantity === 1){
                state.products.splice(productIndex, 1);
            }
            else if(state.products[productIndex].quantity > 1){
                state.products[productIndex].quantity -= 1;
            }  
            state.quantity -= 1;
            state.total -= action.payload.price;  
            localStorage.setItem("cartProducts", JSON.stringify(state.products));   
            localStorage.setItem("cartQuantity", state.quantity);
            localStorage.setItem("cartTotal", state.total);
        },
        increaseFromCart: (state, action) => {
            const productIndex = state.products.findIndex(
                (product) => product._id === action.payload._id && product.color === action.payload.color && product.size === action.payload.size
            );
            state.products[productIndex].quantity += 1;
            state.quantity += 1;
            state.total += action.payload.price;   
            localStorage.setItem("cartProducts", JSON.stringify(state.products));   
            localStorage.setItem("cartQuantity", state.quantity);
            localStorage.setItem("cartTotal", state.total);  
        },
        resetCartState: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0.0;
        },
    },
});

export const { addProduct, removeFromCart, decreaseFromCart, increaseFromCart, resetCartState } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.product_id === action.payload.product_id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(item => item.product_id === action.payload);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter(item => item.product_id !== action.payload);
      }
    },
    updateQuantity: (state, action) => {
      const existingItem = state.items.find(item => item.product_id === action.payload.product_id);
      if (existingItem) {
        state.totalQuantity += action.payload.quantity;
        existingItem.quantity += action.payload.quantity;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(item => item.product_id !== action.payload.product_id);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

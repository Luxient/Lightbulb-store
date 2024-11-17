import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      } else if (item && action.payload.quantity === 0) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

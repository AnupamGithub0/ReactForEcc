import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  loading: false,
  currentUser: null,
  error: false,
  products: null,
  addToCart: [],
  product: [],
  orders: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchingData: (state) => {
      state.loading = true;
    },
    fetchingDataSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    fetchingDataFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
    fetchProductSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = false;
    },
    addToCartSuccessed: (state, action) => {
      const product = action.payload;
      const productExists = state.addToCart.find((item) => item._id === product._id);
      // console.log("productexists",productExists);
      

      if (productExists) {
        
        state.addToCart = state.addToCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.addToCart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const product = action.payload;
      state.addToCart = state.addToCart.filter((item) => item._id !== product._id);
      toast.success("Removed from your cart!");
    }
  },
  successfullyOrders: (state,action)=>{
    state.loading = false;
    state.orders = action.payload
  }
});

export const {
  fetchingData,
  fetchingDataSuccess,
  fetchingDataFailed,
  fetchProductSuccess,
  addToCartSuccessed,
  removeFromCart,
  successfullyOrders
} = userSlice.actions;

export default userSlice.reducer;

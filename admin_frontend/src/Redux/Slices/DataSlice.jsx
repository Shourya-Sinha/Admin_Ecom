import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showSnackbar } from "./InitialSlice.jsx";
import { authBaseUrl } from "./AusthSlice.jsx";

export const productDataUrl = "https://admin-ecom-9d97.onrender.com/admin";
const initialState = {
  isLoading: null,
  isNewLoading: false,
  products: [],
  brand: [],
  category: [],
  colors: [],
  coupon: [],
  orders:[],
  error: null,
  fetchedProduct:null,
};

const slice = createSlice({
  name: "productData",
  initialState,
  reducers: {
    resetIsNewLoading: (state) => {
      state.isNewLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brand = action.payload.data;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteABrand.pending, (state, action) => {
        state.isLoading = action.meta.arg; // Assuming you pass brandId directly as an argument
      })
      .addCase(deleteABrand.fulfilled, (state, action) => {
        state.isLoading = null;
        state.brand = state.brand.filter(
          (brand) => brand._id !== action.meta.arg
        );
      })
      .addCase(deleteABrand.rejected, (state, action) => {
        state.isLoading = null;
        state.error = action.payload;
      })
      .addCase(updateBrand.pending, (state, action) => {
        state.isLoading = action.meta.arg.brandId;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = null; // Clear loading state after success
        state.brand = state.brand.map((brand) =>
          brand._id === action.payload.data._id ? action.payload.data : brand
        );
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = null;
        state.error = action.payload;
      })
      .addCase(createNewBrand.pending, (state) => {
        state.isNewLoading = true;
      })
      .addCase(createNewBrand.fulfilled, (state, action) => {
        state.isNewLoading = false;
        state.brand.push(action.payload.data);
      })
      .addCase(createNewBrand.rejected, (state, action) => {
        state.isNewLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload.data;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createNewCategory.pending, (state) => {
        state.isNewLoading = true;
      })
      .addCase(createNewCategory.fulfilled, (state, action) => {
        state.isNewLoading = false;
        state.category.push(action.payload.data);
      })
      .addCase(createNewCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteACategory.pending, (state, action) => {
        state.isLoading = action.meta.arg; // Set isLoading to the categoryId
      })
      .addCase(deleteACategory.fulfilled, (state, action) => {
        state.isLoading = null; // Reset isLoading to null
        state.category = state.category.filter(
          (category) => category._id !== action.meta.arg
        ); // Remove the deleted category
      })
      .addCase(deleteACategory.rejected, (state, action) => {
        state.isLoading = null; // Reset isLoading to null on error
        state.error = action.payload;
      })
      .addCase(updatrActaegory.pending, (state, action) => {
        state.isLoading = action.meta.arg.categoryId;
      })
      .addCase(updatrActaegory.fulfilled, (state, action) => {
        state.isLoading = null;
        state.category = state.category.map((category) =>
          category._id === action.payload.data._id
            ? action.payload.data
            : category
        );
      })
      .addCase(updatrActaegory.rejected, (state, action) => {
        state.isLoading = null;
        state.error = action.payload;
      })
      .addCase(getAllColors.pending, (state, action) => {
        state.isLoading = null;
      })
      .addCase(getAllColors.fulfilled, (state, action) => {
        state.isLoading = null;
        state.colors = action.payload.data;
      })
      .addCase(getAllColors.rejected, (state, action) => {
        state.isLoading = null;
        state.error = action.payload;
      })
      .addCase(createColor.pending, (state, action) => {
        state.isNewLoading = true;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isNewLoading = false;
        state.colors.push(action.payload.data);
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isNewLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteColor.pending, (state, action) => {
        state.isLoading = action.meta.arg;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = null;
        state.colors = state.colors.filter(
          (color) => color._id !== action.meta.arg
        );
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isLoading = null;
        state.error = action.payload;
      })
      .addCase(editColor.pending, (state, action) => {
        state.isLoading = action.meta.arg.colorId;
      })
      .addCase(editColor.fulfilled, (state, action) => {
        state.isLoading = null;
        state.colors = state.colors.map((color) =>
          color._id === action.payload.data._id ? action.payload.data : color
        );
      })
      .addCase(editColor.rejected, (state, action) => {
        state.isLoading = null;
        state.error = action.payload;
      })
      .addCase(getAllCoupon.pending, (state, action) => {
        state.isNewLoading = false;
      })
      .addCase(getAllCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupon = action.payload.data;
      })
      .addCase(getAllCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createNewCoupon.pending, (state, action) => {
        state.isNewLoading = true;
      })
      .addCase(createNewCoupon.fulfilled, (state, action) => {
        state.isNewLoading = false;
        state.coupon.push(action.payload.data);
      })
      .addCase(createNewCoupon.rejected, (state, action) => {
        state.isNewLoading = false;
        state.error = action.payload;
      }).addCase(deleteCoupon.pending,(state,action)=>{
        state.isLoading = action.meta.arg;
      }).addCase(deleteCoupon.fulfilled,(state,action)=>{
        state.isLoading = null;
        state.coupon = state.coupon.filter((coupon) => coupon._id!== action.meta.arg);
      }).addCase(deleteCoupon.rejected,(state,action)=>{
        state.isLoading = null;
        state.error = action.payload;
      }).addCase(upadtedCoupon.pending,(state,action)=>{
        state.isLoading = action.meta.arg.couponId;
      }).addCase(upadtedCoupon.fulfilled,(state,action)=>{
        state.isLoading = null;
        state.coupon = state.coupon.map((coupon) =>
          coupon._id === action.payload.data._id? action.payload.data : coupon
        );
      }).addCase(upadtedCoupon.rejected,(state,action)=>{
        state.isLoading = null;
        state.error = action.payload;
      }).addCase(getAllOrders.pending,(state,action)=>{
        state.isLoading = true;
      }).addCase(getAllOrders.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.orders = action.payload.data;
      }).addCase(getAllOrders.rejected,(state,action)=>{
        state.isLoading = false;
        state.error = action.payload;
      }).addCase(getAllProducts.pending,(state,action)=>{
        state.isNewLoading=true;
      }).addCase(getAllProducts.fulfilled,(state,action)=>{
        state.isNewLoading=false;
        state.products = action.payload.data;
      }).addCase(getAllProducts.rejected,(state,action)=>{
        state.isLoading=false;
        state.error = action.payload;
      }).addCase(createNeWProduct.pending,(state,action)=>{
        state.isNewLoading=true;
      }).addCase(createNeWProduct.fulfilled,(state,action)=>{
        state.isNewLoading=false;
        state.products.push(action.payload.data);
      }).addCase(createNeWProduct.rejected,(state,action)=>{
        state.isNewLoading=false;
        state.error = action.payload;
      }).addCase(updateProduct.pending,(state,action)=>{
        state.isLoading = action.meta.arg.productId;
      }).addCase(updateProduct.fulfilled,(state,action)=>{
        state.isLoading = null;
        state.products = state.products.map((product) =>
          product._id === action.payload.data._id? action.payload.data : product
        );
      }).addCase(updateProduct.rejected, (state, action) => { // Changed from `addCase(updateProduct)` to `addCase(updateProduct.rejected)`
        state.isLoading = null;
        state.error = action.payload;
      }).addCase(fetchAProduct.pending, (state) => {
        state.isNewLoading = true;
      })
      .addCase(fetchAProduct.fulfilled, (state, action) => {
        state.isNewLoading = false;
        state.fetchedProduct = action.payload.data; // Save product data in the state
      })
      .addCase(fetchAProduct.rejected, (state) => {
        state.isNewLoading = false;
      });
  },
});

export default slice.reducer;
export const { resetIsNewLoading } = slice.actions;

//All Function of Products

export const fetchAProduct = createAsyncThunk('fetch-product',async(productId,{dispatch,getState,rejectWithValue})=>{
    const token = getState().auth.token;
    try {
        const response = await axios.get(`${productDataUrl}/geta-product/${productId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(showSnackbar({severity:response.data.status,message:response.data.message}));
        console.log('response data',response.data);
        return response.data;
    } catch (error) {
        dispatch(
            showSnackbar({
              severity: error.response?.data?.status || "error",
              message: error.response?.data?.message || error.message,
            })
          );
          return rejectWithValue(error.response?.data);
    }
})

export const updateProduct = createAsyncThunk('update/product',async(formData,{dispatch,getState,rejectWithValue})=>{
    const token = getState().auth.token;
    try {
        const response = await axios.post(`${productDataUrl}/update-product/${productId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type' : 'multipart/form-data'
            },
        });
        dispatch(showSnackbar({severity:response.data.status,message:response.data.message}));
        return response.data;
    } catch (error) {
        dispatch(
            showSnackbar({
              severity: error.response?.data?.status || "error",
              message: error.response?.data?.message || error.message,
            })
          );
          return rejectWithValue(error.response?.data);
    }
})

export const createNeWProduct=createAsyncThunk('/create/product',async(formData,{dispatch,getState,rejectWithValue})=>{
    try {
        const token = getState().auth.token;

        const response = await axios.post(`${productDataUrl}/create-product`,formData,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type' : 'multipart/form-data'
            },
        });
        dispatch(showSnackbar({severity:response.data.status,message:response.data.message}));
        return response.data;
    } catch (error) {
        dispatch(
            showSnackbar({
              severity: error.response?.data?.status || "error",
              message: error.response?.data?.message || error.message,
            })
          );
          return rejectWithValue(error.response?.data);
    }
})
export const getAllProducts = createAsyncThunk('/getall/products',async(_,{dispatch,rejectWithValue})=>{
    try {
        const response = await axios.get(`${productDataUrl}/getAll-product`);
        // dispatch(showSnackbar({
        //     severity:response.data.status,
        //     message:response.data.message,
        // }));
        return response.data;
    } catch (error) {
        dispatch(
            showSnackbar({
              severity: error.response?.data?.status || "error",
              message: error.response?.data?.message || error.message,
            })
          );
          return rejectWithValue(error.response?.data);
    }
})

//All Function of Related Order
export const getAllOrders = createAsyncThunk('getAllOrder/order',async(_,{dispatch,getState,rejectWithValue})=>{
    try {
        const token = getState().auth.token;
        const response = await axios.get(`${authBaseUrl}/getAll-order`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // dispatch(showSnackbar({severity:response.data.status,message:response.data.message}));
        return response.data;
    } catch (error) {
        
    }
});

// All Function of Coupon

export const upadtedCoupon = createAsyncThunk('/update/coupon',async(data,{dispatch,getState,rejectWithValue})=>{
    try {
        const token = getState().auth.token;

        const response = await axios.put(`${productDataUrl}/update-coupon`,data,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        dispatch(showSnackbar({severity:response.data.status,message:response.data.message}));
        return response.data;
    } catch (error) {
        dispatch(
            showSnackbar({
              severity: error.response?.data?.status || "error",
              message: error.response?.data?.message || error.message,
            })
          );
          return rejectWithValue(error.response?.data);
    }
})

export const deleteCoupon = createAsyncThunk('/delete/coupon',async(couponId,{dispatch,getState,rejectWithValue})=>{
    try {
        const token = getState().auth.token;

        const response = await axios.delete(`${productDataUrl}/delete-coupon/${couponId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(
            showSnackbar({
              severity: response.data.status,
              message: response.data.message,
            })
          );
          return couponId;
    } catch (error) {
        dispatch(
            showSnackbar({
              severity: error.response?.data?.status || "error",
              message: error.response?.data?.message || error.message,
            })
          );
          return rejectWithValue(error.response?.data);
    }
});
export const createNewCoupon = createAsyncThunk(
  "coupon/create",
  async (data, { dispatch, rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.post(
        `${productDataUrl}/create-coupon`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(
        showSnackbar({
          severity: response.data.status,
          message: response.data.message,
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        showSnackbar({
          severity: error.response?.data?.status || "error",
          message: error.response?.data?.message || error.message,
        })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getAllCoupon = createAsyncThunk(
  "coupon/getAllCoupon",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`${productDataUrl}/getAll-coupon`);

      dispatch(
        showSnackbar({
          severity: response.data.status,
          message: response.data.message,
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        showSnackbar({
          severity: error.response?.data?.status || "error",
          message: error.response?.data?.message || error.message,
        })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

// All Function of Color

export const editColor = createAsyncThunk(
  "color/editColor",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.put(`${productDataUrl}/update-color`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(
        showSnackbar({
          severity: response.data.status,
          message: response.data.message,
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        showSnackbar({
          severity: error.response?.data?.status || "error",
          message: error.response?.data?.message || error.message,
        })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);
export const deleteColor = createAsyncThunk(
  "color/deletecolor",
  async (colorId, { dispatch, getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.delete(`${productDataUrl}/delete-color`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { colorId },
      });
      dispatch(
        showSnackbar({
          severity: response.data.status,
          message: response.data.message,
        })
      );
      return colorId;
    } catch (error) {
      dispatch(
        showSnackbar({
          severity: error.response?.data?.status || "error",
          message: error.response?.data?.message || error.message,
        })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);
export const createColor = createAsyncThunk(
  "create/color",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.post(
        `${productDataUrl}/create-color`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(
        showSnackbar({
          severity: response.data.status,
          message: response.data.message,
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        showSnackbar({
          severity: error.response?.data?.status || "error",
          message: error.response?.data?.message || error.message,
        })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getAllColors = createAsyncThunk(
  "color/getAllColors",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`${productDataUrl}/getAll-color`);

      return response.data;
    } catch (error) {
      dispatch(
        showSnackbar({
          severity: error.response?.data?.status || "error",
          message: error.response?.data?.message || error.message,
        })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

// All Function of Ctaegory

export const updatrActaegory = createAsyncThunk(
  "category/upadte",
  async (data, { getState, rejectWithValue, dispatch }) => {
    try {
      const token = getState().auth.token;
      const formData = new FormData();
      formData.append("categoryId", data.categoryId);
      formData.append("categoryName", data.categoryName);
      formData.append("subCategory", data.subCategory);
      if (data.catPic) {
        formData.append("catPic", data.catPic);
      }
      const response = await axios.post(
        `${productDataUrl}/update-category`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(
        showSnackbar({
          severity: response.data.status,
          message: response.data.message,
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        showSnackbar({
          severity: error.response?.data?.status || "error",
          message: error.response?.data?.message || error.message,
        })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);
export const deleteACategory = createAsyncThunk(
  "category/delete",
  async (categoryId, { dispatch, getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.delete(`${productDataUrl}/delete-category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { categoryId },
      });
      dispatch(
        showSnackbar({
          severity: response.data.status,
          message: response.data.message,
        })
      );
      return categoryId;
    } catch (error) {
      dispatch(
        showSnackbar({
          severity: error.response?.data?.status || "error",
          message: error.response?.data?.message || error.message,
        })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getAllCategory = createAsyncThunk(
  "category/getAll",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`${productDataUrl}/getAll-category`);

      dispatch(
        showSnackbar({
          severity: response.data.status,
          message: response.data.message,
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        showSnackbar({
          severity: error.response?.data?.status || "error",
          message: error.response?.data?.message || error.message,
        })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);
export const createNewCategory = createAsyncThunk(
  "category/create",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const formData = new FormData();
      formData.append("categoryName", data.categoryName);
      formData.append("subCategory", data.subCategory);
      if (data.catPic) {
        formData.append("catPic", data.catPic);
      }
      const response = await axios.post(
        `${productDataUrl}/create-category`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(
        showSnackbar({
          severity: response.data.status,
          message: response.data.message,
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        showSnackbar({
          severity: error.response?.data?.status || "error",
          message: error.response?.data?.message || error.message,
        })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

// All Function of Brands
export const createNewBrand = createAsyncThunk(
  "brand/create",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.brandlogo) {
        formData.append("brandlogo", data.brandlogo);
      }
      const response = await axios.post(
        `${productDataUrl}/create-brand`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(
        showSnackbar({
          severity: response.data.status,
          message: response.data.message,
        })
      );
      return response.data; // Adjust this based on your response structure
    } catch (error) {
      dispatch(
        showSnackbar({
          severity: error.response?.data?.status || "error",
          message: error.response?.data?.message || error.message,
        })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);
export const updateBrand = createAsyncThunk(
  "brand/update",
  async (updatedData, { dispatch, getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const formData = new FormData();
      formData.append("brandId", updatedData.brandId);
      formData.append("title", updatedData.title);
      if (updatedData.brandlogo) {
        formData.append("brandlogo", updatedData.brandlogo);
      }

      const response = await axios.post(
        `${productDataUrl}/update-brand`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(
        showSnackbar({
          severity: response.data.status,
          message: response.data.message,
        })
      );

      return response.data; // Adjust this based on your response structure
    } catch (error) {
      dispatch(
        showSnackbar({
          severity: error.response?.data?.status || "error",
          message: error.response?.data?.message || error.message,
        })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);
export const deleteABrand = createAsyncThunk(
  "/brand/delete",
  async (brandId, { dispatch, rejectWithValue, getState }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.delete(`${productDataUrl}/delete-brand`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { brandId },
      });
      dispatch(
        showSnackbar({
          severity: response.data.status,
          message: response.data.message,
        })
      );
      return brandId;
    } catch (error) {
      dispatch(
        showSnackbar({
          severity: error.response?.data?.status || "error",
          message: error.response?.data?.message || error.message,
        })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getAllBrands = createAsyncThunk(
  "admin/brands",
  async (_, { dispatch, rejectWithValue, getState }) => {
    const token = getState().auth.token; // Assuming your token is stored in auth slice
    try {
      const response = await axios.get(`${productDataUrl}/getAll-brand`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      dispatch(
        showSnackbar({
          severity: error.response?.data?.status,
          message: error.response?.data?.message,
        })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

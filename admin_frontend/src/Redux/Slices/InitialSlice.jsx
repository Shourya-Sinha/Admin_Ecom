import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:{},
    isLoggedIn:false,
    snackbar:{
        open:null,
        severity:null,
        message:null
    }
};

const slice =createSlice({
    name:'app',
    initialState,
    reducers:{
        openSnackBar(state,action){
            console.log(action.payload);
            state.snackbar.open = true;
            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
        },
        closeSnackBar(state){
            state.snackbar.open= false;
            state.snackbar.message = null;
        }
    }
});

export default slice.reducer;

export const showSnackbar =
  ({ severity, message }) =>
  async (dispatch, getState) => {
    dispatch(
      slice.actions.openSnackBar({
        message,
        severity,
      })
    );

    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar());
    }, 4000);
  };



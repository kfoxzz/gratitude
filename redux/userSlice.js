import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserAPI, signInUserAPI } from '../config/users';

export const createUser = createAsyncThunk(
  'user/create',
  async (userData, thunkAPI) => {
    try {
      await createUserAPI(userData);
      return userData;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  'user/login',
  async (credentials, thunkAPI) => {
    try {
      await signInUserAPI(credentials);
      return credentials;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    phone: '',
    signedIn: false
  },
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    remove: state => {
      return state;
    },
    signOut: state => {
      state.signedIn = false;
    },
    signInState: state => {
      state.signedIn = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.email = payload.email;
        state.phone = payload.phone;
        state.signedIn = true;
      })
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        state.email = payload.email;
        state.signedIn = true;
      })
    }
});

// Action creators are generated for each case reducer function
export const { updateName, updateEmail, remove, signOut, signInState } = userSlice.actions;

export default userSlice.reducer;
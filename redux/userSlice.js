import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserAPI, signInUserAPI, addEntryAPI, fetchEntriesAPI, deleteEntryAPI } from '../config/users';
import { consecutiveDates } from '../components/helperFunctions/consecutiveEntries';

export const createUser = createAsyncThunk(
  'user/create',
  async (userData, thunkAPI) => {
    try {
      const userDetails = await createUserAPI(userData);
      return userDetails;
      // thunkAPI.dispatch(someAction()) to call existing action in reducer
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  'user/login',
  async (credentials, thunkAPI) => {
    try {
      await thunkAPI.dispatch(userSlice.actions.loading(true));
      const userDetails = await signInUserAPI(credentials);
      const fetchAllEntries = await thunkAPI.dispatch(fetchEntriesAsync(userDetails.uid));
      await thunkAPI.dispatch(userSlice.actions.loginError(null));
      await thunkAPI.dispatch(userSlice.actions.loading(false));
      return userDetails;
    } catch (error) {
      console.log(error.message);
      thunkAPI.dispatch(userSlice.actions.loginError('No account found with email/password combination.'));
    }
  }
);

export const addEntryAsync = createAsyncThunk(
  'entry/add',
  async (entryData, thunkAPI) => {
    try {
      await addEntryAPI(entryData);
    } catch (error) {
      console.log(error.message);
    }
  }
)

export const deleteEntryAsync = createAsyncThunk(
  'entry/delete',
  async (entryId, uid, thunkAPI) => {
    try {
      await deleteEntryAPI(entryId);
      await thunkAPI.dispatch(fetchEntriesAsync(uid));
    } catch (error) {
      console.log(error.message);
    }
  }
)

export const fetchEntriesAsync = createAsyncThunk(
  'entries/fetch',
  async (uid, thunkAPI) => {
    try {
      const entries = await fetchEntriesAPI(uid);
      await thunkAPI.dispatch(userSlice.actions.addEntry(entries.reverse()));
    } catch (error) {
      console.log(error.message);
    }
  }
)

export const calculateConsecutiveEntries = createAsyncThunk(
  'entries/total',
  async (dateArray, thunkAPI) => {
    try {
      const entries = await consecutiveDates(dateArray);
      console.log(entries);
      thunkAPI.dispatch(userSlice.actions.consecutiveEntries(entries));
    } catch(error) {
      console.log('Error:', error.message)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      uid: '',
      email: '',
      name: '',
      signedIn: false,
      loginError: null,
      consecutiveEntries: '',
      totalEntries: '',
      loading: false,
    },
    entries: [],
  },
  reducers: {
    updateName: (state, action) => {
      state.user.name = action.payload;
    },
    updateEmail: (state, action) => {
      state.user.email = action.payload;
    },
    remove: state => {
      return state;
    },
    signOut: state => {
      state.user.signedIn = false;
    },
    signInState: state => {
      state.user.signedIn = true;
    },
    addEntry: (state, action) => {
      state.entries = action.payload;
    },
    totalEntries: (state) => {
      state.user.totalEntries = state.entries.length;
    },
    consecutiveEntries: (state, action) => {
      state.user.consecutiveEntries = action.payload;
    },
    loginError:(state, action) => {
      state.user.loginError = action.payload;
    },
    loading: (state, action) => {
      state.user.loading = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.user.uid = payload.uid;
        state.user.name = payload.name;
        state.user.email = payload.email;
        state.user.signedIn = true;
      })
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        state.user.uid = payload.uid;
        state.user.email = payload.email;
        state.user.name = payload.name;
        state.user.signedIn = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { updateName, updateEmail, remove, signOut, signInState, totalEntries } = userSlice.actions;

export default userSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserAPI,
  signInUserAPI,
  addEntryAPI,
  fetchEntriesAPI,
  deleteEntryAPI,
  resetPassword,
  updateEmailAPI,
  setDisplayName,
  reauthenticateUser,
} from '../config/users';
import { consecutiveDates } from '../helperFunctions/consecutiveEntries';
import { sortEntries } from '../helperFunctions/sortEntries';

// USERS

export const createUser = createAsyncThunk(
  'user/create',
  async (userData, thunkAPI) => {
    try {
      await thunkAPI.dispatch(userSlice.actions.loading(true));
      const userDetails = await createUserAPI(userData);
      await thunkAPI.dispatch(userSlice.actions.loading(false));
      return userDetails;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  'user/login',
  async (credentials, thunkAPI) => {
    try {
      const userDetails = await signInUserAPI(credentials);
      await thunkAPI.dispatch(userSlice.actions.loading(true));
      const fetchAllEntries = await thunkAPI.dispatch(
        fetchEntriesAsync(userDetails.uid)
      );
      await thunkAPI.dispatch(userSlice.actions.loginError(null));
      await thunkAPI.dispatch(userSlice.actions.loading(false));
      return userDetails;
    } catch (error) {
      console.log(error.message);
      thunkAPI.dispatch(
        userSlice.actions.loginError(
          'No account found with email/password combination.'
        )
      );
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  'user/resetPassword',
  async (email, thunkAPI) => {
    try {
      await resetPassword(email);
    } catch (error) {
      console.log(error.code, error.message);
    }
  }
);

export const reauthenticateUserAsync = createAsyncThunk(
  'user/reauthenticate',
  async ({ email, password }, thunkAPI) => {
    try {
      await reauthenticateUser(email, password);
      await thunkAPI.dispatch(userSlice.actions.loginError(null));
      await thunkAPI.dispatch(userSlice.actions.authenticated(true));
    } catch (error) {
      console.log(error.message);
      thunkAPI.dispatch(userSlice.actions.loginError('Password is incorrect'));
      thunkAPI.dispatch(userSlice.actions.authenticated(false));
    }
  }
);

export const updateEmailAsync = createAsyncThunk(
  'user/updateEmail',
  async (email, thunkAPI) => {
    try {
      await updateEmailAPI(email);
      await thunkAPI.dispatch(userSlice.actions.updateEmail(email));
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateDisplayNameAsync = createAsyncThunk(
  'user/updateName',
  async (displayName, thunkAPI) => {
    try {
      const newName = await setDisplayName(displayName);
      thunkAPI.dispatch(userSlice.actions.updateName(newName));
    } catch (error) {
      console.log(error.message);
    }
  }
);

// ENTRIES

export const addEntryAsync = createAsyncThunk(
  'entry/add',
  async (entryData, thunkAPI) => {
    try {
      await addEntryAPI(entryData);
      const entries = await (
        await thunkAPI.dispatch(fetchEntriesAsync(entryData.uid))
      ).payload;
      const dateArray = await entries.map(entry => entry.date);
      const consecEntries = await thunkAPI.dispatch(
        calculateConsecutiveEntries(dateArray)
      );
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const deleteEntryAsync = createAsyncThunk(
  'entry/delete',
  async ({ entryId, uid }, thunkAPI) => {
    try {
      await deleteEntryAPI(entryId);
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const fetchEntriesAsync = createAsyncThunk(
  'entries/fetch',
  async (uid, thunkAPI) => {
    try {
      const entries = await fetchEntriesAPI(uid);
      const sortedEntries = await sortEntries(entries);
      const updateSortedEntries = await thunkAPI.dispatch(
        userSlice.actions.addEntry(sortedEntries)
      );
      const dateArray = await sortedEntries.map(entry => entry.date);
      thunkAPI.dispatch(calculateConsecutiveEntries(dateArray));
      return sortedEntries;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const calculateConsecutiveEntries = createAsyncThunk(
  'entries/total',
  async (dateArray, thunkAPI) => {
    try {
      const entries = await consecutiveDates(dateArray);
      thunkAPI.dispatch(userSlice.actions.consecutiveEntries(entries));
    } catch (error) {
      console.log('Error:', error.message);
    }
  }
);

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
      loading: false,
      authenticated: false,
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
    signOut: state => {
      state.user.signedIn = false;
    },
    signInState: state => {
      state.user.signedIn = true;
    },
    addEntry: (state, action) => {
      state.entries = action.payload;
    },
    consecutiveEntries: (state, action) => {
      state.user.consecutiveEntries = action.payload;
    },
    loginError: (state, action) => {
      state.user.loginError = action.payload;
    },
    loading: (state, action) => {
      state.user.loading = action.payload;
    },
    authenticated: (state, action) => {
      state.user.authenticated = action.payload;
    },
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
export const {
  updateName,
  updateEmail,
  remove,
  signOut,
  signInState,
  loginError,
  authenticated,
} = userSlice.actions;

export default userSlice.reducer;

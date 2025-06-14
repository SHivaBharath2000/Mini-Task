import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://reqres.in/api/users";

const initialState = {
  users: [],
  updated:{},
  pages:0,
  status: "idle",
  error: null,
};

// Fetch the user
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (no) => {
  const response = await axios.get(`https://reqres.in/api/users?page=${no}`, {
    headers: {
      "x-api-key": "reqres-free-v1",
    },
  });

  return response.data;
});

//Create the user
export const createUser = createAsyncThunk(
  "users/createUser",
  async (newUser) => {
    const res = await axios.post(URL, newUser, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });
    return res.data;
  }
);
//Delete the user
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  const res = await axios.delete(`https://reqres.in/api/users/${id}`, {
    headers: {
      "x-api-key": "reqres-free-v1",
    },
  });
  return id;
});

// Update the user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updates }) => {
    await axios.put(`https://reqres.in/api/users/${id}`, updates, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });
    return { id, ...updates };
  }
);

// Slice
export const Slice = createSlice({
  name: "users",
  initialState,

  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pages=action.payload.total_pages
        state.users = action.payload.data.map((user) => ({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar: user.avatar,
        }));
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
         
        }
         state.updated = action.payload;
      });
  },
});

//Thunk operations exports
export const getAllUsers = (state) => state.users.users;
export const total_pages=(state)=>state.users.pages
export const updatedUser = (state) => state.users.updated;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;

//Actions exports
export const { extraReducers } = Slice.actions;
export default Slice.reducer;

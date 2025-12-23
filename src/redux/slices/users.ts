// import { db } from "@/app/firebase/firebase.con";
// import { User } from "@/app/type";
// import { Hos, Hospitalpital } from "@/app/type";
// import { User } from "@/app/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types";
// const BASE_API_URL = "http://localhost:8000/users";
const API_BASE_URL = "https://69456211ed253f51719b32b0.mockapi.io";
// import { type User } from "../types";

export type State = {
  users: User[];
  isLoading: boolean;
  error: null | string;
  isEditingId: null | User;
};
const initialState: State = {
  users: [],
  isLoading: true,
  error: null,
  isEditingId: null,
};

const useReducer1 = createSlice({
  name: "users",
  initialState,
  reducers: {
    setEditingHos: (state, action) => {
      state.isEditingId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((c) => c.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isEditingId = null;
        const index = state.users.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data as User[];
  } catch (e) {
    console.error("Error fetching users: ", e);
    throw e;
  }
});

export const addUser = createAsyncThunk(
  "users/addUser",
  async (hospital: User) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hospital),
      });

      if (!response.ok) {
        throw new Error("Failed to add hospital");
      }

      const data = await response.json();
      return data as User;
    } catch (e) {
      console.error("Error adding hospital: ", e);
      throw e;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete hospital");
      }

      return id;
    } catch (e) {
      console.error("Error deleting hospital: ", e);
      throw e;
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, userObj }: { id: string; userObj: Omit<User, "id"> }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
      });

      if (!response.ok) {
        throw new Error("Failed to update hospital");
      }

      const data = await response.json();
      return data as User;
    } catch (e) {
      console.error("Error updating hospital: ", e);
      throw e;
    }
  }
);

export default useReducer1.reducer;

export const { setEditingHos } = useReducer1.actions;

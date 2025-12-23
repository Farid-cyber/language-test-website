import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Test } from "../../types";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.con";
export type State = {
  tests: Test[];
  isLoading: boolean;
  error: null | string;
  isEdidingId: null | Test;
};

const initialState: State = {
  tests: [],
  isLoading: true,
  error: null,
  isEdidingId: null,
};
const userReducer2 = createSlice({
  name: "tests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tests = action.payload;
      })
      .addCase(fetchTests.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed";
      })
      .addCase(addTests.fulfilled, (state, action) => {
        state.tests.push(action.payload);
      });
  },
});

export const fetchTests = createAsyncThunk(
  "tests/fetchTests",
  async () => {
    const snapshot = await getDocs(collection(db, "tests"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Test[];
    return data;
  }
);

export const addTests = createAsyncThunk(
  "tests/addTests",
  async (categoryObject: Test) => {
    console.log("Adding category:", categoryObject);
    try {
      const docRef = await addDoc(collection(db, "tests"), categoryObject);
      return { ...categoryObject, id: docRef.id };
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  }
);

export default userReducer2.reducer;

// export const

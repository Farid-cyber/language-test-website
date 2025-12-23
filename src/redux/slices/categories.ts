import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Category } from "../../types";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.con";
export type State = {
  categories: Category[];
  isLoading: boolean;
  error: null | string;
  isEdidingId: null | Category;
};

const initialState: State = {
  categories: [],
  isLoading: true,
  error: null,
  isEdidingId: null,
};
const userReducer2 = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      });
  },
});

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const snapshot = await getDocs(collection(db, "categories"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Category[];
    return data;
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryObject: Category) => {
    console.log("Adding category:", categoryObject);
    try {
      const docRef = await addDoc(collection(db, "categories"), categoryObject);
      return { ...categoryObject, id: docRef.id };
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  }
);

export default userReducer2.reducer;

// export const

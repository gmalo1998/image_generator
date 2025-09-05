// src/store/pagesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pages: [{ id: 1, content: "" }],
  activePage: 0,
  pagecolor: "#ffffff", 
};

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    addPage: (state) => {
      state.pages.push({ id: state.pages.length + 1, content: "" });
      state.activePage = state.pages.length - 1;
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    updatePageContent: (state, action) => {
      const { index, content } = action.payload;
      if (state.pages[index]) {
        state.pages[index].content = content;
      }
    },
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    deletePage: (state, action) => {
  const index = action.payload;
  if (state.pages.length > 1) {
    state.pages.splice(index, 1); // remove page
    // adjust activePage if necessary
    if (state.activePage >= state.pages.length) {
      state.activePage = state.pages.length - 1;
    }
  } else {
    // keep at least 1 page
    state.pages[0].content = "";
  }
},
setPageColor: (state, action) => {
      state.pagecolor = action.payload; // ✅ update background color
    },
  },
});

export const { addPage, setActivePage, updatePageContent, setPages,deletePage,setPageColor } = pagesSlice.actions;
export default pagesSlice.reducer;


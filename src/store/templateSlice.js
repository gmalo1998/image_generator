// store/templateSlice.js
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  selectedTemplate: null,
};
const templateConfig = {
        template1: { forebackground: "#ff00ff", pagecolor: "#ffffff" },
        template2: { forebackground: "#222", pagecolor: "#6b6b6b" },
        template3: { forebackground: "#00ff99", pagecolor: "#ffffff" },
      };

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setTemplate: (state, action) => {
      
      state.name = action.payload;
      if (templateConfig[action.payload]) {
        console.log('from redux',state);
        state.forebackground = templateConfig[action.payload].forebackground;
        state.pagecolor = templateConfig[action.payload].pagecolor;
      }
    },
  },
});

export const { setTemplate } = templateSlice.actions;
export const getTemplateConfig = (name) => templateConfig[name];
export default templateSlice.reducer;

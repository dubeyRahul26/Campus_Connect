import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobsReducer from "./jobsSlice";
import applicationsReducer  from "./applicationsSlice";
import jobApplicantsReducer from "./jobApplicantsSlice";
import adminReducer from "./adminSlice";
import prepReducer from "./interviewPrepSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    applications: applicationsReducer,
    jobApplicants: jobApplicantsReducer,
    admin: adminReducer,
    prep:prepReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

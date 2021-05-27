/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { action, createStore, persist } from 'easy-peasy';
import { original } from 'immer';

const store = createStore(
  persist({
    // Initial State
    auth: {
      user: { isVerified: false },
      token: '',
    },
    events: [],

    // Auth actions
    storeUserData: action((state, payload) => {
      state.auth = { ...state.auth, ...payload };
    }),

    logOut: action((state) => {
      state.auth = {};
      state.events = [];
    }),

    // Events actions
    storeEvents: action((state, payload) => {
      state.events = payload;
    }),

    // updateApplication: action((state, payload) => {
    //   const applicationsList = original(state.applications);
    //   const appIndex = applicationsList.findIndex(
    //     (application) => application._id === payload.data._id,
    //   );
    //   applicationsList[appIndex] = payload.data;
    //   state.applications = applicationsList;
    // }),
  },
  {
    deny: [], // Use this to prevent persist for listed varibales
    storage: localStorage,
  }),
);

export default store;

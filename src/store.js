import { configureStore } from "@reduxjs/toolkit"

import {ProductApi} from "./API/Product"
export const store = configureStore({
    reducer: {
    // Add the generated reducer as a specific top-level slice
    [ProductApi.reducerPath]: ProductApi.reducer,
    },
     // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware({serializableCheck:false}).concat(ProductApi.middleware),
  });
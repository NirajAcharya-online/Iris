import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase/firebaseSetup";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      async queryFn() {
        try {
          const snap = await getDocs(collection(database, "products"));

          const data = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          return { data };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message,
            },
          };
        }
      },
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;

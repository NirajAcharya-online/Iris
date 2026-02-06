import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase/firebaseSetup";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getProducts: builder.query({
      async queryFn() {
        try {
          const snap = await getDocs(collection(database, "products"));
          const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          return { data };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;

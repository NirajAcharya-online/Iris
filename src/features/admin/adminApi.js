import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { database } from "../../firebase/firebaseSetup";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Products"],

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      async queryFn() {
        try {
          const snap = await getDocs(collection(database, "products"));
          const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          return { data };
        } catch (e) {
          return { error: e };
        }
      },
      providesTags: ["Products"],
    }),

    createProduct: builder.mutation({
      async queryFn(product) {
        try {
          const ref = await addDoc(collection(database, "products"), product);
          return { data: { id: ref.id, ...product } };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      async queryFn({ id, ...data }) {
        try {
          await updateDoc(doc(database, "products", id), data);
          return { data: { id, ...data } };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(database, "products", id));
          return { data: id };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = adminApi;

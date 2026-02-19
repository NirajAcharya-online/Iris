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
  tagTypes: ["Products", "Users", "Orders"],

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      async queryFn() {
        try {
          const snap = await getDocs(collection(database, "products"));
          const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          return { data };
        } catch (e) {
          return { error: e.message };
        }
      },
      providesTags: ["Products"],
    }),

    getAllUsers: builder.query({
      async queryFn() {
        try {
          const usersCol = collection(database, "users");
          const snapshot = await getDocs(usersCol);
          const users = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              ...data,
              id: doc.id,
              createdAt: data.createdAt?.toDate?.()
                ? data.createdAt.toDate().toISOString()
                : data.createdAt,
            };
          });
          return { data: users };
        } catch (e) {
          return { error: e.message };
        }
      },
      providesTags: ["Users"],
    }),
    getAllOrders: builder.query({
      async queryFn() {
        try {
          const snap = await getDocs(collection(database, "orders"));
          const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          return { data };
        } catch (e) {
          return { error: e.message };
        }
      },
      providesTags: ["Orders"],
    }),

    createProduct: builder.mutation({
      async queryFn(product) {
        try {
          const { id, ...dataToSave } = product;
          const ref = await addDoc(
            collection(database, "products"),
            dataToSave,
          );
          return { data: { id: ref.id, ...product } };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      async queryFn({ id, ...data }) {
        try {
          await updateDoc(doc(database, "products", String(id)), data);
          return { data: { id, ...data } };
        } catch (e) {
          return { error: e.message };
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
          return { error: e.message };
        }
      },
      invalidatesTags: ["Products"],
    }),
    updateOrderStatus: builder.mutation({
      async queryFn({ id, status }) {
        try {
          await updateDoc(doc(database, "orders", id), { status });
          return { data: { id, status } };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: ["Orders"],
    }),
    deleteUser: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(database, "users", id));
          return { data: id };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllUsersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteUserMutation,
} = adminApi;

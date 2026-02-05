import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query";

const productApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fakeBaseQuery(),
  endpoints
});

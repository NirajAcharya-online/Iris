import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "./adminApi";
import Button from "../../components/ui/Button";

function ProductsAdmin() {
  const { data, isLoading } = useGetAllProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      price: "",
      category: "frame",
      rating: "",
      image: "",
      stock: "",
    },
  });

  const editId = watch("id");

  const onSubmit = async (formData) => {
    if (formData.id) {
      await updateProduct(formData);
    } else {
      await createProduct({ ...formData, price: Number(formData.price) });
    }
    reset({
      name: "",
      price: "",
      category: "frame",
      rating: "",
      image: "",
      stock: "",
    });
  };

  const handleEdit = (product) => {
    reset(product);
  };

  if (isLoading) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Products Manager</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 bg-gray-50 p-6 rounded-lg border border-gray-200"
      >
        <input
          {...register("name", { required: true })}
          placeholder="Name"
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          {...register("price", { required: true })}
          placeholder="Price"
          type="number"
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          {...register("image")}
          placeholder="Image URL"
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          {...register("rating")}
          placeholder="Rating"
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          {...register("stock")}
          placeholder="Stock"
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          {...register("category")}
          className="p-2 border rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="frame">Frame</option>
          <option value="sunglasses">Sunglasses</option>
          <option value="sport">Sport</option>
        </select>

        <div className="md:col-span-3 flex gap-2">
          <Button
            variant="none"
            size="none"
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {editId ? "Update Product" : "Create Product"}
          </Button>
          {editId && (
            <Button
              variant="none"
              size="none"
              type="button"
              onClick={() =>
                reset({
                  title: "",
                  price: "",
                  category: "frame",
                  rating: "",
                  image: "",
                  stock: "",
                })
              }
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 font-semibold text-gray-700 border-b">
                Title
              </th>
              <th className="p-4 font-semibold text-gray-700 border-b">
                Price
              </th>
              <th className="p-4 font-semibold text-gray-700 border-b">Cat</th>
              <th className="p-4 font-semibold text-gray-700 border-b">
                Rating
              </th>
              <th className="p-4 font-semibold text-gray-700 border-b">
                Stock
              </th>
              <th className="p-4 font-semibold text-gray-700 border-b text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                <td className="p-4 border-b">{p.name}</td>
                <td className="p-4 border-b">${p.price}</td>
                <td className="p-4 border-b capitalize text-sm text-gray-600">
                  {p.category}
                </td>
                <td className="p-4 border-b">{p.rating} ⭐</td>
                <td className="p-4 border-b">{p.stock}</td>
                <td className="p-4 border-b text-center space-x-2">
                  <Button
                    variant="primary"
                    onClick={() => handleEdit(p)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => deleteProduct(p.id)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ProductsAdmin;

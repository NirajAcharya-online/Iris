import React from "react";
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

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      name: "", // Use 'name' consistently to match your table and state
      price: "",
      category: "frame",
      rating: "",
      image: "",
      stock: "",
    },
  });

  const editId = watch("id");

  const onSubmit = async (formData) => {
    try {
      // Prepare data (ensure numbers are numbers)
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: Number(formData.rating),
      };

      if (formData.id) {
        await updateProduct(productData).unwrap();
      } else {
        await createProduct(productData).unwrap();
      }

      handleCancel(); // Reset form after success
    } catch (err) {
      alert("Failed to save product: " + err);
    }
  };

  const handleEdit = (product) => {
    reset(product); // Loads all product data (including ID) into form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    reset({
      id: undefined, // Clear the ID so we exit edit mode
      name: "",
      price: "",
      category: "frame",
      rating: "",
      image: "",
      stock: "",
    });
  };

  if (isLoading) return <p className="p-10 text-center">Loading products...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products Manager</h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {data?.length || 0} Products
        </span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-200"
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500 uppercase">
            Product Name
          </label>
          <input
            {...register("name", { required: true })}
            placeholder="e.g. Aviator Classic"
            className="p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500 uppercase">
            Price ($)
          </label>
          <input
            {...register("price", { required: true })}
            type="number"
            step="0.01"
            placeholder="0.00"
            className="p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500 uppercase">
            Category
          </label>
          <select
            {...register("category")}
            className="p-2 border rounded bg-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="frame">Frame</option>
            <option value="sunglasses">Sunglasses</option>
            <option value="sport">Sport</option>
          </select>
        </div>

        <input
          {...register("image")}
          placeholder="Image URL"
          className="p-2 border rounded"
        />
        <input
          {...register("rating")}
          type="number"
          step="0.1"
          placeholder="Rating (0-5)"
          className="p-2 border rounded"
        />
        <input
          {...register("stock")}
          type="number"
          placeholder="Stock Quantity"
          className="p-2 border rounded"
        />

        <div className="md:col-span-3 flex gap-2 mt-2">
          <Button
            type="submit"
            className="bg-blue-600 text-white px-8 py-2 rounded-lg font-bold"
          >
            {editId ? "Update Product" : "Create New Product"}
          </Button>
          {editId && (
            <Button
              type="button"
              onClick={handleCancel}
              className="bg-gray-100 text-gray-600 px-8 py-2 rounded-lg"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">
                Product
              </th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">
                Price
              </th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">
                Stock
              </th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="font-medium text-gray-800">{p.name}</div>
                  <div className="text-xs text-gray-400 capitalize">
                    {p.category}
                  </div>
                </td>
                <td className="p-4 font-semibold text-green-600">${p.price}</td>
                <td className="p-4 text-gray-600">{p.stock} units</td>
                <td className="p-4 text-center space-x-4">
                  <Button
                    variant="none"
                    size="none"
                    onClick={() => handleEdit(p)}
                    className="text-blue-600 hover:text-blue-800 font-bold text-sm"
                  >
                    EDIT
                  </Button>
                  <Button
                    variant="none"
                    size="none"
                    onClick={() =>
                      window.confirm("Delete?") && deleteProduct(p.id)
                    }
                    className="text-red-500 hover:text-red-700 font-bold text-sm"
                  >
                    DELETE
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

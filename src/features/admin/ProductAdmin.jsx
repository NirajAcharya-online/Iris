import React, { useState } from "react";
import {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "./adminApi";
import Button from "../../components/ui/Button";
import ProductForm from "./ProductForm";

function ProductsAdmin() {
  const { data, isLoading } = useGetAllProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [editProductData, setEditProductData] = useState(null);

  const handleProcessSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: Number(formData.rating || 0),
        // Convert strings to arrays to match Firestore structure
        images:
          typeof formData.images === "string"
            ? formData.images.split(",").map((s) => s.trim())
            : formData.images,
        colors:
          typeof formData.colors === "string"
            ? formData.colors.split(",").map((s) => s.trim())
            : formData.colors,
        createdAt: formData.id ? formData.createdAt : Date.now(),
        slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
      };

      if (formData.id) {
        await updateProduct({ ...payload, id: String(formData.id) }).unwrap();
      } else {
        await createProduct(payload).unwrap();
      }
      setEditProductData(null);
    } catch (err) {
      
      ("Error: " + err);
    }
  };

  if (isLoading)
    return (
      <p className="p-10 text-center text-gray-500">Loading products...</p>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products Manager</h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {data?.length || 0} Products
        </span>
      </div>

      <ProductForm
        onSubmit={handleProcessSubmit}
        editData={editProductData}
        onCancel={() => setEditProductData(null)}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">
                Product
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
                  <div className="text-xs text-gray-400 font-mono">
                    ${p.price}
                  </div>
                </td>
                <td className="p-4 text-center space-x-4">
                  <button
                    onClick={() => {
                      setEditProductData(p);
                      window.scrollTo(0, 0);
                    }}
                    className="text-blue-600 font-bold text-sm"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() =>
                      window.confirm("Delete?") && deleteProduct(p.id)
                    }
                    className="text-red-500 font-bold text-sm"
                  >
                    DELETE
                  </button>
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

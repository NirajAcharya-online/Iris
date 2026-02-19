import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/ui/Button";

function ProductForm({ onSubmit, editData, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "Frames",
      brand: "UrbanOptics",
      badge: "Budget",
      material: "Plastic",
      shape: "Rectangle",
      tryOnAvailable: true,
      rating: 0,
      reviews: 0,
    },
  });

  useEffect(() => {
    if (editData) {
      reset({
        ...editData,
        images: Array.isArray(editData.images)
          ? editData.images.join(", ")
          : "",
        colors: Array.isArray(editData.colors)
          ? editData.colors.join(", ")
          : "",
      });
    } else {
      reset({
        id: undefined,
        name: "",
        price: "",
        stock: "",
        rating: 0,
        brand: "UrbanOptics",
        material: "Plastic",
        images: "",
        colors: "",
      });
    }
  }, [editData, reset]);

  const inputClass = (name) =>
    `p-2 border rounded outline-none focus:ring-2 ${
      errors[name]
        ? "border-red-500 focus:ring-red-200"
        : "border-gray-300 focus:ring-blue-500"
    }`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3 mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-200"
    >
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-gray-500 uppercase">
          Product Name
        </label>
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="UrbanOptics Reader"
          className={inputClass("name")}
        />
        {errors.name && (
          <span className="text-[10px] text-red-500">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-gray-500 uppercase">
          Brand
        </label>
        <input
          {...register("brand", { required: "Brand is required" })}
          className={inputClass("brand")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-gray-500 uppercase">
          Price ($)
        </label>
        <input
          type="number"
          step="0.01"
          {...register("price", { required: "Required" })}
          className={inputClass("price")}
        />
        {errors.price && (
          <span className="text-[10px] text-red-500">
            {errors.price.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-gray-500 uppercase">
          Category
        </label>
        <select {...register("category")} className={inputClass("category")}>
          <option value="Frames">Frames</option>
          <option value="Sunglasses">Sunglasses</option>
          <option value="Reading">Reading</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-gray-500 uppercase">
          Badge
        </label>
        <input
          {...register("badge")}
          placeholder="Budget, New, etc."
          className={inputClass("badge")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-gray-500 uppercase">
          Material
        </label>
        <input
          {...register("material")}
          placeholder="Plastic, Metal"
          className={inputClass("material")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-gray-500 uppercase">
          Shape
        </label>
        <input
          {...register("shape")}
          placeholder="Rectangle, Oval"
          className={inputClass("shape")}
        />
      </div>

      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-[10px] font-bold text-gray-500 uppercase">
          Images (Comma separated URLs)
        </label>
        <input
          {...register("images", {
            required: "At least one image URL is required",
          })}
          className={inputClass("images")}
        />
        {errors.images && (
          <span className="text-[10px] text-red-500">
            {errors.images.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-gray-500 uppercase">
          Colors (Hex codes, comma separated)
        </label>
        <input
          {...register("colors")}
          placeholder="#000000, #ffffff"
          className={inputClass("colors")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-gray-500 uppercase">
          Stock Units
        </label>
        <input
          type="number"
          {...register("stock", { required: "Required" })}
          className={inputClass("stock")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-gray-500 uppercase">
          Rating / Reviews
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            step="0.1"
            {...register("rating")}
            placeholder="4.5"
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="number"
            {...register("reviews")}
            placeholder="210"
            className="w-1/2 p-2 border rounded"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 px-2">
        <input
          type="checkbox"
          id="tryOn"
          {...register("tryOnAvailable")}
          className="w-4 h-4"
        />
        <label
          htmlFor="tryOn"
          className="text-sm font-medium text-gray-700 cursor-pointer"
        >
          Try On Available
        </label>
      </div>

      <div className="md:col-span-3 flex gap-2 mt-4 pt-4 border-t border-gray-100">
        <Button
          type="submit"
          className="bg-blue-600 text-white px-10 py-2 rounded-lg font-bold shadow-md hover:bg-blue-700 transition-colors"
        >
          {editData?.id ? "UPDATE PRODUCT" : "SAVE NEW PRODUCT"}
        </Button>
        {editData?.id && (
          <Button
            type="button"
            onClick={onCancel}
            className="bg-gray-100 text-gray-600 px-8 py-2 rounded-lg"
          >
            CANCEL
          </Button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;

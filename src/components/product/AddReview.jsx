import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { addReview } from "../../firebase/firebaseDB";
import { useDispatch, useSelector } from "react-redux";
import notify from "../ui/Notify";
import { addReviewToState } from "../../store/reviewSlice";

function AddReview({ productId }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 0,
      reviewText: "",
    },
  });
  const userDetails = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    if (userDetails.uid === null) {
      notify.warning("Login Required", "Please login to post a review");
      return;
    }

    const result = await addReview(productId, data, userDetails);

    if (result.success) {
      notify.success("Review Posted!");
      dispatch(addReviewToState(result.newReview));
      reset();
    } else {
      notify.error("Failed to post review", result.message);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold mb-6">Write a Review</h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-50 p-6 rounded-2xl"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Rating
          </label>
          <Controller
            control={control}
            name="rating"
            rules={{ validate: (v) => v > 0 || "Please select a rating" }}
            render={({ field: { onChange, value } }) => (
              <Rating
                style={{ maxWidth: 120 }}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors.rating && (
            <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Review
          </label>
          <textarea
            {...register("reviewText", {
              required: "Review text is required",
              minLength: { value: 5, message: "Review is too short" },
            })}
            className={`w-full p-3 rounded-xl border transition-all ${
              errors.reviewText
                ? "border-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-black"
            }`}
            placeholder="What did you like or dislike?"
            rows="4"
          />
          {errors.reviewText && (
            <p className="text-red-500 text-xs mt-1">
              {errors.reviewText.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
        >
          Post Review
        </button>
      </form>
    </div>
  );
}

export default AddReview;

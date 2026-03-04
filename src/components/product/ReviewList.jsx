import React from "react";
import { Rating } from "@smastrom/react-rating";
import { UserCircle } from "lucide-react";

const ReviewList = ({ reviewsData = [] }) => {
  if (reviewsData.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-xl mt-6">
        <p className="text-gray-500 italic">
          No reviews yet. Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-xl font-bold text-gray-800">
        Customer Reviews ({reviewsData.length})
      </h3>

      <div className="grid gap-4">
        {reviewsData.map((rev, index) => (
          <div
            key={index}
            className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <UserCircle className="text-gray-400" size={32} />
                <div>
                  <p className="font-semibold text-sm">
                    {rev.userName || "Anonymous"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {rev.date || "Recently"}
                  </p>
                </div>
              </div>
              <Rating style={{ maxWidth: 70 }} value={rev.rating} readOnly />
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {rev.comment || rev.reviewText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;

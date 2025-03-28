import { Star } from "lucide-react";
import { useState } from "react";

export const StarRating = ({
  totalStars = 5,
  selectedRating,
  onRatingChange,
  interactive = true,
  size = 20,
}: {
  totalStars?: number;
  selectedRating: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  size?: number;
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-2">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button"
            key={starValue}
            className={`${interactive ? "cursor-pointer" : "cursor-default"} p-0 border-none bg-transparent`}
            onClick={() =>
              interactive && onRatingChange && onRatingChange(starValue)
            }
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            disabled={!interactive}
          >
            <Star
              size={size}
              className={`${
                starValue <=
                (interactive ? hoverRating || selectedRating : selectedRating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              } transition-colors`}
            />
          </button>
        );
      })}
    </div>
  );
};

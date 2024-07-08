export const getAggregateRating = (ratings) => {
  if (!ratings) {
    return ratings;
  }

  let averageRating = 0;

  ratings.forEach((review) => {
    averageRating += review.rating;
  });

  averageRating = averageRating / ratings.length;

  return {
    ratingValue: `${averageRating}`,
    reviewCount: `${ratings.length}`,
  };
};

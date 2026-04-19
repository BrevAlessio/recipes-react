export type Recommendation = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type HistoryItem = Recommendation & {
  isPositive: boolean;
  createdAt: Date;
  inputs: {
    area: string;
    ingredient: string;
  };
};

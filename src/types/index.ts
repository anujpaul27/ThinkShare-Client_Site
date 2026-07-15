export interface Idea {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  imageUrl: string;
  estimatedBudget?: string;
  problemStatement: string;
  proposedSolution: string;
  detailedDescription?: string;
  targetAudience?: string;
  tags: string[] | string;
  author_id?: string;
}

export interface Comment {
  _id?: string;
  userID?: string;
  postID?: string;
  name: string;
  imageURL?: string;
  time: string;
  text: string;
}

export interface ApiResponse<T> {
  data: T;
  success?: boolean;
  message?: string;
  results?: T;
}

export type FormValues = Record<string, string>;

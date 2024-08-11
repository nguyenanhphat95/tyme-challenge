import { http } from "shared/http";

export type IItem = {
  name: string;
  price: number;
  creator: string;
  category: string;
  created_at: string;
  thumbnail: string;
};

export type ICategoryItem = {
  label: string;
  value: string;
};

type IListItemResponse = {
  items: IItem[];
  categories: ICategoryItem[];
};

export async function getListProductApi() {
  return http.get<IListItemResponse>("/data/data.json", { baseUrl: "" });
}

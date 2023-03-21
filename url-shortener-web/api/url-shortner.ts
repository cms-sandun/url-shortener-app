import { AxiosError } from "axios";
import UrlEntiryProps from "../types/url-entity.type";
import { axiosInstance } from "../utils/axios";

export const shortenUrl = async (url: string) => {
  try {
    const { data } = await axiosInstance.post<UrlEntiryProps>("/", {
      url,
    });
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
};

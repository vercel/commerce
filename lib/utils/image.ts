import { ImageSource } from "../store/types";

export const getImageUrl = (source: ImageSource): string => {
  if (source.type === "remote") {
    return source.url;
  }
  return source.path;
};

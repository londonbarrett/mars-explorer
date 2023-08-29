import { Photo } from "@/types";

export const getLatestPhotos = async (): Promise<Photo[]> => {
  const response = await fetch(
    "https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/latest_photos?api_key=Ss0PHYBzSfal9L0xXhzYHOVId9agg0HeGf6BOpBM"
  );
  const data = await response.json();
  return data.latest_photos;
};

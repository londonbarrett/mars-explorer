import { Photo, SearchParams } from "@/types";

export const getLatestPhotos = async (): Promise<Photo[]> => {
  const response = await fetch(
    "https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/latest_photos?api_key=Ss0PHYBzSfal9L0xXhzYHOVId9agg0HeGf6BOpBM",
    { cache: "reload" }
  );
  const data = await response.json();
  return data.latest_photos;
};

export const getQueryPhotos = async ({
  camera,
  date,
  page,
  rover,
}: SearchParams): Promise<Photo[]> => {
  const query = new URLSearchParams({
    camera,
    earth_date: date || "",
    page: page ? page.toString() : "1",
  });
  const url = `https://mars-photos.herokuapp.com/api/v1/rovers/${rover}/photos?earth_date=${date}&camera=${camera}&page=1`;
  const response = await fetch(url);
  const data = await response.json();
  return data.photos;
};

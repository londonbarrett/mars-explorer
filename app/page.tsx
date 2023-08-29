import { getLatestPhotos, getQueryPhotos } from "@/services/mars-rover";
import Gallery from "@/components/gallery";
import Navigation from "@/components/navigation";

type Props = {
  searchParams?: { camera: string; date: string; rover: string };
};

export default async function Home({ searchParams }: Props) {
  const data =
    searchParams?.camera && searchParams.date && searchParams.rover
      ? await getQueryPhotos(searchParams)
      : await getLatestPhotos();
  return (
    <div className="relative">
      <Navigation />
      <main>
        <Gallery data={data} />
      </main>
    </div>
  );
}

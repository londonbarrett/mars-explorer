import { getLatestPhotos } from "@/services/mars-rover";
import Gallery from "@/components/gallery";
import Navigation from "@/components/navigation";

export default async function Home() {
  const data = await getLatestPhotos();
  return (
    <div className="relative">
      <Navigation />
      <main>
        <Gallery data={data} />
      </main>
    </div>
  );
}

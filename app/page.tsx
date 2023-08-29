import Image from "next/image";
import { getLatestPhotos } from "@/services/mars-rover";

export default async function Home() {
  const data = await getLatestPhotos();
  return (
    <main>
      <section>
        <header>
          <h1>Mars Explorer</h1>
        </header>
        <div>
          <ul>
            {data?.map((photo) => (
              <li key={photo.id}>
                <Image
                  alt={`${photo.rover.name} ${photo.camera.name} ${photo.earth_date}`}
                  height={500}
                  src={photo.img_src}
                  width={500}
                  style={{ objectFit: "cover" }}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

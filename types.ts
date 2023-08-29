enum Cameras {
  FHAZ,
  NAVCAM,
  MAST,
  CHEMCAM,
  MAHLI,
  MARDI,
  RHAZ,
}

type Rover = {
  id: 5;
  name: string;
  landing_date: string;
  launch_date: string;
  status: "active";
  max_sol: string;
  max_date: string;
  total_photos: number;
  cameras: [{ name: string; full_name: string }];
};

type Camera = {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
};

export type Photo = {
  id: number;
  sol: number;
  camera: Camera;
  img_src: string;
  earth_date: string;
  rover: Rover;
};

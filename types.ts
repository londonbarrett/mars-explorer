export enum Cameras {
  FHAZ,
  NAVCAM,
  MAST,
  CHEMCAM,
  MAHLI,
  MARDI,
  RHAZ,
}

export type Rover = {
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

export type Camera = {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
};

export type IconProps = {
  className?: string;
  fill?: string;
  height?: number | string;
};

export type Photo = {
  id: number;
  sol: number;
  camera: Camera;
  img_src: string;
  earth_date: string;
  rover: Rover;
};

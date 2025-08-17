export type Destination = {
  id: string;
  title: string;
  slug: string;
  tag: string;
  preview: string;
  textContent1: string;
  textContent2: string;
  mainImg: string;
  destinationImages: string[];
  coordinate: Coordinate;
  location: string;
};

export type Coordinate = {
  lat: string;
  lng: string;
};

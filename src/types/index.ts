import { insertDestinationSchema } from "@/lib/validator";
import { Prisma } from "@prisma/client";
import { z } from "zod";

// TODO: INFER TYPE FROM VALIDATOR
export type Destination = Omit<
  z.infer<typeof insertDestinationSchema>,
  "coordinate"
> & {
  id: string;
  coordinate: Prisma.JsonValue;
};

export type Coordinate = {
  lat: number;
  lng: number;
};

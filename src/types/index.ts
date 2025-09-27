import {
  insertCategorySchema,
  insertCommentSchema,
  insertDestinationSchema,
  insertPostSchema,
} from "@/lib/validator";
import { Prisma } from "@prisma/client";
import { z } from "zod";

// TODO: INFER TYPE FROM VALIDATOR
export type Destination = Omit<
  z.infer<typeof insertDestinationSchema>,
  "coordinate"
> & {
  id: string;
  coordinate: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
};

export type DestinationWithoutCategory = Omit<
  z.infer<typeof insertDestinationSchema>,
  "coordinate"
> & {
  id: string;
  coordinate: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
};

export type Coordinate = {
  lat: number;
  lng: number;
};

export type Post = z.infer<typeof insertPostSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Wishlist = {
  id: string;
  userId: string;
  destinationId: string;
  destination: Destination;
  createdAt: Date;
  updatedAt: Date;
};

export type Comment = z.infer<typeof insertCommentSchema> & {
  id: string;
  user?: { name: string; email: string | null; image: string | null };
  createdAt: Date;
  updatedAt: Date;
};

export type District = {
  id: string;
  regency_id: string;
  name: string;
};

export type Category = z.infer<typeof insertCategorySchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryWithDestination = Category & {
  Destination: { id: string }[] | null;
};

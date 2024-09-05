import { z } from 'zod';
import { ShoppingItemIdSchema } from './shopping-items.service.modele';

export const ShoppingStoreCategorySchema = z.object({
  id: z.string().uuid(),
  label: z.string().min(0).max(255),
  itemsIds: z.array(ShoppingItemIdSchema),
});
export type ShoppingStoreCategory = z.infer<typeof ShoppingStoreCategorySchema>;

export const ShoppingStoreCategoriesSchema = z.array(
  ShoppingStoreCategorySchema
);
export type ShoppingStoreCategories = z.infer<
  typeof ShoppingStoreCategoriesSchema
>;

export const ShoppingStoreSchema = z.object({
  id: z.string().uuid(),
  label: z.string().min(0).max(255),
  categories: ShoppingStoreCategoriesSchema,
});
export type ShoppingStore = z.infer<typeof ShoppingStoreSchema>;

export const ShoppingStoresSchema = z.array(ShoppingStoreSchema);
export type ShoppingStores = z.infer<typeof ShoppingStoresSchema>;

import { z } from 'zod';

export const ShoppingItemIdSchema = z.string().uuid();
export type ShoppingItemId = z.infer<typeof ShoppingItemIdSchema>;

export const ShoppingItemSchema = z.object({
  id: ShoppingItemIdSchema,
  label: z.string().min(0).max(255),
  quantity: z.number().int().min(0),
});
export type ShoppingItem = z.infer<typeof ShoppingItemSchema>;

export const ShoppingItemsSchema = z.array(ShoppingItemSchema);
export type ShoppingItems = z.infer<typeof ShoppingItemsSchema>;

export const ShoppingItemsRecordSchema = z.record(
  ShoppingItemIdSchema,
  ShoppingItemSchema
);
export type ShoppingItemsRecord = z.infer<typeof ShoppingItemsRecordSchema>;

import { z } from 'zod';

export const CreateAlimentacionSchema = z.object({
  type: z.string().min(1, 'type is required'),
  price: z.number().optional(),
  notes: z.string().optional()
});

export const UpdateAlimentacionSchema = CreateAlimentacionSchema.partial();

export type CreateAlimentacion = z.infer<typeof CreateAlimentacionSchema>;
export type UpdateAlimentacion = z.infer<typeof UpdateAlimentacionSchema>;

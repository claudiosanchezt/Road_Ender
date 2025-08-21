import { z } from 'zod';

export const CreateHospedajeSchema = z.object({
  name: z.string().min(1, 'name is required'),
  address: z.string().optional(),
  zone_id: z.number().nullable().optional(),
  guide_id: z.number().nullable().optional(),
  description: z.string().optional(),
  price: z.number().optional()
});

export const UpdateHospedajeSchema = CreateHospedajeSchema.partial();

export type CreateHospedaje = z.infer<typeof CreateHospedajeSchema>;
export type UpdateHospedaje = z.infer<typeof UpdateHospedajeSchema>;

import { z } from 'zod';

const UserCreateSchema = z.object({
    email: z.string().trim().email().toLowerCase(),
    password_hash: z.string().min(1),
    display_name: z.string().trim().min(1).max(200).nullable(),
    is_active: z.boolean(),
});

const UserUpdateSchema = z
    .object({
        email: z.string().trim().email().toLowerCase().optional(),
        display_name: z.string().trim().min(1).max(200).nullable().optional(),
        role_id: z.number().int().positive().nullable().optional(),
    })
    .refine(hasUserUpdateField, { message: 'At least one field is required' });

function hasUserUpdateField(value: {
    email?: string;
    display_name?: string | null;
    role_id?: number | null;
}): boolean {
    return (
        value.email !== undefined ||
        value.display_name !== undefined ||
        value.role_id !== undefined
    );
}

type UserCreateInput = z.infer<typeof UserCreateSchema>;
type UserUpdateInput = z.infer<typeof UserUpdateSchema>;

export { UserCreateSchema, UserUpdateSchema };
export type { UserCreateInput, UserUpdateInput };

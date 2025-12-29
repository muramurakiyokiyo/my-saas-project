import { z } from 'zod';

export const createPetSchema = z.object({
  name: z.string().min(1, '名前は必須です').max(20, '20文字以内で入力してください'),
  tag: z.string().min(1, 'タグは必須です'),
});

// このスキーマから TypeScript の型を自動抽出
export type CreatePetInput = z.infer<typeof createPetSchema>;


import { z } from 'zod';

// スキーマを生成する関数（多言語対応）
export function createPetSchema(messages: {
  nameRequired: string;
  nameMaxLength: string;
  tagRequired: string;
}) {
  return z.object({
    name: z.string().min(1, messages.nameRequired).max(20, messages.nameMaxLength),
    tag: z.string().min(1, messages.tagRequired),
  });
}

// 型定義
export type CreatePetInput = {
  name: string;
  tag: string;
};


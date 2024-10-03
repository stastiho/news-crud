import { z } from 'zod';

export interface NewsItem {
	id: number;
  title: string;
  content: string;
}

export const newsSchema = z.object({
	id: z.number().optional(),
  title: z.string().min(3, 'Поле "Заголовок" должно содержать не менее 3 символов'),
  content: z.string().min(10, 'Поле "Контент" должно содержать не менее 10 символов'),
});
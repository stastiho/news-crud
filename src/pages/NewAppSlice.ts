import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsItem } from '../types/news';

export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [
			{ id: 1, title: 'Машина', content: 'Повысился утильсбор' },
			{ id: 2, title: 'Спорт', content: 'Международный турнир по футболу завершился' },
			{ id: 3, title: 'Технологии', content: 'Компания Apple представила новый смартфон' },
			{ id: 4, title: 'Культура', content: 'Выставка современного искусства открылась в музее' },
			{ id: 5, title: 'Политика', content: 'Президент объявил о новых мерках по борьбе с инфляцией' }
		]
  },
  reducers: {
    addNews: (state, action: PayloadAction<NewsItem>) => {
      state.news.unshift(action.payload);
    },
    updateNews: (state, action: PayloadAction<{ id: number; newsItem: NewsItem }>) => {
      const index = state.news.findIndex(news => news.id === action.payload.id);
      if (index !== -1) {
        state.news[index] = action.payload.newsItem;
      }
    },
    deleteNews: (state, action: PayloadAction<number>) => {
      state.news = state.news.filter(newsItem => newsItem.id !== action.payload);
    },
  },
});

export const { addNews, updateNews, deleteNews } = newsSlice.actions;

export default newsSlice.reducer;

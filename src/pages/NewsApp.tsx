import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { NewsItem, newsSchema } from '../types/news';
import { addNews, deleteNews, updateNews } from './NewAppSlice';
import s from './NewsApp.module.scss';

const NewsApp: React.FC = () => {
  const dispatch = useDispatch();
  const news = useSelector((state: RootState) => state.news.news);

  const [editId, setEditId] = useState<number | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsItem>({
    resolver: zodResolver(newsSchema),
  });

  useEffect(() => {
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  const onSubmit = (data: NewsItem) => {
		console.log("data",data);
    if (editId !== null) {
      dispatch(updateNews({ id: editId, newsItem: data }));
      toast.success("Новость успешно обновлена!");
      setEditId(null);
    } else {
      dispatch(addNews({ ...data, id: Date.now() }));
      toast.success("Новость успешно добавлена!");
    }
    reset();
  };

  const handleEdit = (id: number) => {
    setEditId(id);
    const newsItem = news.find(item => item.id === id);
    if (newsItem) {
      reset(newsItem);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteNews(id));
    toast.error("Новость успешно удалена!");
  };

  return (
    <div className={s.newsApp}>
      <h1>Новости</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Заголовок"
          {...register("title")}
        />
        {errors.title && <span>{errors.title.message}</span>}
        <textarea
          placeholder="Контент"
          {...register("content")}
        />
        {errors.content && <span>{errors.content.message}</span>}
        <button type="submit">{editId !== null ? 'Обновить' : 'Добавить'}</button>
      </form>
      <ul>
        {news?.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <div>
              <button onClick={() => handleEdit(item.id)}>Редактировать</button>
              <button onClick={() => handleDelete(item.id)}>Удалить</button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default NewsApp;

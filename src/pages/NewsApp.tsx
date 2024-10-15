import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useAppSelector } from '../app/store/redux';
import { NewsItem, newsSchema } from '../types/news';
import { addNews, deleteNews, updateNews } from './NewAppSlice';
import s from './NewsApp.module.scss';

const NewsApp: React.FC = ({ title, fields, items}) => {
  const dispatch = useDispatch();
  const news = useAppSelector((state) => state.news.news);

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
    const newsItem = news.find((item: NewsItem) => item.id === id);
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
      <h1>{title}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <div key={field.name}>
            {field.type === 'textarea' ? (
              <textarea
                placeholder={field.placeholder}
                {...register(field.name)}
              />
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.name)}
              />
            )}
            {errors[field.name] && <span>{errors[field.name].message}</span>}
          </div>
        ))}
        <button type="submit">{editId !== null ? 'Обновить' : 'Добавить'}</button>
      </form>
      <ul>
        {items?.map((item) => (
          <li key={item.id}>
            {fields.map((field) => (
              <div key={field.name}>
                <strong>{field.label}:</strong> {item[field.name]}
              </div>
            ))}
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

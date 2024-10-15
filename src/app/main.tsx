import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import NewsApp from '../pages/NewsApp.tsx';
import { persistor, store } from './store/store.ts';
import './styles/index.scss';

const fields = [
	{ name: 'title', type: 'text', placeholder: 'Заголовок', label: 'Заголовок' },
	{ name: 'content', type: 'textarea', placeholder: 'Контент', label: 'Контент' },
];

const news = [
		{ id: 1, title: 'Машина', content: 'Повысился утильсбор' },
		{ id: 2, title: 'Спорт', content: 'Международный турнир по футболу завершился' },
		{ id: 3, title: 'Технологии', content: 'Компания Apple представила новый смартфон' },
		{ id: 4, title: 'Культура', content: 'Выставка современного искусства открылась в музее' },
		{ id: 5, title: 'Политика', content: 'Президент объявил о новых мерках по борьбе с инфляцией' }
];


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
				<div className="app">
					{/* <NewsApp /> */}
					<NewsApp
						title="Новости"
						fields={fields}
						items={news}
					/>
						<NewsApp
						title="Заметки"
						fields={fields}
						items={news}
					/>
				</div>
      </PersistGate>
    </Provider>
  </StrictMode>,
)

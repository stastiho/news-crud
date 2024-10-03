import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import NewsApp from '../pages/NewsApp.tsx';
import { persistor, store } from './store/store.ts';
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
				<div className="app">
					<NewsApp />
				</div>
      </PersistGate>
    </Provider>
  </StrictMode>,
)

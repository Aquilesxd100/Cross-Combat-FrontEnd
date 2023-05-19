import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import IconeSom from './components/iconeSom/IconeSom';
import Rotas from './components/rotas/Rotas';
import "./styles/global.css";
import store from './redux/store/configureStore';
import SoundController from './components/soundController/SoundController';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <SoundController />
            <IconeSom />
            <Rotas />
        </Provider>
    </React.StrictMode>
);

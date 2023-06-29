import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import Rotas from './components/rotas/Rotas';
import store from './redux/store/configureStore';
import "./styles/global.css";
import IconeSom from './components/iconeSom/IconeSom';
import PreLoadResources from './components/preLoadResources/PreLoadResources';
import SoundsController from './components/soundController/SoundsController';
import LoadingScreen from './components/loadingScreen/LoadingScreen';
import ConnectionErrorModal from './components/connectionErrorModal/ConnectionErrorModal';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <LoadingScreen />
            <ConnectionErrorModal />
            <PreLoadResources />
            <SoundsController />
            <IconeSom />
            <Rotas />
        </Provider>
    </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import IconeSom from './components/iconeSom/IconeSom';
import Rotas from './components/rotas/Rotas';
import "./styles/global.css";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <IconeSom />
        <Rotas />
    </React.StrictMode>
);

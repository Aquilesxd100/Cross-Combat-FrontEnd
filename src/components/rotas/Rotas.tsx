import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import TelaSelecao from "../../pages/telaSelecao/TelaSelecao";
import TelaInicial from "../../TelaInicial";
function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/tela-inicial" element={<TelaInicial/>} />
                <Route path="/selecao" element={<TelaSelecao />} />
                <Route path="/*" element={<TelaInicial />} />
            </Routes>
        </BrowserRouter>
    );
};
export default Rotas;
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import TelaSelecao from "../../pages/telaSelecao/TelaSelecao";
import TelaInicial from "../../pages/telaInicial/TelaInicial";
import TelaCombate from "../../pages/telaCombate/TelaCombate";
import TelaErro from "../../pages/telaErro/TelaErro";

function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/tela-inicial" element={<TelaInicial/>} />
                <Route path="/selecao" element={<TelaSelecao />} />
                <Route path="/combate" element={<TelaCombate />} />
                <Route path="/erro" element={<TelaErro />} />
                <Route path="/*" element={<TelaInicial />} />
            </Routes>
        </BrowserRouter>
    );
};
export default Rotas;
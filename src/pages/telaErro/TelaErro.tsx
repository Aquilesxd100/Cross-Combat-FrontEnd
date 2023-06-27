import { useEffect, useState } from "react";
import IMGFundo from "../../resources/images/fundo-app.jpg";
import IMGAviso from "../../resources/images/iconeErro.png";
import { useNavigate } from "react-router-dom";
import { setPendingStartAnimation } from "../../redux/slices/extraAnimationsSlice";
import { useStoreDispatch } from "../../redux/store/configureStore";
import { clearAllModalStates } from "../../redux/slices/modalSlice";

function TelaErro() {
    const navigate = useNavigate();
    const dispatch = useStoreDispatch();
    const [checkUserResolution, setCheckUserResolution] = useState(0);

    useEffect(() => {
        const larguraUsuario : number = window.innerWidth;
        const alturaUsuario : number = window.innerHeight;

        if (alturaUsuario * 1.23 < larguraUsuario && alturaUsuario > 450) {
            dispatch(setPendingStartAnimation(true));
            dispatch(clearAllModalStates());
            navigate('/tela-inicial');
        };

        const handleResize = () => {
            setCheckUserResolution(Math.random());
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };


    }, [checkUserResolution]);

    return (
        <main className="fixed w-full h-full z-30" style={{ background: `url(${IMGFundo})`, backgroundSize: '100% 100%' }}>
            <div className="flex items-center justify-center bg-[rgba(255,255,255,0.25)] w-full h-full backdrop-blur-[1.5px]">
                <div className="flex items-center justify-center flex-col">
                    <img className="w-[20vw] max-w-[280px] min-w-[120px] mb-3" src={IMGAviso} />      
                    <h3 className="mensagem-aviso">Desculpe, o Cross Combat não é compatível com dispositivos móveis.</h3>
                </div>
            </div>
        </main>
    );
};

export default TelaErro;
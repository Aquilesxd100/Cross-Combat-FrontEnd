import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import IMGFundo from "../../resources/images/fundo-app.jpg";
import IMGLoading from "../../resources/images/loading.png";
import { RootState, useStoreDispatch } from "../../redux/store/configureStore";
import { connectionTest } from "../../redux/slices/loadingSlice";

function LoadingScreen() {
    const dispatch = useStoreDispatch()
    const { resourcesLoadingState, serverLoadingState } = useSelector((state : RootState) => state.loadingScreen);
    const loadingScreen : any = useRef();
    const imgCarregamento : any = useRef();
    const loadingMSG : any = useRef();
    const loadingMSG2 : any = useRef();

    useEffect(() => {
        dispatch(connectionTest());
    }, []);

    useEffect(() => {
        if (resourcesLoadingState) {
            loadingMSG.current.innerHTML = "Carregando Recursos...";
        } else if (serverLoadingState) {
            loadingMSG2.current.style.display="block";
            loadingMSG.current.innerHTML = "Conectando ao Servidor...";
        };

        if (resourcesLoadingState || serverLoadingState) {
            loadingScreen.current.classList.remove('hidden');
            imgCarregamento.current.classList.add('carregamento');
        } else {
            loadingScreen.current.classList.add('hidden');
            imgCarregamento.current.classList.remove('carregamento');
        }
    }, [resourcesLoadingState, serverLoadingState]);

    return(
        <main ref={loadingScreen} className="fixed w-full h-full z-30" style={{ background: `url(${IMGFundo})`, backgroundSize: '100% 100%' }}>
            <div className="flex items-center justify-center bg-[rgba(255,255,255,0.25)] w-full h-full backdrop-blur-[1.5px]">
                <div className="flex items-center justify-center flex-col">
                    <img ref={imgCarregamento} className="w-[17vw] max-w-[240px] mb-1" src={IMGLoading} />      
                    <h3 className="mensagem-carregamento" ref={loadingMSG}>Carregando recursos...</h3>
                    <h3 style={{ display: "none" }} className="mensagem-carregamento-suporte" ref={loadingMSG2}>
                        {"[Estimativa: 2min]"}</h3>
                </div>
            </div>
        </main>
    );
};

export default LoadingScreen;
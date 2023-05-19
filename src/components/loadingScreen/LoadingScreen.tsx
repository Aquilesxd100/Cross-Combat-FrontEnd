import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import IMGFundo from "../../resources/images/fundo-app.jpg";
import IMGLoading from "../../resources/images/loading.png";
import { RootState } from "../../redux/store/configureStore";

function LoadingScreen() {
    const { loadingState } = useSelector((state : RootState) => state.loadingScreen);
    const loadindScreen : any = useRef();
    const imgCarregamento : any = useRef();

    useEffect(() => {
        if (loadingState) {
            loadindScreen.current.classList.remove('hidden');
            imgCarregamento.current.classList.add('carregamento');
        } else {
            loadindScreen.current.classList.add('hidden');
            imgCarregamento.current.classList.remove('carregamento');
        }
    }, [loadingState])

    return(
        <main ref={loadindScreen} className="fixed w-full h-full z-30" style={{ background: `url(${IMGFundo})`, backgroundSize: '100% 100%' }}>
            <div className="flex items-center justify-center bg-[rgba(255,255,255,0.25)] w-full h-full backdrop-blur-[1.5px]">
                <img ref={imgCarregamento} className="w-[20vw] max-w-[250px]" src={IMGLoading} />
            </div>
        </main>
    );
};

export default LoadingScreen;
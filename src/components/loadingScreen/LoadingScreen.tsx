import IMGFundo from "../../resources/images/fundo-app.jpg";
import IMGLoading from "../../resources/images/loading.png";

function LoadingScreen() {

    return(
        <main className="fixed w-full h-full z-30" style={{ background: `url(${IMGFundo})`, backgroundSize: '100% 100%' }}>
            <div className="flex items-center justify-center bg-[rgba(255,255,255,0.25)] w-full h-full backdrop-blur-[1.5px]">
                <img className="w-[20vw] max-w-[250px] carregamento" src={IMGLoading} />
            </div>
        </main>
    );
};

export default LoadingScreen;

/* div#root {
    height: 100vh;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(1.5px); 
} */
import { useNavigate } from "react-router-dom";
import IMGLogo from "../../resources/images/logo.png";
import IMGbotaoMusicaON from "../../resources/images/icone-som.png";
import IMGbotaoMusicaOFF from "../../resources/images/icone-som-desligado.png";
import botaoPadrao from "../../resources/images/botao-padrao.png";
function TelaInicial() {
    const navigate = useNavigate();
    const newGameHandler = () => {
        navigate(`/selecao`);
    }
    return (
        <div className="h-full w-full px-2.5 pb-2.5 flex flex-col">
            <header className="h-3/6 w-full flex justify-center relative">
                <button className="min-h-[6vw] h-14 min-w-[6vw] w-14 absolute left-1 top-3 bg-contain brightness-[0.85] hover:brightness-110" style={{backgroundImage: `url(${IMGbotaoMusicaON})`}} />
                <img src={IMGLogo} className="h-6/7 -top-4 relative" alt="logo-cross-combat"/>
            </header>
            <main className="h-3/6 w-full flex justify-start items-center flex-col">
                <button className="min-w-[35%] w-80 min-h-[27%] h-20 bg-100% bg-no-repeat my-2 text-[3.7vw] brightness-[0.85] hover:brightness-110" style={{backgroundImage: `url(${botaoPadrao})`}} onClick={(() => { newGameHandler() })}><h3>NOVO JOGO</h3></button>
                <button className="min-w-[35%] w-80 min-h-[27%] h-20 bg-100% bg-no-repeat my-2 text-[3.7vw] brightness-[0.85] hover:brightness-110" style={{backgroundImage: `url(${botaoPadrao})`}}><h3>CONTINUAR</h3></button>
            </main>
        </div>
    );
}

export default TelaInicial;

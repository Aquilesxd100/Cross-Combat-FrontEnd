import imgLogo from "../../resources/images/logo.png";
import botaoMusicaON from "../../resources/images/icone-som.png";
import botaoMusicaOFF from "../../resources/images/icone-som-desligado.png";
import botaoPadrao from "../../resources/images/botao-padrao.png";
function TelaInicial() {
    return (
        <div className="h-full w-full px-2.5 pb-2.5 flex flex-col">
            <header className="h-3/6 w-full flex justify-center relative">
                <button className="h-14 w-14 absolute left-1 top-3 bg-contain" style={{backgroundImage: `url(${botaoMusicaON})`}} />
                <img src={imgLogo} className="h-6/7 -top-4 relative"/>
            </header>
            <main className="h-3/6 w-full flex justify-center items-center flex-col bg-white">
                <button className="w-60 h-16 bg-cover" style={{backgroundImage: `url(${botaoPadrao})`}}><h3>NOVO JOGO</h3></button>
                <button className="w-60 h-16 bg-cover" style={{backgroundImage: `url(${botaoPadrao})`}}><h3>CONTINUAR</h3></button>
            </main>
        </div>
    );
}

export default TelaInicial;

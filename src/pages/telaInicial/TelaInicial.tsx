import imgLogo from "../../resources/images/logo.png";
import botaoMusicaON from "../../resources/images/icone-som.png";
import botaoMusicaOFF from "../../resources/images/icone-som-desligado.png";
function TelaInicial() {
    return (
        <div className="h-full w-full px-2.5 pb-2.5 flex flex-col">
            <header className="bg-red-50 h-3/6 w-full flex justify-center relative">
                <button style={{backgroundImage:`url(${botaoMusicaON}`}} className="h-14 w-14 absolute left-1 top-3 bg-contain" />
                <img src={imgLogo} className="h-6/7 -top-4 relative"/>
            </header>
            <main className="bg-blue-50 h-3/6 w-full">
                <button></button>
                <button></button>
            </main>
        </div>
    );
}

export default TelaInicial;

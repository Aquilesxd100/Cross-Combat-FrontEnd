import IMGbotaoMusicaON from "../../resources/images/icone-som.png";
import IMGbotaoMusicaOFF from "../../resources/images/icone-som-desligado.png";
function IconeSom() {
    return (
        <button className="min-h-[6vw] h-14 min-w-[6vw] w-14 absolute left-3.5 top-3 bg-contain brightness-[0.85] hover:brightness-110" style={{backgroundImage: `url(${IMGbotaoMusicaON})`, zIndex: '+4'}} />
    )
}
export default IconeSom;
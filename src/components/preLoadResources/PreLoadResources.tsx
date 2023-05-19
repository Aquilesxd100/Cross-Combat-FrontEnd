import IMGbotaoMusicaON from "../../resources/images/icone-som.png";
import IMGbotaoMusicaOFF from "../../resources/images/icone-som-desligado.png";

function PreLoadResources() {
    return(
        <div className="hidden">
            <img src={IMGbotaoMusicaON} />
            <img src={IMGbotaoMusicaOFF} />
        </div>
    );
};

export default PreLoadResources;
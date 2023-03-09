import IMGBotaoMenu from "../../resources/images/botao-menu.png";
import IMGBotaoInfo from "../../resources/images/botao-info.png";
import Card from "../../components/cardGerador/Card";
function TelaCombate() {
    const cardBase = {
        nome: "The Destroyer",
        forca: 7,
        destreza: 9,
        inteligencia: 2,
        universo: "Disney"
    }
    return (
        <div className="h-full w-full px-2.5 flex flex-col">
            <div className="h-[50%] flex items-end justify-center">
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
            </div>
            <hr className="absolute left-0 top-[49%] h-[1.3vh] w-[100%] bg-[#FFA64D] border-0" />
            <button className="z-10 bg-100% w-[8%] h-[6vw] right-[51.5%] top-[44.5%] absolute brightness-[0.85] hover:brightness-105" style={{backgroundImage:`url(${IMGBotaoMenu})`}} />
            <button className="z-10 bg-100% w-[8%] h-[6vw] left-[51.5%] top-[44.5%] absolute brightness-[0.85] hover:brightness-105" style={{backgroundImage:`url(${IMGBotaoInfo})`}} />
            <div className="h-[50%] flex items-start justify-center">
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
            </div>
        </div>  
    )
};
export default TelaCombate;
import Card from "../../components/cardGerador/Card";
import PainelCombate from "../../components/painelCombate/PainelCombate";

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
            <div className="h-[50%] flex items-end justify-center pb-1">
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
            </div>
            <hr className="absolute left-0 top-[49%] h-[1.3vh] w-[100%] bg-[#FFA64D] border-0" />
            <PainelCombate />
            <div className="h-[50%] flex items-start justify-center">
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
            </div>
        </div>  
    )
};
export default TelaCombate;
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BotaoGerarCards from "../../components/botaoGerarCards/BotaoGerarCards";
import Card from "../../components/cardGerador/Card";
import PainelCombate from "../../components/painelCombate/PainelCombate";
import { RootState } from "../../store/configureStore";
import { CardType } from "../../types/types";

    // ------------------ DEMO ------------------  //
    
    const cardBase1 = {
        id: "45",
        morto: false,
        trunfo: false,        
        nome: "The Destroyer",
        imagem: "",
        forca: 7,
        destreza: 9,
        inteligencia: 2,
        universo: "Disney"
    }
    const cardBase2 = {
        id: "23",
        morto: false,
        trunfo: false,        
        nome: "World Eater",
        imagem: "",
        forca: 2,
        destreza: 3,
        inteligencia: 11,
        universo: "Disney"
    }
    export const timeInimigoBase : Array<CardType> = [cardBase1, cardBase2, cardBase2];
    export const timeAliadoBase : Array<CardType> = [cardBase1, cardBase1, cardBase1];

    // ------------------------------------------ //

function TelaCombate() {
    const { timeInimigo } = useSelector((state : RootState) => state.setCards);
    const { timeJogador } = useSelector((state : RootState) => state.setCards);
    const [cardsInimigos, setCardsInimigos] = useState<Array<CardType>>([]);
    const [cardsJogador, setCardsJogador] = useState<Array<CardType>>([]);
    useEffect(() => {
        
    }, [timeInimigo])

    useEffect(() => {

    }, [timeJogador])
    return (
        <div className="h-full w-full px-2.5 flex flex-col">
            <div className="h-[50%] flex items-end justify-center pb-1">
                {!cardsJogador.length && <BotaoGerarCards texto="Gerar Inimigos" />} 
                {!!cardsJogador.length && cardsJogador.map((card) => 
                    <Card nome={card.nome} forca={card.forca} inteligencia={card.inteligencia} destreza={card.destreza} />
                )}               
                {/* <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} /> */}
            </div>
            <hr className="absolute left-0 top-[49%] h-[1.3vh] w-[100%] bg-[#FFA64D] border-0" />
            <PainelCombate />
            <div className="h-[50%] flex items-start justify-center">
                {!cardsInimigos.length && <BotaoGerarCards texto="Gerar Time" />} 
                {!!cardsInimigos.length && cardsInimigos.map((card) => 
                    <Card nome={card.nome} forca={card.forca} inteligencia={card.inteligencia} destreza={card.destreza} />
                )}               
                {/* <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} /> */}
            </div>
        </div>  
    )
};
export default TelaCombate;
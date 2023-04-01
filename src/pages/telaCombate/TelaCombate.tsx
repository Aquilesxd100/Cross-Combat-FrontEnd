import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import BotaoGerarCards from "../../components/botaoGerarCards/BotaoGerarCards";
import Card from "../../components/cardGerador/Card";
import PainelCombate from "../../components/painelCombate/PainelCombate";
import { RootState } from "../../redux/store/configureStore";
import { CardType } from "../../types/types";

function TelaCombate() {
    const { modoAtual } = useSelector((state : RootState) => state.setModo);
    const { timeInimigo } = useSelector((state : RootState) => state.setCards);
    const { timeJogador } = useSelector((state : RootState) => state.setCards);
    const [cardsInimigos, setCardsInimigos] = useState<Array<CardType>>([]);
    const [cardsJogador, setCardsJogador] = useState<Array<CardType>>([]);
    const telaCorpo : any = useRef();
    useEffect(() => {
        if(modoAtual === "combate") {
            telaCorpo.current.classList.add("cursorCombate");
        }
        else {
            telaCorpo.current.classList.remove("cursorCombate");    
        };
    }, [modoAtual]);
    useEffect(() => {
        setCardsInimigos(timeInimigo);
    }, [timeInimigo]);

    useEffect(() => {
        setCardsJogador(timeJogador);
    }, [timeJogador]);
    return (
        <div className="h-full w-full px-2.5 flex flex-col" ref={telaCorpo}>
            <div className="h-[50%] flex items-end justify-center pb-1">
                {!cardsInimigos.length && <BotaoGerarCards texto="Gerar Inimigos" />} 
                {!!cardsInimigos.length && cardsInimigos.map((card) => 
                    <Card tipo="Inimigo" cardInfos={card} key={card.id} />
                )}               
                {/* <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} /> */}
            </div>
            <hr className="absolute left-0 top-[49%] h-[1.3vh] w-[100%] bg-[#FFA64D] border-0" />
            <PainelCombate />
            <div className="h-[50%] flex items-start justify-center">
                {!cardsJogador.length && <BotaoGerarCards texto="Gerar Time" />} 
                {!!cardsJogador.length && cardsJogador.map((card) => 
                    <Card tipo="Aliado" cardInfos={card} key={card.id} />
                )}               
                {/* <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} />
                <Card nome={cardBase.nome} forca={cardBase.forca} inteligencia={cardBase.inteligencia} destreza={cardBase.destreza} /> */}
            </div>
        </div>  
    )
};
export default TelaCombate;
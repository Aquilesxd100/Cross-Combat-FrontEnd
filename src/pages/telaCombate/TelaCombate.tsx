import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import BotaoGerarCards from "../../components/botaoGerarCards/BotaoGerarCards";
import Card from "../../components/cardGerador/Card";
import PainelCombate from "../../components/painelCombate/PainelCombate";
import { RootState } from "../../redux/store/configureStore";
import { CardType } from "../../types/types";
import { setModoNormal } from "../../redux/slices/setModoSlice";

function TelaCombate() {
    const dispatch = useDispatch();
    const { modoAtual } = useSelector((state : RootState) => state.setModo);
    const { timeInimigo } = useSelector((state : RootState) => state.setCards);
    const { timeJogador } = useSelector((state : RootState) => state.setCards);
    const [cardsInimigos, setCardsInimigos] = useState<Array<CardType>>([]);
    const [cardsJogador, setCardsJogador] = useState<Array<CardType>>([]);
    const telaCorpo : any = useRef();
    useEffect(() => {
        window.addEventListener("click", (event : any) => {
            const cardsInimigos = document.querySelectorAll(".cardInimigo, h5.cardJogador");
            let clickFora = 0;
            for(let c = 0; c < cardsInimigos.length; c++) {
                if(cardsInimigos[c].contains(event.target)){}
                else {
                    clickFora++;
                };
            }
            if(clickFora === cardsInimigos.length) {
                dispatch(setModoNormal());   
            }
        });
    }, [])
    useEffect(() => {
        const elementosCursor = document.querySelectorAll("h5, button");
        if(modoAtual === "combate") {
            elementosCursor.forEach((elemento) => elemento.classList.add("cursorCombate"));
            telaCorpo.current.classList.add("cursorCombate");
        }
        else {
            telaCorpo.current.classList.remove("cursorCombate");  
            elementosCursor.forEach((elemento) => elemento.classList.remove("cursorCombate"));  
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
            </div>
            <hr className="absolute left-0 top-[49%] h-[1.3vh] w-[100%] bg-[#FFA64D] border-0" />
            <PainelCombate />
            <div className="h-[50%] flex items-start justify-center">
                {!cardsJogador.length && <BotaoGerarCards texto="Gerar Time" />} 
                {!!cardsJogador.length && cardsJogador.map((card) => 
                    <Card tipo="Aliado" cardInfos={card} key={card.id} />
                )}               
            </div>
        </div>  
    )
};
export default TelaCombate;
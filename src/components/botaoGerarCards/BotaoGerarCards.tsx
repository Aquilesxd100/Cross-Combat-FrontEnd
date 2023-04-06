import { BotaoGerarCardsPropsType, CardType } from "../../types/types";
import IMGtituloMenu from "../../resources/images/titulo-fundo-maior.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTimeJogador, setTimeInimigo } from "../../redux/slices/setCardsSlice";
import gerarCardDisney from "../../requests/temasCards/gerarCardDisney";
import gerarCardsAPI from "../../requests/gerarCardsAPI";

function BotaoGerarCards(props : BotaoGerarCardsPropsType) {
    const dispatch = useDispatch();
    const gerarCards = (async () => {
        if(props.texto === "Gerar Inimigos"){
            const cardsGerados = await gerarCardsAPI("aleatorio", "inimigo");
            dispatch(setTimeInimigo(cardsGerados));
        }
        else{
            const cardsGerados = await gerarCardsAPI("aleatorio", "aliado");
            dispatch(setTimeJogador(cardsGerados));
        }
    })

    return (
        <div className="w-full h-full flex items-center justify-center">
            <button onClick={(() => { gerarCards() })} className="min-w-[35vw] py-[1.8vw] bg-100% flex justify-center brightness-[0.85] hover:brightness-105" style={{ backgroundImage : `url(${IMGtituloMenu})`}}>
                <h3 className="font-light text-[calc(2vw+22px)] text-[#FFA64D]">{props.texto}</h3>
            </button>
        </div>
    )
}
export default BotaoGerarCards;
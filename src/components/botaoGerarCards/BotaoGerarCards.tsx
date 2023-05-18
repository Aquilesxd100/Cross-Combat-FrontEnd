import { BotaoGerarCardsPropsType, CardType } from "../../types/types";
import IMGtituloMenu from "../../resources/images/titulo-fundo-maior.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimeJogador, setTimeInimigo } from "../../redux/slices/setCardsSlice";
import gerarCardDisney from "../../requests/temasCards/gerarCardsDisney";
import gerarCardsAPI from "../../requests/gerarCardsAPI";
import { RootState } from "../../redux/store/configureStore";

function BotaoGerarCards(props : BotaoGerarCardsPropsType) {
    const dispatch = useDispatch();
    const { playerCardType } = useSelector((state : RootState) => state.playerCardType);
    const { timeInimigo, timeJogador } = useSelector((state : RootState) => state.setCards);
    const gerarCards = (async () => {
        if (props.texto === "Gerar Inimigos"){
            const cardsGerados = await gerarCardsAPI("aleatorio", "inimigo", undefined, timeJogador.length ? timeJogador : undefined);
            if (cardsGerados) {
                dispatch(setTimeInimigo(cardsGerados));
            };           
            console.log(cardsGerados)
        }
        else{
            const cardsGerados = await gerarCardsAPI(playerCardType, "aliado", undefined, timeInimigo.length ? timeInimigo : undefined);
            if (cardsGerados) {
                dispatch(setTimeJogador(cardsGerados));
            };            
            console.log(cardsGerados)
        }
    })

    return (
        <div className="w-full h-full flex items-center justify-center">
            <button onClick={(() => { gerarCards() })} className="min-w-[35vw] py-[1.8vw] bg-100% flex justify-center brightness-[0.85] hover:brightness-105" style={{ backgroundImage : `url(${IMGtituloMenu})`}}>
                <h3 className="font-light text-[calc(2vw+22px)] text-[#FFA64D] px-[20px]">{props.texto}</h3>
            </button>
        </div>
    )
}
export default BotaoGerarCards;
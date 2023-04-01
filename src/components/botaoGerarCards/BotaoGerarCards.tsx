import { BotaoGerarCardsPropsType, CardType } from "../../types/types";
import IMGtituloMenu from "../../resources/images/titulo-fundo-maior.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {} from "../../";

function BotaoGerarCards(props : BotaoGerarCardsPropsType) {
    const dispatch = useDispatch();
    const gerarCards = (() => {
        if(props.texto === "Gerar Inimigos"){

        }
        else{

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
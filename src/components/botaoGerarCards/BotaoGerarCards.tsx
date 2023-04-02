import { BotaoGerarCardsPropsType, CardType } from "../../types/types";
import IMGtituloMenu from "../../resources/images/titulo-fundo-maior.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTimeJogador, setTimeInimigo } from "../../redux/slices/setCardsSlice";
import gerarCardDisney from "../../requests/temasCards/gerarCardDisney";
import gerarCardsAPI from "../../requests/gerarCardsAPI";


    // ------------------ DEMO ------------------  //
    
    const cardBase1 = {
        id: "45",
        escondido: false,
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
        escondido: true,
        morto: false,
        trunfo: false,        
        nome: "World Eater",
        imagem: "",
        forca: 2,
        destreza: 3,
        inteligencia: 11,
        universo: "Disney"
    }
    let timeInimigoBase : Array<CardType> = [structuredClone(cardBase2), structuredClone(cardBase2), structuredClone(cardBase2)];
    let timeAliadoBase : Array<CardType> = [structuredClone(cardBase1), structuredClone(cardBase1), structuredClone(cardBase1)];
    timeInimigoBase = timeInimigoBase.map((card) => {
        card.id = crypto.randomUUID();
        return card;
    })
    timeAliadoBase = timeAliadoBase.map((card) => {
        card.id = crypto.randomUUID();
        return card;
    })
    // ------------------------------------------ //

function BotaoGerarCards(props : BotaoGerarCardsPropsType) {
    const dispatch = useDispatch();
    const gerarCards = (async () => {
        if(props.texto === "Gerar Inimigos"){
            const cardsGerados = await gerarCardsAPI("disney", "inimigo");
            dispatch(setTimeInimigo(cardsGerados));
            console.log(cardsGerados)
        }
        else{
            const cardsGerados = await gerarCardsAPI("disney", "aliado");
            dispatch(setTimeJogador(cardsGerados));
            console.log(cardsGerados)
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
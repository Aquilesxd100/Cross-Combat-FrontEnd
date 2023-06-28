import { useEffect, useRef, useState } from "react";
import { CardsFakePropsType } from "../../types/types";
import { RootState } from "../../redux/store/configureStore";
import { useSelector } from "react-redux";
import CardFake from "./CardFake";

function CardsFake(props: CardsFakePropsType) {
    const { fakeCardsActive } = useSelector((state : RootState) => state.setCards);
    const divPrincipal : any = useRef();
    const [cards, setCards] = useState<any>([]);

    useEffect(() => {
        if (props.tipo === "Inimigo") {
            divPrincipal.current.classList.add("pb-1");
            divPrincipal.current.classList.add("items-end");
            divPrincipal.current.classList.remove("items-start");
            divPrincipal.current.classList.remove("overflow-hidden");
        }
    }, []);

    useEffect(() => {
        if (fakeCardsActive) {
            divPrincipal.current.classList.remove("pointer-events-none");
            if (props.cards.length) {
                setCards(props.cards);
            };  
        } else if (fakeCardsActive === false) {
            divPrincipal.current.classList.add("pointer-events-none");
        };

    }, [fakeCardsActive, props.cards]);
 
    return(
        <div ref={divPrincipal} className="absolute w-[100%] h-[100%] flex items-start justify-center overflow-hidden top-[0]">
            {!!cards.length && cards.map((card : any, indice : any) => 
                <CardFake morto={card.morto} indice={indice} key={card.id + "-fake"} />
            )}
        </div>
    )
};

export default CardsFake;
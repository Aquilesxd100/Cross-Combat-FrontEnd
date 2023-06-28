import { useEffect, useRef, useState } from "react";
import cardEscondido from "../../resources/images/card_fundo_tras.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/configureStore";
import { FakeCardPropsType } from "../../types/types";

function CardFake(props: FakeCardPropsType) {
    const { fakeCardsActive } = useSelector((state : RootState) => state.setCards);
    const cardRef : any = useRef();
    const coberturaCard : any = useRef();
    const [fakeCardStyle, setFakeCardStyle] = useState({
        opacity: "0"
    });

    useEffect(() => {
        const updatedProps = {
            opacity: "0"
        };
        
        if (props.morto && fakeCardsActive) {
            updatedProps.opacity = "1";
        } else {
            
        };
        setFakeCardStyle(updatedProps);

    }, [fakeCardsActive]);

    return(
        <div ref={cardRef} className="relative pretoEBranco w-[24%] max-w-[40vh] h-[98%] m-1.5 z-[3]" style={fakeCardStyle}>
            <img className="absolute w-full h-full z-[2]" ref={coberturaCard} src={cardEscondido} />
        </div>
    );
};
export default CardFake;
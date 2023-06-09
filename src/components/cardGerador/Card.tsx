import { useEffect, useRef, useState } from "react";
import { setModoCombate, setModoNormal } from "../../redux/slices/setModoSlice";
import fundoCard from "../../resources/images/card_fundo.png";
import fundoCardTrunfo from "../../resources/images/card_fundo_trunfo.png";
import cardEscondido from "../../resources/images/card_fundo_tras.png";
import { CardPropsType, SelectedStatusType } from "../../types/types";
import { useSelector, useDispatch } from "react-redux";
import { setInfosCombate } from "../../redux/slices/infosCombateSlice";
import { RootState } from "../../redux/store/configureStore";
import { resolverConflito, revelarInimigo } from "../../redux/slices/setCardsSlice";
import { activateEffect, resetEffect } from "../../redux/slices/soundSlice";

function Card(props: CardPropsType) {
    const dispatch = useDispatch();
    const { timeInimigo, timeJogador } = useSelector((state : RootState) => state.setCards);
    const { infosAtacante } = useSelector((state : RootState) => state.setInfosCombate);
    const { modoAtual } = useSelector((state : RootState) => state.setModo);
    const [checkMorte, setCheckMorte] = useState(0);
    const [mortoState, setMortoState] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<SelectedStatusType>({
        selectedStatus: false,
        element: undefined,
        elementId: undefined
    });
    const cardRef : any = useRef();
    const atributoForca : any = useRef();
    const atributoDestreza : any = useRef();
    const atributoInteligencia : any = useRef();
    function retirarHovers() {
        const elementosH5 = cardRef.current.querySelectorAll("h5");
        elementosH5.forEach((elemento : any) => {
            elemento.classList.remove("hover:brightness-110");
            elemento.classList.remove("cursor-pointer");
        });
    }
    const entrarModoCombate = (atributo : "forca" | "inteligencia" | "destreza", valorAtributo : number, elementoRef : any) => {
        if(props.tipo === "Aliado" && !props.cardInfos.morto) {
            dispatch(activateEffect('modoCombate'));
            setSelectedStatus({
                selectedStatus: true,
                element: elementoRef,
                elementId: props.cardInfos.id}
            );

            const infosCombate = {
                idCard: props.cardInfos.id,
                atributo: atributo,
                valorAtributo: valorAtributo
            };
            dispatch(setModoCombate());
            dispatch(setInfosCombate(infosCombate));
        }
    };
    useEffect(() => {
        if (selectedStatus.selectedStatus && selectedStatus.elementId === props.cardInfos.id && modoAtual === "combate") {
            selectedStatus.element.current.classList.remove("hover:brightness-110");
            selectedStatus.element.current.classList.remove("brightness-[0.8]");
            selectedStatus.element.current.classList.add("brightness-110");
        } else if (selectedStatus.elementId === props.cardInfos.id) {
            selectedStatus.element.current.classList.remove("brightness-110");
            selectedStatus.element.current.classList.add("hover:brightness-110");
            selectedStatus.element.current.classList.add("brightness-[0.8]");
            setSelectedStatus({
                selectedStatus: false,
                element: undefined,
                elementId: undefined}
            );
        };
    }, [selectedStatus, modoAtual])

    const realizarAtaque = () => {
        if(modoAtual === "combate" && props.tipo === "Inimigo" && !props.cardInfos.morto) {
            let valorAtributoDefensor = 0;
            switch(infosAtacante.atributo){
                case "forca":
                    valorAtributoDefensor = props.cardInfos.forca;
                break;
                case "destreza":
                    valorAtributoDefensor = props.cardInfos.destreza;
                break;
                case "inteligencia":
                    valorAtributoDefensor = props.cardInfos.inteligencia;
                break;
            };
            const infosConflito = {
                atacante: {
                    idCard: infosAtacante.idCard,
                    valorAtributo: infosAtacante.valorAtributo
                },
                defensor: {
                    idCard: props.cardInfos.id,
                    valorAtributo: valorAtributoDefensor
                }
            }
            if(props.cardInfos.escondido) {
                dispatch(revelarInimigo(props.cardInfos.id));
                setTimeout((() => { dispatch(resolverConflito(infosConflito))}), 500)
            }
            else {
                dispatch(resolverConflito(infosConflito));
            }
            dispatch(setModoNormal());
        };
    };
    useEffect(() => {
        if(props.tipo === "Inimigo") {
            retirarHovers();
            cardRef.current.classList.add("cardInimigo");
        }
        else {
            atributoForca.current.classList.add("cardJogador");
            atributoDestreza.current.classList.add("cardJogador");
            atributoInteligencia.current.classList.add("cardJogador");
        }
    }, []);
    useEffect(() => {
        setTimeout((() => {setCheckMorte(checkMorte + 1)}), 10);
    }, [timeInimigo, timeJogador])
    useEffect(() => {
        if(props.cardInfos.morto && !mortoState) {
            retirarHovers();
            setMortoState(true);
            dispatch(activateEffect("hit"));
            cardRef.current.classList.add("animacao-ataque");
            cardRef.current.classList.add("pretoEBranco");
        }
        else if (!props.cardInfos.morto) {
            cardRef.current.classList.remove("pretoEBranco");
        }
    }, [checkMorte]);
    useEffect(() => {
        if(modoAtual === "combate" && !props.cardInfos.morto && props.tipo === "Inimigo") {
            cardRef.current.classList.add("hoverInimigo");
        }
        else {
            cardRef.current.classList.remove("hoverInimigo");
        }
    }, [modoAtual])
    return(
        <div onClick={(() => { realizarAtaque() })} ref={cardRef} className="relative w-[24%] max-w-[40vh] h-[98%] m-1.5">
            <div className="absolute w-full h-full z-[1] text-center">
                <h1 className="font-[hobostd] font-bold absolute w-full top-[5%] text-[calc(0.55vw+1.5vh)] text-[#2D2431]">{props.cardInfos.nome}</h1>
                <h3 className="sombra-padrao reset-filter font-[hobostd] absolute top-[56%] w-full text-[calc(0.6vw+1.2vh)] text-[#DBB866]">ATRIBUTOS</h3>
                <div className="relative top-[calc(61.5%+1.2vh)] font-[hobostd] text-[#DBB866] drop-shadow text-[calc(0.6vw+1vh)] flex flex-col items-center font-normal">
                    <h5 ref={atributoForca} onClick={(() => { entrarModoCombate("forca", props.cardInfos.forca, atributoForca) })} className="p-[1.5px] sombra-padrao w-[75%] brightness-[0.8] hover:brightness-110 cursor-pointer">FORÇA: <span>{props.cardInfos.forca}</span></h5>
                    <h5 ref={atributoDestreza} onClick={(() => { entrarModoCombate("destreza", props.cardInfos.destreza, atributoDestreza) })} className="p-[1.5px] sombra-padrao relative w-[75%] -top-[3px] brightness-[0.8] hover:brightness-110 cursor-pointer">DESTREZA: <span>{props.cardInfos.destreza}</span></h5>
                    <h5 ref={atributoInteligencia} onClick={(() => { entrarModoCombate("inteligencia", props.cardInfos.inteligencia, atributoInteligencia) })} className="p-[1.5px] sombra-padrao relative w-[75%] -top-[6px] brightness-[0.8] hover:brightness-110 cursor-pointer">INTELIGÊNCIA: <span>{props.cardInfos.inteligencia}</span></h5>
                </div>
                <h6 className="bottom-[0.8%] text-center w-full sombra-padrao absolute italic font-[hobostd] text-[1.3vw] text-[#7A657C]">{props.cardInfos.universo}</h6>
            </div>
            <img src={props.cardInfos.imagem} className="absolute w-[92%] h-[60%] top-[6.5%] right-[4%]  bg-[#10212C]" />
            {props.cardInfos.escondido && <img className="absolute w-full h-full z-[2]" src={cardEscondido} />}
            {props.cardInfos.trunfo
                ? <img className="absolute w-full h-full" src={fundoCardTrunfo} />
                : <img className="absolute w-full h-full" src={fundoCard} />}
        </div>
    );
};
export default Card;
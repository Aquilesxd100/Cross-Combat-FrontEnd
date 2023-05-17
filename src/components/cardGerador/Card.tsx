import { useEffect, useRef, useState } from "react";
import { setModoCombate, setModoNormal } from "../../redux/slices/setModoSlice";
import fundoCard from "../../resources/images/card_fundo.png";
import fundoCardTrunfo from "../../resources/images/card_fundo_trunfo.png";
import cardEscondido from "../../resources/images/card_fundo_tras.png";
import { CardPropsType } from "../../types/types";
import { useSelector, useDispatch } from "react-redux";
import { setInfosCombate } from "../../redux/slices/infosCombateSlice";
import { RootState } from "../../redux/store/configureStore";
import { resolverConflito, revelarInimigo } from "../../redux/slices/setCardsSlice";

function Card(props: CardPropsType) {
    const dispatch = useDispatch();
    const { timeInimigo, timeJogador } = useSelector((state : RootState) => state.setCards);
    const { infosAtacante } = useSelector((state : RootState) => state.setInfosCombate);
    const { modoAtual } = useSelector((state : RootState) => state.setModo);
    const [checkMorte, setCheckMorte] = useState(0);
    const [checkModo, setCheckModo] = useState(0);
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
    const entrarModoCombate = (atributo : "forca" | "inteligencia" | "destreza", valorAtributo : number) => {
        if(props.tipo === "Aliado" && !props.cardInfos.morto) {
            const infosCombate = {
                idCard: props.cardInfos.id,
                atributo: atributo,
                valorAtributo: valorAtributo
            };
            dispatch(setModoCombate());
            dispatch(setInfosCombate(infosCombate));
        }
    };
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
        if(props.cardInfos.morto) {
            retirarHovers();
            cardRef.current.classList.add("pretoEBranco");
        }
        else {
            cardRef.current.classList.remove("pretoEBranco");
        }
    }, [checkMorte]);
    useEffect(() => {
        setTimeout((() => {setCheckModo(checkModo + 1)}), 10);
    }, [modoAtual])
    useEffect(() => {
        if(modoAtual === "combate" && !props.cardInfos.morto && props.tipo === "Inimigo") {
            cardRef.current.classList.add("hoverInimigo");
        }
        else {
            cardRef.current.classList.remove("hoverInimigo");
        }
    }, [checkModo])
    return(
        <div onClick={(() => { realizarAtaque() })} ref={cardRef} className="relative w-[24%] max-w-[40vh] h-[98%] m-1.5">
            <div className="absolute w-full h-full z-[1] text-center">
                <h1 className="font-[hobostd] font-bold absolute w-full top-[5%] text-[calc(0.55vw+1.5vh)] text-[#2D2431]">{props.cardInfos.nome}</h1>
                <h3 className="sombra-padrao reset-filter font-[hobostd] absolute top-[56%] w-full text-[calc(0.6vw+1.2vh)] text-[#DBB866]">ATRIBUTOS</h3>
                <div className="relative top-[calc(61.5%+1.2vh)] font-[hobostd] text-[#DBB866] drop-shadow text-[calc(0.6vw+1vh)] flex flex-col items-center font-normal">
                    <h5 ref={atributoForca} onClick={(() => { entrarModoCombate("forca", props.cardInfos.forca) })} className="p-[1.5px] sombra-padrao w-[75%] brightness-[0.8] hover:brightness-110 cursor-pointer">FORÇA: <span>{props.cardInfos.forca}</span></h5>
                    <h5 ref={atributoDestreza} onClick={(() => { entrarModoCombate("destreza", props.cardInfos.destreza) })} className="p-[1.5px] sombra-padrao relative w-[75%] -top-[3px] brightness-[0.8] hover:brightness-110 cursor-pointer">DESTREZA: <span>{props.cardInfos.destreza}</span></h5>
                    <h5 ref={atributoInteligencia} onClick={(() => { entrarModoCombate("inteligencia", props.cardInfos.inteligencia) })} className="p-[1.5px] sombra-padrao relative w-[75%] -top-[6px] brightness-[0.8] hover:brightness-110 cursor-pointer">INTELIGÊNCIA: <span>{props.cardInfos.inteligencia}</span></h5>
                </div>
                <h6 className="bottom-[0.8%] text-center w-full sombra-padrao absolute italic font-[hobostd] text-[1.3vw] text-[#7A657C]">{props.cardInfos.universo}</h6>
            </div>
            <img src={props.cardInfos.imagem} className="absolute w-[92%] h-[60%] top-[6.5%] right-[4%]" />
            {props.cardInfos.escondido && <img className="absolute w-full h-full z-[2]" src={cardEscondido} />}
            {props.cardInfos.trunfo
                ? <img className="absolute w-full h-full" src={fundoCardTrunfo} />
                : <img className="absolute w-full h-full" src={fundoCard} />}
        </div>
    );
};
export default Card;
import { useEffect, useRef, useState } from "react";
import { setModoCombate, setModoNormal } from "../../redux/slices/setModoSlice";
import fundoCard from "../../resources/images/card_fundo.png";
import fundoCardTrunfo from "../../resources/images/card_fundo_trunfo.png";
import cardEscondido from "../../resources/images/card_fundo_tras.png";
import { CardPropsType, SelectedStatusType } from "../../types/types";
import { useSelector, useDispatch } from "react-redux";
import { setInfosCombate } from "../../redux/slices/infosCombateSlice";
import { RootState } from "../../redux/store/configureStore";
import { resolverConflito, revelarInimigo, setUserReadyState, upgradeTrunfo } from "../../redux/slices/setCardsSlice";
import { activateEffect } from "../../redux/slices/soundSlice";
import { setLoadedGameType, setSaveGameRequest } from "../../redux/slices/saveGameSlice";
import { setPendingResetDefeatedCards, setPendingStartAnimation } from "../../redux/slices/extraAnimationsSlice";
import { diminuirCristais } from "../../redux/slices/pontuacaoSlice";

function Card(props: CardPropsType) {
    const dispatch = useDispatch();
    const { timeInimigo, timeJogador, userReadyState } = useSelector((state : RootState) => state.setCards);
    const { infosAtacante } = useSelector((state : RootState) => state.setInfosCombate);
    const { modoAtual } = useSelector((state : RootState) => state.setModo);
    const { cardsLoadingState, cardsPreLoadingState } = useSelector((state : RootState) => state.loadingScreen);
    const { loadedGameType } = useSelector((state : RootState) => state.saveGame);
    const { serverLoadingState } = useSelector((state : RootState) => state.loadingScreen);
    const { pendingStartAnimation, pendingResetDefeatedCards } = useSelector((state : RootState) => state.extraAnimations);
    const [checkMorte, setCheckMorte] = useState(0);
    const [mortoState, setMortoState] = useState(false);
    const [starterAnimation, setStarterAnimation] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<SelectedStatusType>({
        selectedStatus: false,
        element: undefined,
        elementId: undefined
    });
    const cardRef : any = useRef();
    const coberturaCard : any = useRef();
    const cardInfos : any = useRef();
    const cardPersoImagem : any = useRef();
    const cardBase : any = useRef();
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
            if (selectedStatus.element) {
                removeSelectedAttribute();
            };
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
        };
    };

    const setSelectedAttribute = () => {
        selectedStatus.element.current.classList.remove("hover:brightness-110");
        selectedStatus.element.current.classList.remove("brightness-[0.8]");
        selectedStatus.element.current.classList.add("brightness-110");
    };
    const removeSelectedAttribute = () => {
        selectedStatus.element.current.classList.remove("brightness-110");
        selectedStatus.element.current.classList.add("hover:brightness-110");
        selectedStatus.element.current.classList.add("brightness-[0.8]");
        setSelectedStatus({
            selectedStatus: false,
            element: undefined,
            elementId: undefined}
        );
    };

    useEffect(() => {
        if (starterAnimation) {
            const cardHidePosition : string = props.tipo === "Aliado" 
            ? "card-jogador-hide" : "card-inimigo-hide";
            cardRef.current.classList.add(cardHidePosition);
        };
    }, [starterAnimation]);

    useEffect(() => {
        if (!cardsPreLoadingState && userReadyState) {
            cardRef.current.classList.add("card-transition");
            if (!props.cardInfos.escondido) {
                setTimeout(() => {
                    virarCardParaCima();
                    setTimeout(() => {dispatch(activateEffect("virarCard"));}, 140);
                }, 1050);
            };
        }; 
    }, []);

    useEffect(() => {
        if (selectedStatus.selectedStatus && selectedStatus.elementId === props.cardInfos.id && modoAtual === "combate") {
            setSelectedAttribute();
        } else if (selectedStatus.elementId === props.cardInfos.id) {
            removeSelectedAttribute();
        };
    }, [selectedStatus, modoAtual])

    const interagirCard = () => {
        if (modoAtual === "combate" && props.tipo === "Inimigo" && !props.cardInfos.morto) {
            if (userReadyState) {
                dispatch(setUserReadyState(false));
            };
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
            if (props.cardInfos.escondido) {
                dispatch(revelarInimigo(props.cardInfos.id));
                virarCardParaCima();
                setTimeout(() => {dispatch(activateEffect("virarCard"));}, 140);
                setTimeout((() => { dispatch(resolverConflito(infosConflito))}), 1000)
            }
            else {
                dispatch(resolverConflito(infosConflito));
            }
            dispatch(setModoNormal());
        };

        if (modoAtual === "upgradeCristal" && props.tipo === "Aliado" && !props.cardInfos.morto) {
            dispatch(upgradeTrunfo(props.cardInfos.id));
            dispatch(diminuirCristais());
            dispatch(activateEffect("upgradeCard"));
            setTimeout(() => {
                dispatch(setSaveGameRequest(true));
            }, 600);
            dispatch(setModoNormal());
        };
    };
    useEffect(() => {
        if(props.tipo === "Inimigo") {
            retirarHovers();
            cardRef.current.classList.add("cardInimigo");
        }
        else {
            cardRef.current.classList.add("cardJogador");
            atributoForca.current.classList.add("cardJogador");
            atributoDestreza.current.classList.add("cardJogador");
            atributoInteligencia.current.classList.add("cardJogador");
        }
    }, []);
    useEffect(() => {
        setTimeout((() => {setCheckMorte(checkMorte + 1)}), 10);
    }, [timeInimigo, timeJogador])
    useEffect(() => {
        if (props.cardInfos.morto && !mortoState) {
            if (!loadedGameType) {
                if (timeInimigo.some((inimigo) => !inimigo.morto)) {
                    dispatch(setSaveGameRequest(true));
                };
                dispatch(activateEffect("hit"));
                cardRef.current.classList.add("animacao-ataque");
                coberturaCard.current.classList.add("escondido");
                coberturaCard.current.classList.add("z-[-2]");
                cardRef.current.classList.add("morto");
            };
            retirarHovers();
            setMortoState(true);
        }
        else if (!props.cardInfos.morto) {
            cardRef.current.classList.remove("morto");
        }
    }, [checkMorte]);
    useEffect(() => {
        if (modoAtual === "combate" && !props.cardInfos.morto && props.tipo === "Inimigo") {
            cardRef.current.classList.add("hoverInimigo");
        }
        else {
            cardRef.current.classList.remove("hoverInimigo");
        };

        if (modoAtual === "upgradeCristal" && !props.cardInfos.morto && props.tipo === "Aliado") {
            cardRef.current.classList.add("hoverCristal");
        }
        else {
            cardRef.current.classList.remove("hoverCristal");
        };
    }, [modoAtual])

    useEffect(() => {
        if (cardsLoadingState === false && pendingStartAnimation) {
            setStarterAnimation(true);
        };
    }, [cardsLoadingState]);

    useEffect(() => {
        if (pendingResetDefeatedCards) {
            if (props.cardInfos.morto) {
                coberturaCard.current.classList.remove("escondido");
                setTimeout(() => {
                    virarCardParaBaixo();
                    setTimeout(() => {dispatch(activateEffect("virarCard"));}, 140);
                }, 50);
            };
            dispatch(setPendingResetDefeatedCards(false));
        }
    }, [pendingResetDefeatedCards])

    useEffect(() => {
        const cardHidePosition : string = props.tipo === "Aliado" 
        ? "card-jogador-hide" : "card-inimigo-hide";
        if (starterAnimation) {
            switch(props.indice) {
                case 0:
                    setTimeout(() => {
                        if(props.tipo === "Aliado" && serverLoadingState === false) {
                            setTimeout(() =>{dispatch(activateEffect("cardSend"))}, 100)
                        }
                        cardRef.current.classList.add("card-transition");
                        cardRef.current.classList.remove(cardHidePosition);
                    }, 100)
                break;
                case 1:
                    setTimeout(() => {
                        if(props.tipo === "Aliado" && serverLoadingState === false) {
                            setTimeout(() =>{dispatch(activateEffect("cardSend"))}, 300)
                        }
                        cardRef.current.classList.add("card-transition");
                        cardRef.current.classList.remove(cardHidePosition);
                    }, 240)
                break;
                case 2:
                    setTimeout(() => {
                        if(props.tipo === "Aliado" && serverLoadingState === false) {
                            setTimeout(() =>{dispatch(activateEffect("cardSend"))}, 470)
                        }
                        cardRef.current.classList.add("card-transition");
                        cardRef.current.classList.remove(cardHidePosition);
                    }, 380)
                break;
            }
            if (props.tipo === "Aliado") {
                setTimeout(() => {
                    setTimeout(() => {dispatch(activateEffect("virarCard"));}, 140);
                    virarCardParaCima();
                }, 1300);
            } else if (loadedGameType && !props.cardInfos.escondido) {
                setTimeout(() => {
                    setTimeout(() => {dispatch(activateEffect("virarCard"));}, 140);
                    virarCardParaCima();
                }, 1300);
            };
            dispatch(setLoadedGameType(false));
            dispatch(setPendingStartAnimation(false));
        };
    }, [starterAnimation]);

    const virarCardParaCima = () => {
        const elemsToChangeClass : Array<any> = [cardInfos, cardPersoImagem, cardBase];
        if (props.cardInfos.morto) {
            cardRef.current.classList.add("morto");
        };
        elemsToChangeClass.forEach((elem) => {
            elem.current.classList.remove("backface-escondida");
            elem.current.classList.add("card-virada");
        });
        coberturaCard.current.classList.add("backface-escondida")
        cardRef.current.classList.add("card-virada");
        setTimeout(() => {
            coberturaCard.current.classList.add("escondido");
        }, 900);
    };

    const virarCardParaBaixo = () => {
        cardRef.current.classList.remove("card-virada");
    };

    return(
        <div onClick={(() => { interagirCard() })} ref={cardRef} className="relative w-[24%] max-w-[40vh] h-[98%] m-1.5 card">
            <div ref={cardInfos} className="absolute w-full h-full z-[1] text-center backface-escondida cardInfos">
                <h1 className="font-[hobostd] font-bold absolute w-full top-[5%] text-[calc(0.55vw+1.5vh)] text-[#2D2431] off-user-selection">{props.cardInfos.nome}</h1>
                <h3 className="sombra-padrao reset-filter font-[hobostd] absolute top-[56%] w-full text-[calc(0.6vw+1.2vh)] text-[#DBB866] off-user-selection">ATRIBUTOS</h3>
                <div className="relative top-[calc(61.5%+1.2vh)] font-[hobostd] text-[#DBB866] drop-shadow text-[calc(0.6vw+1vh)] flex flex-col items-center font-normal">
                    <h5 ref={atributoForca} onClick={(() => { entrarModoCombate("forca", props.cardInfos.forca, atributoForca) })} className="p-[1.5px] sombra-padrao w-[75%] brightness-[0.8] hover:brightness-110 cursor-pointer">FORÇA: <span>{props.cardInfos.forca}</span></h5>
                    <h5 ref={atributoDestreza} onClick={(() => { entrarModoCombate("destreza", props.cardInfos.destreza, atributoDestreza) })} className="p-[1.5px] sombra-padrao relative w-[75%] -top-[3px] brightness-[0.8] hover:brightness-110 cursor-pointer">DESTREZA: <span>{props.cardInfos.destreza}</span></h5>
                    <h5 ref={atributoInteligencia} onClick={(() => { entrarModoCombate("inteligencia", props.cardInfos.inteligencia, atributoInteligencia) })} className="p-[1.5px] sombra-padrao relative w-[75%] -top-[6px] brightness-[0.8] hover:brightness-110 cursor-pointer">INTELIGÊNCIA: <span>{props.cardInfos.inteligencia}</span></h5>
                </div>
                <h6 className="bottom-[0.8%] text-center w-full sombra-padrao absolute italic font-[hobostd] text-[1.3vw] text-[#7A657C] off-user-selection">{props.cardInfos.universo}</h6>
            </div>
            <img ref={cardPersoImagem} src={props.cardInfos.imagem} className="absolute w-[92%] h-[60%] top-[6.5%] right-[4%]  bg-[#10212C] backface-escondida cardInfos off-user-selection" />
            <img className="absolute w-full h-full z-[2] backface-escondida off-user-selection" ref={coberturaCard} src={cardEscondido} />
            {props.cardInfos.trunfo
                ? <img ref={cardBase} className="absolute w-full h-full backface-escondida cardInfos off-user-selection" src={fundoCardTrunfo} />
                : <img ref={cardBase} className="absolute w-full h-full backface-escondida cardInfos off-user-selection" src={fundoCard} />}
        </div>
    );
};
export default Card;
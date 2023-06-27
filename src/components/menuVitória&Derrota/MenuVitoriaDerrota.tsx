import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useStoreDispatch } from "../../redux/store/configureStore";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store/configureStore";
import IMGModalMenuMaior from "../../resources/images/menu-maior.png";
import IMGLogoVitoria from "../../resources/images/vitoria_logo.png";
import IMGLogoDerrota from "../../resources/images/derrota_logo.png";
import botaoPadrao from "../../resources/images/botao-padrao.png";
import { setDerrotaModal, setVitoriaModal } from "../../redux/slices/modalSlice"
import { activateEffect } from "../../redux/slices/soundSlice";
import { setPendingStartAnimation } from "../../redux/slices/extraAnimationsSlice";
import { setUserReadyState } from "../../redux/slices/setCardsSlice";

function MenuVitoriaDerrota() {
    const { modalVitoriaActive, modalDerrotaActive } = useSelector((state : RootState) => state.modalStatus);
    const { cardsPreLoadingState } = useSelector((state : RootState) => state.loadingScreen);
    const [modalLogo, setModalLogo] = useState(IMGLogoDerrota);
    const divModalMenu : any = useRef();
    const textoConfirmar : any = useRef();
    const botaoConfirmar : any = useRef();
    const navigate = useNavigate();
    const dispatch = useStoreDispatch();

    const confirmButtonHandler = () => {
        if (modalVitoriaActive && !cardsPreLoadingState) {

            dispatch(setVitoriaModal(false));
            dispatch(activateEffect('botaoPadrao'));
            dispatch(setUserReadyState(true))

        } else if (modalDerrotaActive) {
            dispatch(setDerrotaModal(false));
            dispatch(setPendingStartAnimation(true));
            dispatch(activateEffect('botaoPadrao'));
            navigate('/tela-inicial');
            
        } else if (cardsPreLoadingState) {
            dispatch(activateEffect('botaoNegativo'));
        };
    };

    useEffect(() => {
        if (cardsPreLoadingState && modalVitoriaActive) 
        {
            botaoConfirmar.current.classList.add("pretoEBranco");
            botaoConfirmar.current.classList.add("cursor-padrao");
            botaoConfirmar.current.classList.remove("hover:brightness-110");
            botaoConfirmar.current.classList.remove("brightness-[0.85]");
        } else {
            botaoConfirmar.current.classList.remove("pretoEBranco");
            botaoConfirmar.current.classList.remove("cursor-padrao");
            botaoConfirmar.current.classList.add("hover:brightness-110");
            botaoConfirmar.current.classList.add("brightness-[0.85]");
        };
    }, [cardsPreLoadingState])

    useEffect(() => {
        dispatch(setVitoriaModal(false));
        dispatch(setDerrotaModal(false));
    }, [])

    const modalDisplayDefault : any = {
        opacity: 0,
        pointerEvents: "none",
    };
    const [ modalDisplay, setModalDisplay ] = useState(modalDisplayDefault);

    useEffect(() => {
        if (modalVitoriaActive || modalVitoriaActive) {
            const buttonText : string = modalVitoriaActive 
            ? "CONFIRMAR" : "TELA INICIAL";

            setModalLogo(modalVitoriaActive 
            ? IMGLogoVitoria : IMGLogoDerrota);

            textoConfirmar.current.innerText = buttonText;

            setModalDisplay({
                opacity: 1,
                pointerEvents: "auto"
            });
        } else {
            setModalDisplay(modalDisplayDefault);
        };
    }, [modalVitoriaActive, modalVitoriaActive]);

    return (
        <div ref={divModalMenu} className="fixed flex items-center justify-center top-0 left-0 h-full w-full bg-black/50 z-10 backdrop-blur-[1.5px]" style={modalDisplay}>
            <div className="relative flex flex-col items-center justify-center w-[calc(31vw+100px)] h-[calc(26vw+100px)] bg-100%" style={{backgroundImage:`url(${IMGModalMenuMaior})`}}>
                <img src={modalLogo} className="absolute w-[70%] h-[85%] top-[-31%] sombra-padrao-img" />
                <button ref={botaoConfirmar} className="min-w-[28%] w-[59%] h-[21%] bg-100% bg-no-repeat my-2 text-[3vw] font-bold brightness-[0.85] hover:brightness-110 top-[60%] absolute" style={{backgroundImage: `url(${botaoPadrao})`}} onClick={(() => { confirmButtonHandler(); })}><h3 className="gradiente-laranja" ref={textoConfirmar}>TELA INICIAL</h3></button>
            </div>
        </div>
    );
};

export default MenuVitoriaDerrota;
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import IMGModalMenuMaior from "../../resources/images/menu-maior.png";
import IMGAviso from "../../resources/images/iconeErro.png";
import botaoPadrao from "../../resources/images/botao-padrao.png";
import { RootState, useStoreDispatch } from "../../redux/store/configureStore";
import { activateEffect } from "../../redux/slices/soundSlice";

function ConnectionErrorModal() {
    const dispatch = useStoreDispatch()
    const { modalErroConexao } = useSelector((state : RootState) => state.modalStatus);
    const errorModal : any = useRef();
    const botaoConfirmar : any = useRef();

    useEffect(() => {
        if (modalErroConexao) {
            errorModal.current.classList.remove("escondido");
        } else {
            errorModal.current.classList.add("escondido");
        };
    }, [modalErroConexao]);

    const confirmError = () => {
        dispatch(activateEffect("botaoPadrao"));
        setTimeout(() => { window.open("https://cross-combat.vercel.app/", '_self') }, 350);
    };

    return(
        <div ref={errorModal} className="fixed w-full h-full z-[32] bg-[rgba(0,0,0,0.4)] ">
            <div className="flex items-center justify-center w-full h-full backdrop-blur-[1.5px]">
                <div className="relative flex flex-col items-center justify-center py-[calc(7vh+15px)] px-4 bg-100%" style={{backgroundImage:`url(${IMGModalMenuMaior})`}}>
                    <img src={IMGAviso} className="relative w-[calc(5.5vw+50px)] h-[calc(5.5vw+50px)] sombra-padrao-img off-user-selection mb-6" />
                    <p className="relative font-[hobostd] mb-2 mx-[5.5vw] max-w-[calc(35vw+100px)] text-[calc(1.2vw+14px)] text-[#FFBF00] text-center off-user-selection sombra-realcada" style={{whiteSpace: "pre-wrap"}}>Ocorreu um erro durante a conexão com o servidor, por favor, tente novamente mais tarde.</p>
                    <p className="relative font-[hobostd] my-1 mx-[5.5vw] max-w-[40vw] text-[calc(1.2vw+14px)] text-[#F0D82F] text-center off-user-selection sombra-realcada" style={{whiteSpace: "pre-wrap"}}>*Seu jogo foi salvo*</p>
                    <button ref={botaoConfirmar} className="px-[calc(3.5vw+8px)] py-[calc(0.8vw+3px)] bg-100% bg-no-repeat my-2 mt-3 text-[calc(2vw+14px)] font-bold brightness-[0.85] hover:brightness-110" style={{backgroundImage: `url(${botaoPadrao})`}} onClick={(() => { confirmError(); })}><h3 className="gradiente-laranja off-user-selection">TELA INICIAL</h3></button>
                </div> 
            </div>
        </div>
    );
};

export default ConnectionErrorModal;
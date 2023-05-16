import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useStoreDispatch } from "../../redux/store/configureStore";
import { RootState } from "../../redux/store/configureStore";
import IMGModalMenu from "../../resources/images/menu_opcoes.png";
import botaoPadrao from "../../resources/images/botao-padrao.png";
import IMGBotaoFechar from "../../resources/images/botao-fechar.png";
import { setMenuModal } from "../../redux/slices/modalSlice"

function MenuOpcoes() {
    const { modalMenuActive } = useSelector((state : RootState) => state.modalStatus);
    const divModalMenu : any = useRef();
    const dispatch = useStoreDispatch();

    useEffect(() => {
        if(modalMenuActive) {
            divModalMenu.current.style.opacity="1";
            divModalMenu.current.style.pointerEvents="auto";
        } else {
            divModalMenu.current.style.opacity="0";
            divModalMenu.current.style.pointerEvents="none";
        };
    }, [modalMenuActive]);

    return (
        <div ref={divModalMenu} className="fixed flex items-center justify-center top-0 left-0 h-full w-full bg-black/50 z-10 backdrop-blur-[1.5px]">
            <div className="relative flex flex-col items-center justify-center w-[50vw] h-[29vw] bg-100%" style={{backgroundImage:`url(${IMGModalMenu})`}}>
                <button onClick={(() => { dispatch(setMenuModal(false)) })} className="absolute right-[5.5vw] top-[4.4vw] h-8 w-8 bg-100%" style={{backgroundImage: `url(${IMGBotaoFechar})`, filter: 'drop-shadow(3px 0px 3px rgba(0, 0, 0, 0.3)) drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.3)) drop-shadow(0px -3px 3px rgba(0, 0, 0, 0.3)) drop-shadow(-3px 0px 3px rgba(0, 0, 0, 0.3))'}} />
                <button className="min-w-[30%] w-72 min-h-[25%] h-16 bg-100% bg-no-repeat my-2 text-[3vw] font-bold brightness-[0.85] hover:brightness-110" style={{backgroundImage: `url(${botaoPadrao})`}} onClick={(() => {})}><h3 className="gradiente-laranja">TELA INICIAL</h3></button>
                <button className="min-w-[30%] w-72 min-h-[25%] h-16 bg-100% bg-no-repeat my-2 text-[3vw] font-bold brightness-[0.85] hover:brightness-110" style={{backgroundImage: `url(${botaoPadrao})`}}><h3 className="gradiente-laranja">SALVAR</h3></button>
            </div>
        </div>
    );
};

export default MenuOpcoes;
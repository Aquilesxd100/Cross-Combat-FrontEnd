import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/configureStore";
import IMGModalMenu from "../../resources/images/menu_opcoes.png";
import botaoPadrao from "../../resources/images/botao-padrao.png";

function MenuOpcoes() {
    const { modalMenuActive } = useSelector((state : RootState) => state.modalStatus);
    const divModalMenu : any = useRef();

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
            <div className="flex flex-col items-center justify-center w-[50vw] h-[27vw] bg-100%" style={{backgroundImage:`url(${IMGModalMenu})`}}>
                <button className="min-w-[30%] w-80 min-h-[27%] h-20 bg-100% bg-no-repeat my-2 text-[3.2vw] font-bold brightness-[0.85] hover:brightness-110" style={{backgroundImage: `url(${botaoPadrao})`}} onClick={(() => {})}><h3 className="gradiente-laranja">TELA INICIAL</h3></button>
                <button className="min-w-[30%] w-80 min-h-[27%] h-20 bg-100% bg-no-repeat my-2 text-[3.2vw] font-bold brightness-[0.85] hover:brightness-110" style={{backgroundImage: `url(${botaoPadrao})`}}><h3 className="gradiente-laranja">SALVAR</h3></button>
            </div>
        </div>
    );
};

export default MenuOpcoes;
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useStoreDispatch } from "../../redux/store/configureStore";
import { RootState } from "../../redux/store/configureStore";
import IMGModalMenu from "../../resources/images/menu_opcoes.png";
import IMGBotaoFechar from "../../resources/images/botao-fechar.png";
import { setInfosModal } from "../../redux/slices/modalSlice"

function MenuAjuda() {
    const { modalInfosActive } = useSelector((state : RootState) => state.modalStatus);
    const divModalMenu : any = useRef();
    const dispatch = useStoreDispatch();

    useEffect(() => {
        dispatch(setInfosModal(false));
    }, [])

    const modalDisplayDefault : any = {
        opacity: 0,
        pointerEvents: "none",
    };
    const [ modalDisplay, setModalDisplay ] = useState(modalDisplayDefault);

    useEffect(() => {
        if(modalInfosActive) {
            setModalDisplay({
                opacity: 1,
                pointerEvents: "auto"
            });
        } else {
            setModalDisplay(modalDisplayDefault);
        };
    }, [modalInfosActive]);

    return (
        <div ref={divModalMenu} className="fixed flex items-center justify-center top-0 left-0 h-full w-full bg-black/50 z-10 backdrop-blur-[1.5px]" style={modalDisplay}>
            <div className="relative flex flex-col items-center justify-center w-[50vw] h-[29vw] bg-100%" style={{backgroundImage:`url(${IMGModalMenu})`}}>
                <button onClick={(() => { setModalDisplay(modalDisplayDefault); dispatch(setInfosModal(false)) })} className="absolute right-[5.5vw] top-[4.4vw] h-8 w-8 bg-100%" style={{backgroundImage: `url(${IMGBotaoFechar})`, filter: 'drop-shadow(3px 0px 3px rgba(0, 0, 0, 0.3)) drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.3)) drop-shadow(0px -3px 3px rgba(0, 0, 0, 0.3)) drop-shadow(-3px 0px 3px rgba(0, 0, 0, 0.3))'}} />
            </div>
        </div>
    );
};

export default MenuAjuda;
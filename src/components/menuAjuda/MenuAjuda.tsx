import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useStoreDispatch } from "../../redux/store/configureStore";
import { RootState } from "../../redux/store/configureStore";
import IMGModalInfo from "../../resources/images/menu-maior.png";
import IMGBotaoFechar from "../../resources/images/botao-fechar.png";
import IMGPasso1 from "../../resources/images/foto-passo1.png";
import IMGPasso2 from "../../resources/images/foto-passo2.png";
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
            <div className="relative p-14 w-[58vw] h-[90vh] bg-100%" style={{backgroundImage:`url(${IMGModalInfo})`}}>
                <button onClick={(() => { setModalDisplay(modalDisplayDefault); dispatch(setInfosModal(false)) })} className="absolute right-[6.5vw] top-[5.4vw] h-[calc(3vw+5px)] w-[calc(3vw+5px)] bg-100% botao-fechar z-[1]" style={{backgroundImage: `url(${IMGBotaoFechar})`}} />
                <div className="relative h-[47%] w-[88%] float-left right-[calc(-3vw+18px)]">
                    <img src={IMGPasso1} className="relative mr-2 float-left w-[48%] h-[100%] z-[2] drop-shadow-[-3px_-3px_2px_rgba(0,0,0,0.7)]" />
                    <p className="relative top-[5%] w-[90%] font-[hobostd] text-[1.75vw] text-[#FFA54C]"><span>1</span> Selecione um atributo de algum dos seus cards.</p>
                    <hr className="relative top-[calc(-70%+4vw+5px)] left-[40%] h-1 w-[24vw] bg-[#FFA64D] border-[3.8px] border-[#FFA64D] rounded-md" />
                </div>
                <div className="relative float-right mt-[-13%] h-[47%] w-[90%] left-[calc(-3vw+18px)]">
                    <img src={IMGPasso2} className="relative ml-2 float-right w-[48%] h-[100%] z-[2] drop-shadow-[3px_3px_2px_rgba(0,0,0,0.7)]" />
                    <p className="relative top-[39%] font-[hobostd] text-[1.75vw] text-[#FFA54C] text-right"><span>2</span> Escolha um card inimigo para atacar.</p>
                    <hr className="relative top-[calc(-50%+4vw+5px)] h-1 w-[24vw] bg-[#FFA64D] border-[3.8px] border-[#FFA64D] rounded-md" />
                </div>
                <div className="relative left-[5%] top-[-3.5%] flex flex-col items-center pt-6 h-[22%] w-[90%]">
                    <p className="relative font-[hobostd] mb-2 text-[1.75vw] text-[#FFA54C] text-center"><span>3</span> O card com o maior valor de atributo vence, elimine os três inimigos para ganhar a rodada.</p>
                    <hr className="h-1 w-[90%] bg-[#FFA64D] border-[3.8px] border-[#FFA64D] rounded-md" />
                </div>
            </div>
        </div>
    );
};

export default MenuAjuda;
import { useSelector } from "react-redux";
import { RootState, useStoreDispatch } from "../../redux/store/configureStore";
import IMGCristaisDeposito from "../../resources/images/deposito_cristais.png";
import IMGCristal from "../../resources/images/cristal.png";
import { useEffect, useRef } from "react";
import { aumentarCristais } from "../../redux/slices/pontuacaoSlice";
import { activateEffect } from "../../redux/slices/soundSlice";
import { setModoUpgradeCristal } from "../../redux/slices/setModoSlice";

function Cristais() {
    const { quantidadeCristais } = useSelector((state : RootState) => state.pontuacao);
    const { pendingCristalAnimation } = useSelector((state : RootState) => state.extraAnimations);
    const dispatch = useStoreDispatch();
    const cristal : any = useRef();

    useEffect(() => {
        if (pendingCristalAnimation) {
            cristal.current.classList.remove("escondido");
            setTimeout(() => {
                setTimeout(() => {
                    dispatch(aumentarCristais());
                }, 2800);
                cristal.current.classList.add("animacao-cristal");  
            }, 125);
        } else {
            cristal.current.classList.add("escondido");
            cristal.current.classList.remove("animacao-cristal"); 
        };

    }, [pendingCristalAnimation])

    const cristalHandler = () => {
        if (quantidadeCristais > 0) {
            dispatch(setModoUpgradeCristal());
            dispatch(activateEffect('modoCristalUpgrade'));

        } else {
            dispatch(activateEffect("botaoNegativo"));
        };
    };  

    return (
        <>
            <div className="fixed flex justify-center items-center right-[-1.3%] w-[12.5%] h-[calc(24vh+7px)] bg-100% top-[78.5%] z-10">
                <div onClick={(() => {cristalHandler()})} className="absolute z-[1] w-[100%] h-[100%] top-[10%] left-[9%] off-user-selection rotate-[30deg] fake-cristal-box"></div>
                <img className={"absolute w-[100%] h-[100%] top-[0] left-[0] off-user-selection deposito-cristais"} src={IMGCristaisDeposito} />
                <h2 className="relative valor-cristais top-[13%] font-[hobostd] text-[calc(4.8vw+7px)] off-user-selection pointer-events-none" style={{filter: 'drop-shadow(0px 3.2px 3.2px rgba(0, 0, 0, 0.7)) drop-shadow(0px -3.2px 3.2px rgba(0, 0, 0, 0.7)) drop-shadow(-3.2px 0px 3.2px rgba(0, 0, 0, 0.7))'}}>{quantidadeCristais}</h2>
            </div>
            <img ref={cristal} className="fixed escondido z-[9] w-[4.7%] h-[calc(13vh+7px)] bg-100% top-[37%] right-[50%]" src={IMGCristal} />
        </>
    );
}; 

export default Cristais;
import { createContext, useContext, useState, type ReactNode } from "react";


interface TypeContext{

    showCardExpandido: boolean,
    setShowCardExpandido: Function;

}


export const CardExpandidoContext = createContext<TypeContext | undefined>(undefined);

function CardExpandidoProvider({children} : {children : ReactNode}){

    const [showCardExpandido, setShowCardExpandido] = useState(false)

    return(

        <CardExpandidoContext.Provider value={ {showCardExpandido, setShowCardExpandido} }>
            {children}
        </CardExpandidoContext.Provider>

    )

}

export const useCardExpandido = () =>{

    const context = useContext(CardExpandidoContext);
    if (!context){throw new Error("TIpo indefinido")}
    return context;
}

export default CardExpandidoProvider;
import { createContext, useContext, useState, type ReactNode } from "react";
import type { Instituicao } from "../../components/types/InsituicaoInterface";


interface TypeContext{
    
    instituicaoAtual : Instituicao,
    setInstituicaoAtual : Function;
        
}

export const InstituicaoAtual = createContext<TypeContext | undefined>(undefined);

function InstituicaoAtualProvider( {children} : {children : ReactNode}){

    const [instituicaoAtual, setInstituicaoAtual] = useState<Instituicao>({} as Instituicao); //É um objeto vazio só que com coerção pra fingir que tem algo, pro negocio n reclamar. Muita maracutiaia

    return(

        <InstituicaoAtual.Provider value={ {instituicaoAtual, setInstituicaoAtual} }>
            {children}
        </InstituicaoAtual.Provider>

    )

}

export const useInstituicaoAtual = () =>{

    const context = useContext(InstituicaoAtual);
    if (!context){throw new Error("Tipo indefinido")}
    return context;
}

export default InstituicaoAtualProvider;
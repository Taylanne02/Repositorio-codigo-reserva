import { createContext, useContext, useState, type ReactNode } from "react";

interface Filters{
    filtroFunciona24h : boolean;
    setFiltroFunciona24h : Function;
    filtroPrecoSocial : boolean;
    setFiltroPrecoSocial : Function;
    filtroServicosEssenciais :
        {
            leitos: boolean,
            atendimentoEmergencia: boolean,
            raioX: boolean,
            laboratorio: boolean,
            vacinacao: boolean;
        }
    setFiltroServicosEssenciais : Function;
    filtroHorarios : string[];
    setFiltroHorarios : Function;
    filtroConvenios : string[];
    setFiltroConvenios : Function;
    filtroNome: string;
    setFiltroNome: Function;

}

export const FilterContext = createContext<Filters | undefined>(undefined);

function FilterContextProvider({ children }: { children: ReactNode }){

    const [filtroFunciona24h, setFiltroFunciona24h] = useState(false);
    const [filtroPrecoSocial, setFiltroPrecoSocial] = useState(false);
    const [filtroServicosEssenciais, setFiltroServicosEssenciais] = useState({leitos:false,atendimentoEmergencia:false,raioX:false,laboratorio:false,vacinacao:false});
    const [filtroHorarios, setFiltroHorarios] = useState([]);
    const [filtroConvenios, setFiltroConvenios] = useState([]);

    const [filtroNome, setFiltroNome] = useState("");


    return(

        <FilterContext.Provider value={ {filtroFunciona24h, setFiltroFunciona24h,
                                         filtroPrecoSocial, setFiltroPrecoSocial,
                                         filtroServicosEssenciais, setFiltroServicosEssenciais,
                                         filtroHorarios, setFiltroHorarios,
                                         filtroConvenios, setFiltroConvenios,
                                         filtroNome, setFiltroNome} }>
            {children}
        </FilterContext.Provider>

    )

}

export const useFilters = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilters must be used within a FilterContextProvider');
    }
    return context;
};

export default FilterContextProvider;
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useFilters } from "../../contexts/filters/FilterContext";

function SearchBar(){

    const {setFiltroNome} = useFilters();

    const [nome, setNome] = useState("")

    return(

        <div>
            <input type="text" placeholder="Faça sua pesquisa aqui" onChange={(event) => {setNome(event.target.value)}}/>
            <button onClick={() => {setFiltroNome(nome)}}><IoSearch/></button>
        </div>
    )

}

export default SearchBar;
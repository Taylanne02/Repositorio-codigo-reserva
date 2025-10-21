import { useFilters } from "../../contexts/filters/FilterContext";

function FilterList(){

    const { filtroFunciona24h, setFiltroFunciona24h,
            filtroPrecoSocial, setFiltroPrecoSocial,
            setFiltroConvenios} = useFilters();

  function toggleConvenio(valor: string) {
    if (valor === "0") {
      setFiltroConvenios([]);
      return;
    }

    setFiltroConvenios([valor]);
  }


    return(

    <div>
      <select value={filtroFunciona24h ? "1" : "0"} onChange={(event) => setFiltroFunciona24h(event.target.value === "1")}>
        <option value="0">Funciona 24h: Não</option>
        <option value="1">Funciona 24h: Sim</option>
      </select>

      <select value={filtroPrecoSocial ? "1" : "0"} onChange={(event) => setFiltroPrecoSocial(event.target.value === "1")}>
        <option value="0">Preço Social: Não</option>
        <option value="1">Preço Social: Sim</option>
      </select>

      <select onChange={(event) => toggleConvenio(event.target.value)}>
        <option value="0">Convênio: Nenhum</option>
        <option value="SUS">SUS</option>
        <option value="Unimed">Unimed</option>
      </select>
    </div>

    )

}

export default FilterList;
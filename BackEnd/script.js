import { createClient } from '@supabase/supabase-js'
//Chaves
const linkDataBase = "https://nkxfuilkehedppvhboxe.supabase.co";
const keyDataBase = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5reGZ1aWxrZWhlZHBwdmhib3hlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDE4MDc1OCwiZXhwIjoyMDc1NzU2NzU4fQ.H0EoJygPQgysVArJ83tjjLSEgYlo8wvyqXv4aYP3sqo";

//Acesso ao Banco
const dataBase = createClient(linkDataBase, keyDataBase);

//X===Funções===X

//Adiciona novo registro de Contato
async function addContact(telefone, email, site, instagram, facebook){

    const { data, error } = await dataBase.from("contato")
    .insert([
            {
                telefone : telefone,
                email : email,
                site : site,
                instagram : instagram,
                facebook : facebook
            }])
    .select("id_contato");
    
    if (!data || data.length === 0){
        console.log(error);
        return null;
    }

    else{
        console.log("Registro de contato adicionado:" + data[0].id_contato);
        return data[0].id_contato;
    }

}

//Adiciona novo registro de Endereço
async function addAddress(logradouro, bairro, cidade, estado, cep, latitude, longitude){

    const { data, error } = await dataBase.from("endereco")
    .insert([{
        logradouro : logradouro,
        bairro : bairro,
        cidade : cidade,
        estado : estado,
        cep : cep,
        latitude : latitude,
        longitude : longitude
    }])
    .select("id_endereco");

    if (!data || data.length === 0){
        console.log(error);
        return null;
    }

    else{
        console.log("Registro de endereço adicionado:" + data[0].id_endereco);
        return data[0].id_endereco;
    }

}

//Adiciona novo registro de horarios
async function addSchedules(funciona24h, horarios){

    const { data, error} = await dataBase.from("horarios")
    .insert([{
        funciona24h : funciona24h,
        horarios : horarios
    }])
    .select("id_horarios");

    if (!data || data.length === 0){
    console.log(error);
    return null;
    }

    else{
        console.log("Registro de horarios adicionado:" + data[0].id_horarios);
        return data[0].id_horarios;
    }
}

//Adiciona registro de Serviços Essenciais
async function addEssServices(leitos, emergencia, raioX, laboratorio, vacinacao){

    const { data, error } = await dataBase.from("servicosessenciais")
    .insert([{
        leitos : leitos,
        atendimentoemergencia : emergencia,
        raiox : raioX,
        laboratorio : laboratorio,
        vacinacao : vacinacao
    }])
    .select("id_servicos_essenciais");

    if (!data || data.length === 0){
        console.log(error);
        return null;
        }

        else{
            console.log("Registro de serviços adicionado:" + data[0].id_servicos_essenciais);
            return data[0].id_servicos_essenciais;
        }

}

//Tratamento especial para salvar imagens
async function addImages(imagens){

    const urls = [];

    for(let i = 0; i <imagens.length; i++){

        const fileName = Date.now().toString();

        const { data, error } = await dataBase.storage.from("imagens")
        .upload(fileName, imagens[i]);

        if (!data || data.length === 0) {
            console.log("Não foi possivel adicionar a imagem. Erro: " + error);
        } else {
            const url = await dataBase.storage.from("imagens").getPublicUrl(fileName);
            urls.push(url.data.publicUrl);
            console.log("Imagem adicionada com sucesso! Url: " + url.data.publicUrl);
        }


    }

    return urls;
}




//Adiciona registro de Instituição
async function addInstituicao(nome, sigla, administracao, descricao, tipo, imagens, precosocial, convenios, servicosextras, especialidades,
    telefone, email, site, instagram, facebook,
    //
    logradouro, bairro, cidade, estado, cep, latitude, longitude,
    //
    leitos, emergencia, raioX, laboratorio, vacinacao,
    //
    funciona24h, horarios) {

    const { data, error } = await dataBase.from("instituicao")
        .insert([{
            nome: nome,
            sigla: sigla,
            administracao: administracao,
            descricao: descricao,
            tipo: tipo,
            imagens: await addImages(imagens),
            precosocial: precosocial,
            convenios: convenios,
            servicosextras: servicosextras,
            especialidades: especialidades,
            
            contato: await addContact(telefone, email, site, instagram, facebook),
            endereco: await addAddress(logradouro, bairro, cidade, estado, cep, latitude, longitude),
            servicosessenciais: await addEssServices(leitos, emergencia, raioX, laboratorio, vacinacao),
            horarios: await addSchedules(funciona24h, horarios)
        }])
        .select("id_instituicao");

    if (!data || data.length === 0) {
        console.log(error);
        return null;
    } else {
        console.log("Registro de instituição adicionado: " + data[0].id_instituicao);
        return data[0].id_instituicao;
    }
}


// Exemplo de uso 1: Hospital Geral com foco social e plantão 24h
addInstituicao(
    // Instituicao
    "Hospital Municipal Central", "HMC", "Pública", "Referência em urgência e emergência.", "Hospital", ["url_img1.jpg", "url_img2.png"], true, ["SUS", "Plano A"], ["Camas Extra", "Psicologia"], ["Clínica Geral", "Ortopedia"],
    // Contato
    "11987654321", "contato@hmc.com.br", "http://www.hmc.com.br", "@hmc_saude", "facebook.com/hmc",
    // Endereco
    "Av. Principal, 123", "Centro", "São Paulo", "SP", "01000-000", -23.55052, -46.633309,
    // Servicos Essenciais (Todos booleanos)
    true, true, true, true, true,
    // Horarios
    true, null
);

// Exemplo de uso 2: Clínica particular especializada em Oftalmologia
addInstituicao(
    // Instituicao
    "Clínica Visão Total", "CVT", "Privada", "Especializada em cirurgias oftalmológicas.", "Clínica", ["url_oftalmo.jpg"], false, ["Unimed", "Bradesco Saúde"], ["Check-up anual"], ["Oftalmologia", "Retina"],
    // Contato
    "2133334444", "atendimento@visaototal.com.br", "http://www.visaototal.com.br", "@clinica_visao", null,
    // Endereco
    "Rua das Acácias, 45", "Barra", "Rio de Janeiro", "RJ", "22793-080", -22.990422, -43.365853,
    // Servicos Essenciais (Todos booleanos)
    true, false, false, false, false,
    // Horarios
    false, '{"segunda": "08:00-18:00", "terca": "08:00-18:00", "sabado": "08:00-12:00"}'
);

// Exemplo de uso 3: Posto de Saúde com foco em vacinação e preço social
addInstituicao(
    // Instituicao
    "Posto de Saúde Bem Estar", "PSBE", "Pública", "Foco em atenção primária e vacinação infantil.", "Posto de Saúde", [], true, ["SUS"], ["Aconselhamento"], ["Pediatria", "Clínica Geral"],
    // Contato
    "6155551234", "psbe@saude.gov.br", null, null, null,
    // Endereco
    "Quadra 10, Lote 5", "Taguatinga", "Brasília", "DF", "72000-000", -15.8398, -48.0538,
    // Servicos Essenciais (Todos booleanos)
    false, false, false, true, true,
    // Horarios
    false, '{"segunda": "07:00-17:00", "sexta": "07:00-17:00"}'
);

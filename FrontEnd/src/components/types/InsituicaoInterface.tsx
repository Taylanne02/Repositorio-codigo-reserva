interface Endereco {
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface Contato {
  telefone: string;
  email: string;
  site?: string;
  instagram?: string;
  facebook?: string;
}

interface Avaliacao {
  idUsuario: number;
  usuario: string;
  nota: number;
  comentario: string;
  data: string;
}

export interface Instituicao {
  id: string;
  nome: string;
  sigla?: string;
  descricao: string;
  tipo: string;
  imagens?: string[];
  endereco: Endereco;
  contato: Contato;
  horarios: { funciona24h: boolean; horarios: { dia: string; abertura: string; fechamento: string }[] };
  servicosEssenciais: {"leitos": boolean,"atendimentoEmergencia": boolean,"raioX": boolean,"laboratorio": boolean,"vacinacao": boolean};
  servicosExtras: string[];
  especialidades: string[];
  convenios: string[];
  precoSocial: boolean;
  avaliacoes: Avaliacao[];
}
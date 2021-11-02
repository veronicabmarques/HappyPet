import axios from 'axios';

const BASE_API = 'http://192.168.0.23:59555/api/';

const api = axios.create({
  //baseURL: 'http://localhost:3333/'
  baseURL: BASE_API
});

export default {
  signIn: async (email, senha) => {
    return axios.post('http://192.168.0.23:59555/api/Usuario/login', {
      email: email,
      senha: senha
    })
  },
  signUp: async (email, tipoUsuario, imagem, nome, senha, nascimento, endereco, telefone, genero, estado, cidade, information) => {
    return axios.post('http://192.168.0.23:59555/api/Usuario/cadastro', {
      email: email,
      tipoUsuario: tipoUsuario,
      imagem: imagem,
      nome: nome,
      senha: senha,
      nascimento: nascimento,
      endereco: endereco,
      telefone: telefone,
      genero: genero,
      estado: estado,
      cidade: cidade,
      information: information
    })
  },

  getWorkers: async () => {
    const req = await api.get('Servico')
    const json = req.data;
    return json;
  },
  getWorker: async (id) => {
    const req = await fetch(`${BASE_API}/auth/worker/${id}`);
    const json = await req.json();
    return json;
  },

  getSchedule: async (email) => {
    const req = await api.get(`Agenda/proprietario/${email}`);
    const json = req.data;
    return json;
  },
  getScheduleToday: async (email) => {
    const req = await api.get(`Agenda/proprietario/${email}/dia`);
    const json = req.data;
    return json;
  },

  getRating: async () => {
    const req = await api.get('Avaliacao');
    const json = req.data;
    return json;
  },
  postRating: async (emailAvaliador, emailAvaliado, comentario, estrelas) => {
    return axios.post('http://192.168.0.23:59555/api/Avaliacao', {
      emailAvaliador: emailAvaliador,
      emailAvaliado: emailAvaliado,
      comentario: comentario,
      estrelas: estrelas
    })
  },

  getPetByEmail: async (email) => {
    const req = await api.get(`Pet/${email}`);
    const json = req.data;
    return json;
  },
  postPets: async (email, imagem, nome, tipoPet, porte, sexo, raca, descricao) => {
    return axios.post('http://192.168.0.23:59555/api/Pet', {
      email: email,
      imagem: imagem,
      nome: nome,
      tipoPet: tipoPet,
      porte: porte,
      sexo: sexo,
      raca: raca,
      descricao: descricao
    })
  },
  putPets: async (email, imagem, nome, tipoPet, porte, sexo, raca, descricao) => {
    return axios.put('http://192.168.0.23:59555/api/Pet', {
      email: email,
      imagem: imagem,
      nome: nome,
      tipoPet: tipoPet,
      porte: porte,
      sexo: sexo,
      raca: raca,
      descricao: descricao
    })
  },

  postServices: async (email, tipoServico, descricao, precoMedio, imagens, filtro) => {
    return axios.post('http://192.168.0.23:59555/api/Servico', {
      email: email,
      tipoServico: tipoServico,
      descricao: descricao,
      precoMedio: precoMedio,
      imagens: imagens,
      filtro: filtro
    })
  },
  putServices: async (email, tipoServico, descricao, precoMedio, imagens, filtro) => {
    return axios.put('http://192.168.0.23:59555/api/Servico', {
      email: email,
      tipoServico: tipoServico,
      descricao: descricao,
      precoMedio: precoMedio,
      imagens: imagens,
      filtro: filtro
    })
  },

  getUser: async (email) => {
    const req = await api.get(`Usuario/${email}`);
    const json = req.data;
    return json;
  },
  putUser: async (email, tipoUsuario, imagem, nome, nascimento, endereco, telefone, genero, estado, cidade, information) => {
    return axios.put('http://192.168.0.23:59555/api/Usuario', {
      email: email,
      tipoUsuario: tipoUsuario,
      imagem: imagem,
      nome: nome,
      nascimento: nascimento,
      endereco: endereco,
      telefone: telefone,
      genero: genero,
      estado: estado,
      cidade: cidade,
      information: information
    })
  },
  putUserInformation: async (email, information) => {
    return axios.put('http://192.168.0.23:59555/api/Usuario/information', {
      email: email,
      information: information
    })
  },
};
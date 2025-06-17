'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import api from '../../services/api'


export default function Home() {

  const router = useRouter()

  const [nome, setNome] = useState('')
  const [nomeEmpresa, setNomeEmpresa] = useState('')
  const [contato, setContato] = useState('')
  const [email, setEmail] = useState('')
  const [segmento, setSegmento] = useState('industria')
  const [faturamento, setFaturamento] = useState('300')
  const [qtdFuncionario, setQtdFuncionario] = useState('1-10')
  const [termosAceito, setTermosAceito] = useState(false)

  // Função para atualizar o segmento
  const handleSegmentoChange = (e) => {
    setSegmento(e.target.value);
  };

  // Função para atualizar o faturamento
  const handleFaturamentoChange = (e) => {
    setFaturamento(e.target.value);
  };

  // Função para atualizar a qtd de funcionários
  const handleQtdFuncionarioChange = (e) => {
    setQtdFuncionario(e.target.value);
  };

  const handleCheckboxChange = (event) => {
    setTermosAceito(event.target.checked);
  };

  const handleCadastrarLead = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('USER_TOKEN_3P');
      const response = await api.post('/cadastrarLead', {
        nome,
        nomeEmpresa,
        contato,
        email,
        segmento,
        faturamento,
        qtdFuncionario,
        termosAceito
      },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      //const token = response.data.token
      //localStorage.setItem('USER_TOKEN_3P', token);

      router.push('/resultado')
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Ocorreu um erro inesperado.';
      alert(errorMessage);
    }

  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-consultoria">
        <div className="container-fluid d-flex align-items-center justify-content-between">

          {/* Layout Mobile: Logo + Título lado a lado */}
          <div className="d-flex d-lg-none align-items-center justify-content-between w-100">
            <a className="navbar-brand mb-0 d-flex align-items-center" href="#">
              <img
                src="https://3pservicepartner.com.br/wp-content/uploads/2025/03/3P_logo-horizontal_1-1-e1744026584210.png"
                alt="Logo 3P"
                className="img-fluid"
                style={{ maxHeight: 80 }}
              />
            </a>
            <h1 className="mb-0 fw-bold text-white fs-6 text-end ms-2 flex-grow-1">
              Raio X – Preencha seus dados e obtenha o diagnóstico gratuito e on-line
            </h1>
          </div>

          {/* Layout Desktop: Logo à esquerda */}
          <a className="navbar-brand mb-0 d-none d-lg-flex align-items-center" href="#">
            <img
              src="https://3pservicepartner.com.br/wp-content/uploads/2025/03/3P_logo-horizontal_1-1-e1744026584210.png"
              alt="Logo 3P"
              className="img-fluid"
              style={{ maxHeight: 80 }}
            />
          </a>

          {/* Título no desktop (centralizado) */}
          <div className="mx-auto d-none d-lg-block text-center position-absolute start-50 translate-middle-x">
            <h1 className="mb-0 fw-bold text-white fs-2">
              Raio X – Preencha seus dados e obtenha o diagnóstico gratuito e on-line
            </h1>
          </div>

          {/* Espaço invisível para equilibrar no desktop */}
          <div style={{ width: 80 }} className="d-none d-lg-block"></div>
        </div>
      </nav>



      <div className="container mt-4">
        <form action="diagnostico.html">
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="empresa" className="form-label">Nome da Empresa</label>
            <input
              type="text"
              className="form-control"
              id="empresa"
              value={nomeEmpresa}
              onChange={(e) => setNomeEmpresa(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contato" className="form-label">Telefone</label>
            <input
              type="text"
              className="form-control"
              id="contato"
              value={contato}
              onChange={(e) => setContato(e.target.value)}
            />
            <small className="form-text text-muted">
              Informe apenas números com DDD. Ex: 43999998888
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>


          <div className="mb-3">
            <label htmlFor="selectSensor">Segmentação</label>
            <select
              className="form-select"
              onChange={handleSegmentoChange}
            >

              <option value='industria'>Industria</option>
              <option value='servico'>Serviços</option>
              <option value='tecnologia'>Tecnologia</option>

            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="selectSensor">Faturamento/Mês</label>
            <select
              className="form-select"
              onChange={handleFaturamentoChange}
            >

              <option value='300'>Até 300k</option>
              <option value='300-500'>de 300k a 500k</option>
              <option value='500-800'>de 500k a 800k</option>
              <option value='800+'>Acima de 800k</option>

            </select>
          </div>


          <div className="mb-3">
            <label htmlFor="selectSensor">Qtd Funcionários</label>
            <select
              className="form-select"
              onChange={handleQtdFuncionarioChange}
            >

              <option value='1-10'>1 a 10 colaboradores</option>
              <option value='11-50'>11 a 50 colaboradores</option>
              <option value='51-200'>51 a 200 colaboradores</option>
              <option value='200+'>Mais de 200 colaboradores</option>

            </select>
          </div>


          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsCheckbox"
              checked={termosAceito}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="termsCheckbox">
              <small>
                O diagnóstico baseia-se estritamente nas respostas apresentadas. É uma ferramenta gratuita oferecida para fazer uma avaliação inicial fundamentada nos princípios estabelecidos pela 3P. Para uma análise mais abrangente e detalhada, procure os especialistas da 3P e agende uma conversa.
                Os dados coletados serão utilizados exclusivamente para a elaboração de um relatório personalizado. Não haverá compartilhamento com terceiros sem autorização expressa do participante.
                Em Compromisso com a Privacidade, garantimos que todos os dados serão tratados conforme a Lei Geral de Proteção de Dados Pessoais (LGPD), garantindo confidencialidade e segurança.
                Para esclarecimentos adicionais ou solicitações referentes aos dados pessoais, favor contatar-nos através dos e-mails: jamal@3pservicepartner.com.br ou silviorea@3pservicepartner.com.br.
              </small>
            </label>
          </div>


          <button onClick={(e) => handleCadastrarLead(e)} type="submit" className="btn btn-primary">Cadastrar</button>
        </form>
      </div>

      <footer className="text-center mt-5 py-3 bg-consultoria">
        <p className="footer-text mb-0">© 2025 3pservicepartner.com</p>
      </footer>

      {/* Botão flutuante do WhatsApp */}
      <a
        href="https://wa.me/5543988081414"
        className="btn btn-success position-fixed d-flex align-items-center justify-content-center"
        style={{
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          zIndex: 9999,
        }}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
      >
        <i className="bi bi-whatsapp fs-3"></i>
      </a>


    </>
  );
}

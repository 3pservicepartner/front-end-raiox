'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import api from '../../services/api'

export default function Login() {
    const router = useRouter()

    const [q1, setQ1] = useState('');
    const [q2, setQ2] = useState('');
    const [q3, setQ3] = useState('');
    const [q4, setQ4] = useState('');
    const [q5, setQ5] = useState('');
    const [q6, setQ6] = useState('');
    const [q7, setQ7] = useState('');
    const [q8, setQ8] = useState('');
    const [q9, setQ9] = useState('');
    const [q10, setQ10] = useState('');


    useEffect(() => {
        async function verificarToken() {
            try {
                const token = localStorage.getItem('USER_TOKEN_3P');
                const response = await api.get('/verificarTokken', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data.respondido) router.push('/resultado');
            } catch (error) {
                const errorMessage = error.response?.data?.error || 'Ocorreu um erro inesperado.';
                alert(errorMessage);
                router.push('/');
            }
        }

        verificarToken();
    }, []);


    const handleChangeQ1 = (event) => {
        setQ1(Number(event.target.value));
    };
    const handleChangeQ2 = (event) => {
        setQ2(Number(event.target.value));
    };
    const handleChangeQ3 = (event) => {
        setQ3(Number(event.target.value));
    };
    const handleChangeQ4 = (event) => {
        setQ4(Number(event.target.value));
    };
    const handleChangeQ5 = (event) => {
        setQ5(Number(event.target.value));
    };
    const handleChangeQ6 = (event) => {
        setQ6(Number(event.target.value));
    };
    const handleChangeQ7 = (event) => {
        setQ7(Number(event.target.value));
    };
    const handleChangeQ8 = (event) => {
        setQ8(Number(event.target.value));
    };
    const handleChangeQ9 = (event) => {
        setQ9(Number(event.target.value));
    };
    const handleChangeQ10 = (event) => {
        setQ10(Number(event.target.value));
    };

    const hendleRegistrarDiagnostico = async () => {

        try {
            const token = localStorage.getItem('USER_TOKEN_3P');
            const response = await api.post('/registrarDiagnostico',
                { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            router.push('/resultado')

        } catch (error) {

            const errorMessage = error.response?.data?.error || 'Ocorreu um erro inesperado.';
            alert(errorMessage);

        }


    }

    return (
        <>


            <nav className="navbar navbar-expand-lg bg-consultoria">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="https://3pservicepartner.com.br/wp-content/uploads/2025/03/3P_logo-horizontal_1-1-e1744026584210.png" alt="Logo 3P" className="img-fluid" style={{ maxHeight: 80 }} />
                    </a>
                </div>
            </nav>

            <div className="container mt-4">
                <h2 className="text-center">Diagnóstico</h2>
                <form>
                    <table className="table table-bordered table-responsive">
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    <div className="mb-3">
                                        <strong>Como está o controle e previsibilidade do fluxo de caixa da sua empresa?</strong>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="form-check">
                                            <input type="radio" name="q1" value="1" id="q1-1" onChange={handleChangeQ1} className="form-check-input" />
                                            <label htmlFor="q1-1" className="form-check-label">Não temos controle de fluxo de caixa</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q1" value="2" id="q1-2" onChange={handleChangeQ1} className="form-check-input" />
                                            <label htmlFor="q1-2" className="form-check-label">Controlamos parcialmente, com falhas e sem previsões</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q1" value="3" id="q1-3" onChange={handleChangeQ1} className="form-check-input" />
                                            <label htmlFor="q1-3" className="form-check-label">Usamos planilhas simples, com alguma previsibilidade</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q1" value="4" id="q1-4" onChange={handleChangeQ1} className="form-check-input" />
                                            <label htmlFor="q1-4" className="form-check-label">Temos sistema de controle e previsões mensais confiáveis</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q1" value="5" id="q1-5" onChange={handleChangeQ1} className="form-check-input" />
                                            <label htmlFor="q1-5" className="form-check-label">Controlamos direto, previsões de curto e médio prazo bem definidas</label>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            {/** q2 */}


                            <tr>
                                <td colSpan="2">
                                    <div className="mb-3">
                                        <strong>A margem líquida atual é conhecida e acompanhada regularmente?</strong>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="form-check">
                                            <input type="radio" name="q2" value="1" id="q2-1" onChange={handleChangeQ2} className="form-check-input" />
                                            <label htmlFor="q2-1" className="form-check-label">Não sabemos a margem líquida real</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q2" value="2" id="q2-2" onChange={handleChangeQ2} className="form-check-input" />
                                            <label htmlFor="q2-2" className="form-check-label">Temos uma ideia geral, mas não controlamos</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q2" value="3" id="q2-3" onChange={handleChangeQ2} className="form-check-input" />
                                            <label htmlFor="q2-3" className="form-check-label">Sabemos a margem, mas não analisamos causas de variação</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q2" value="4" id="q2-4" onChange={handleChangeQ2} className="form-check-input" />
                                            <label htmlFor="q2-4" className="form-check-label">Acompanhamos mensalmente e buscamos melhorá-la</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q2" value="5" id="q2-5" onChange={handleChangeQ2} className="form-check-input" />
                                            <label htmlFor="q2-5" className="form-check-label">É um indicador-chave gerenciado e otimizado continuamente</label>
                                        </div>
                                    </div>
                                </td>
                            </tr>


                            {/** q3 */}

                            <tr>
                                <td colSpan="2">
                                    <div className="mb-3">
                                        <strong>Os custos fixos e variáveis são detalhados, revisados e otimizados com frequência?</strong>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="form-check">
                                            <input type="radio" name="q3" value="1" id="q3-1" onChange={handleChangeQ3} className="form-check-input" />
                                            <label htmlFor="q3-1" className="form-check-label">Temos mapeamento dos custos</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q3" value="2" id="q3-2" onChange={handleChangeQ3} className="form-check-input" />
                                            <label htmlFor="q3-2" className="form-check-label">Não revisamos nem avaliamos</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q3" value="3" id="q3-3" onChange={handleChangeQ3} className="form-check-input" />
                                            <label htmlFor="q3-3" className="form-check-label">Identificamos principais custos, sem gestão ativa</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q3" value="4" id="q3-4" onChange={handleChangeQ3} className="form-check-input" />
                                            <label htmlFor="q3-4" className="form-check-label">Buscamos mais detalhamento com foco em redução</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q3" value="5" id="q3-5" onChange={handleChangeQ3} className="form-check-input" />
                                            <label htmlFor="q3-5" className="form-check-label">Fazemos gestão contínua, com plano contínuo de redução de desperdícios</label>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            {/** q4 */}

                            <tr>
                                <td colSpan="2">
                                    <div className="mb-3">
                                        <strong>Como está a gestão de compras e negociações com fornecedores?</strong>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="form-check">
                                            <input type="radio" name="q4" value="1" id="q4-1" onChange={handleChangeQ4} className="form-check-input" />
                                            <label htmlFor="q4-1" className="form-check-label">Compramos de forma reativa, sem negociação</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q4" value="2" id="q4-2" onChange={handleChangeQ4} className="form-check-input" />
                                            <label htmlFor="q4-2" className="form-check-label">Negociamos apenas preços, sem diretrizes</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q4" value="3" id="q4-3" onChange={handleChangeQ4} className="form-check-input" />
                                            <label htmlFor="q4-3" className="form-check-label">Negociamos preço considerando histórico e volume</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q4" value="4" id="q4-4" onChange={handleChangeQ4} className="form-check-input" />
                                            <label htmlFor="q4-4" className="form-check-label">Temos política de compras e negociações com base em histórico e volume</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q4" value="5" id="q4-5" onChange={handleChangeQ4} className="form-check-input" />
                                            <label htmlFor="q4-5" className="form-check-label">Aplicamos estratégias, analisamos TCO e temos ganhos recorrentes em compras</label>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            {/** q5 */}

                            <tr>
                                <td colSpan="2">
                                    <div className="mb-3">
                                        <strong>Qual o nível de eficiência dos processos e controle de desperdícios?</strong>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="form-check">
                                            <input type="radio" name="q5" value="1" id="q5-1" onChange={handleChangeQ5} className="form-check-input" />
                                            <label htmlFor="q5-1" className="form-check-label">Processos de produção desorganizados, sem foco em eficiência</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q5" value="2" id="q5-2" onChange={handleChangeQ5} className="form-check-input" />
                                            <label htmlFor="q5-2" className="form-check-label">Processos no padrão funcional, mas sem foco em eficiência</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q5" value="3" id="q5-3" onChange={handleChangeQ5} className="form-check-input" />
                                            <label htmlFor="q5-3" className="form-check-label">Controlamos tempo, perdas e eficiência de forma pontual</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q5" value="4" id="q5-4" onChange={handleChangeQ5} className="form-check-input" />
                                            <label htmlFor="q5-4" className="form-check-label">Medimos e analisamos os processos, com gestão baseada em eficiência</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q5" value="5" id="q5-5" onChange={handleChangeQ5} className="form-check-input" />
                                            <label htmlFor="q5-5" className="form-check-label">Processos enxutos, com melhoria contínua ativa</label>
                                        </div>
                                    </div>
                                </td>
                            </tr>


                            {/** q6 */}


                            <tr>
                                <td colSpan="2">
                                    <div className="mb-3">
                                        <strong>O preço dos produtos ou serviços é baseado em custo, margem e valor percebido?</strong>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="form-check">
                                            <input type="radio" name="q6" value="1" id="q6-1" onChange={handleChangeQ6} className="form-check-input" />
                                            <label htmlFor="q6-1" className="form-check-label">Acompanhamos preços pelo mercado ou concorrência</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q6" value="2" id="q6-2" onChange={handleChangeQ6} className="form-check-input" />
                                            <label htmlFor="q6-2" className="form-check-label">Aplicamos margem sem controle de custos reais</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q6" value="3" id="q6-3" onChange={handleChangeQ6} className="form-check-input" />
                                            <label htmlFor="q6-3" className="form-check-label">Aplicamos regras internas, mas sem validação externa</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q6" value="4" id="q6-4" onChange={handleChangeQ6} className="form-check-input" />
                                            <label htmlFor="q6-4" className="form-check-label">Buscamos composição de custos e margem desejada</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q6" value="5" id="q6-5" onChange={handleChangeQ6} className="form-check-input" />
                                            <label htmlFor="q6-5" className="form-check-label">Análise crítica de precificação com análise de valor e competitividade</label>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            {/** q7 */}

                            <tr>
                                <td colSpan="2">
                                    <div className="mb-3">
                                        <strong>Como está o giro de estoque e impacto no caixa?</strong>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="form-check">
                                            <input type="radio" name="q7" value="1" id="q7-1" onChange={handleChangeQ7} className="form-check-input" />
                                            <label htmlFor="q7-1" className="form-check-label">Estoques excessivos, sem controle de giro</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q7" value="2" id="q7-2" onChange={handleChangeQ7} className="form-check-input" />
                                            <label htmlFor="q7-2" className="form-check-label">Estoques sem ruptura frequente</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q7" value="3" id="q7-3" onChange={handleChangeQ7} className="form-check-input" />
                                            <label htmlFor="q7-3" className="form-check-label">Estoques ajustados, mas sem monitoramento de indicadores</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q7" value="4" id="q7-4" onChange={handleChangeQ7} className="form-check-input" />
                                            <label htmlFor="q7-4" className="form-check-label">Planejamos estoques e fazemos ajustes regulares</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q7" value="5" id="q7-5" onChange={handleChangeQ7} className="form-check-input" />
                                            <label htmlFor="q7-5" className="form-check-label">Gestão estratégica com equilíbrio entre disponibilidade e capital de giro</label>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            {/** q8 */}

                            <tr>
                                <td colSpan="2">
                                    <div className="mb-3">
                                        <strong>A estratégia e o planejamento estão funcionando e integrados no dia a dia?</strong>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="form-check">
                                            <input type="radio" name="q8" value="1" id="q8-1" onChange={handleChangeQ8} className="form-check-input" />
                                            <label htmlFor="q8-1" className="form-check-label">Atuamos desorganizados e sem integração entre áreas</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q8" value="2" id="q8-2" onChange={handleChangeQ8} className="form-check-input" />
                                            <label htmlFor="q8-2" className="form-check-label">Estratégias parcialmente dispersas entre áreas</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q8" value="3" id="q8-3" onChange={handleChangeQ8} className="form-check-input" />
                                            <label htmlFor="q8-3" className="form-check-label">Planejamento centralizado com fraca execução</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q8" value="4" id="q8-4" onChange={handleChangeQ8} className="form-check-input" />
                                            <label htmlFor="q8-4" className="form-check-label">Operações e finanças alinhadas junto às decisões</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q8" value="5" id="q8-5" onChange={handleChangeQ8} className="form-check-input" />
                                            <label htmlFor="q8-5" className="form-check-label">Gestão integrada com foco em performance e resultados mensuráveis</label>
                                        </div>
                                    </div>
                                </td>
                            </tr>


                            {/** q9 */}

                            <tr>
                                <td colSpan="2">
                                    <div className="mb-3">
                                        <strong>A empresa usa indicadores-chave para gestão e melhoria contínua?</strong>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="form-check">
                                            <input type="radio" name="q9" value="1" id="q9-1" onChange={handleChangeQ9} className="form-check-input" />
                                            <label htmlFor="q9-1" className="form-check-label">Não usamos indicadores</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q9" value="2" id="q9-2" onChange={handleChangeQ9} className="form-check-input" />
                                            <label htmlFor="q9-2" className="form-check-label">Temos métricas, mas não as acompanhamos</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q9" value="3" id="q9-3" onChange={handleChangeQ9} className="form-check-input" />
                                            <label htmlFor="q9-3" className="form-check-label">Acompanhamos KPIs básicos</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q9" value="4" id="q9-4" onChange={handleChangeQ9} className="form-check-input" />
                                            <label htmlFor="q9-4" className="form-check-label">KPIs intermediários, ligados ao plano da empresa</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q9" value="5" id="q9-5" onChange={handleChangeQ9} className="form-check-input" />
                                            <label htmlFor="q9-5" className="form-check-label">KPIs estratégicos atualizados com plano de ação</label>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            {/** q10 */}
                            <tr>
                                <td colSpan="2">
                                    <div className="mb-3">
                                        <strong>A equipe está bem engajada e alinhada com os objetivos da empresa?</strong>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="form-check">
                                            <input type="radio" name="q10" value="1" id="q10-1" onChange={handleChangeQ10} className="form-check-input" />
                                            <label htmlFor="q10-1" className="form-check-label">Equipe muito dividida e desmotivada</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q10" value="2" id="q10-2" onChange={handleChangeQ10} className="form-check-input" />
                                            <label htmlFor="q10-2" className="form-check-label">Cultura pouco adaptada à estratégia</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q10" value="3" id="q10-3" onChange={handleChangeQ10} className="form-check-input" />
                                            <label htmlFor="q10-3" className="form-check-label">Relacionamento adequado, mas sem cultura de resultado</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q10" value="4" id="q10-4" onChange={handleChangeQ10} className="form-check-input" />
                                            <label htmlFor="q10-4" className="form-check-label">Lideranças com metas compartilhadas</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" name="q10" value="5" id="q10-5" onChange={handleChangeQ10} className="form-check-input" />
                                            <label htmlFor="q10-5" className="form-check-label">Gestão integrada, orientada para resultados</label>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <button onClick={(e) => hendleRegistrarDiagnostico(e)} type='button' className="btn btn-success w-100">Enviar Análise</button>
                </form>
            </div>

            <footer className="text-center mt-5 py-3 bg-consultoria">
                <p className="footer-text mb-0">© 2025 3pservicepartner.com</p>
            </footer>

        </>
    )
}
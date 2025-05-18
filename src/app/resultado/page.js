'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import api from '../../services/api'

export default function Login() {
    const chartInstance = useRef(null);

    const [pontuacao, setPontuacao] = useState('');
    const [tituloResposta, setTituloResposta] = useState('');
    const [textoResposta, setTextoResposta] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('USER_TOKEN_3P');
                const response = await api.get('/respostaDiagnostico', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const total = response.data.diagnostico.total;
                setPontuacao(total);

                if (total >= 10 && total <= 20) {
                    setTituloResposta('Nível Crítico');
                    setTextoResposta('A empresa corre riscos significativos de rentabilidade, competitividade e continuidade. Recomendamos iniciar imediatamente um plano de reestruturação com apoio técnico especializado.');
                } else if (total >= 21 && total <= 35) {
                    setTituloResposta('Nível de Atenção');
                    setTextoResposta('Há fundamentos importantes em falta. É hora de agir com foco em processos, custos, precificação e indicadores.');
                } else if (total >= 36 && total <= 44) {
                    setTituloResposta('Nível Satisfatório com Oportunidades');
                    setTextoResposta('Você tem bons fundamentos, mas ainda há margem para ganhos consistentes. Podemos contribuir com ferramentas de gestão e acompanhamento contínuo para maximizar lucros e crescimento sustentável.');
                } else if (total >= 45 && total <= 50) {
                    setTituloResposta('Nível de Alta Performance');
                    setTextoResposta('Sua gestão apresenta excelência. Podemos contribuir com estratégias avançadas de expansão, automação e governança financeira para escalar os resultados com solidez.');
                }

                const ctx = document.getElementById('graficoRadar');

                // Destrói gráfico anterior se existir
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                // Cria novo gráfico
                chartInstance.current = new window.Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                        datasets: [{
                            label: 'Desempenho',
                            data: [
                                response.data.diagnostico.q1,
                                response.data.diagnostico.q2,
                                response.data.diagnostico.q3,
                                response.data.diagnostico.q4,
                                response.data.diagnostico.q5,
                                response.data.diagnostico.q6,
                                response.data.diagnostico.q7,
                                response.data.diagnostico.q8,
                                response.data.diagnostico.q9,
                                response.data.diagnostico.q10
                            ],
                            fill: true,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            r: {
                                min: 0,
                                max: 5,
                                ticks: {
                                    display: false
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        return context.label;
                                    }
                                }
                            }
                        }
                    }
                });

            } catch (error) {
                const errorMessage = error.response?.data?.error || 'Ocorreu um erro inesperado.';
                alert(errorMessage);
                router.push('/');
            }
        }

        fetchData();

        // Cleanup: destruir gráfico ao desmontar componente
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);


    const router = useRouter()

    return (

        <>
            <nav className="navbar navbar-expand-lg bg-consultoria">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="https://3pservicepartner.com.br/wp-content/uploads/2025/03/3P_logo-horizontal_1-1-e1744026584210.png" alt="Logo 3P" className="img-fluid" style={{ maxHeight: 80 }} />
                    </a>
                </div>
            </nav>

            <div className="container mt-4 text-center">
                <h2>Resultado da Análise</h2>
                <h3>Pontuação: <span id="nota">{pontuacao}</span></h3>
                <h5>{tituloResposta}</h5>
                <p>{textoResposta}</p>


                <div className="d-flex justify-content-center">
                    <div style={{ maxWidth: '1000px', width: '100%' }}>
                        <canvas
                            id="graficoRadar"
                            style={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: '500px',
                                margin: '0 auto'
                            }}
                        ></canvas>
                    </div>
                </div>
                <div className="mt-4">
                    <h5 className="text-center mb-3">Legenda dos Indicadores</h5>
                    <div className="row">
                        {[
                            '1. Fluxo de caixa controlado',
                            '2. Acompanhamento da Margem líquida',
                            '3. Análise dos custos',
                            '4. Gestão de Compras e Fornecedores',
                            '5. Eficiência dos Processos e Desperdícios',
                            '6. Avaliação de custos, margem e valor',
                            '7. Avaliação do Estoque e impacto no Caixa',
                            '8. Integração da Estratégia e Planejamento',
                            '9. Utilização e avaliação dos KPIs',
                            '10. Alinhamento e Engajamento'
                        ].map((label, index) => (
                            <div key={index} className="col-md-6 mb-2">
                                <strong>{label.split('.')[0]}.</strong> {label.split('. ')[1]}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <footer className="text-center mt-5 py-3 bg-consultoria">
                <p className="footer-text mb-0">© 2025 3pservicepartner.com</p>
            </footer>


        </>
    )
}
'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import api from '../../services/api'

export default function Login() {
    const chartInstance = useRef(null);

    const [pontuacao, setPontuacao] = useState('');
    const [tituloResposta, setTituloResposta] = useState('');
    const [corIndicador, setCorIndicador] = useState('');
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
                    setTextoResposta('A empresa corre riscos significativos de rentabilidade, competitividade e continuidade. Recomendamos iniciar imediatamente um plano de reestruturação com apoio técnico especializado.')
                    setCorIndicador('vermelho');
                } else if (total >= 21 && total <= 35) {
                    setTituloResposta('Nível de Atenção');
                    setTextoResposta('Há fundamentos importantes em falta. É hora de agir com foco em processos, custos, precificação e indicadores.')
                    setCorIndicador('laranja');
                } else if (total >= 36 && total <= 44) {
                    setTituloResposta('Nível Satisfatório com Oportunidades');
                    setTextoResposta('Você tem bons fundamentos, mas ainda há margem para ganhos consistentes. Podemos contribuir com ferramentas de gestão e acompanhamento contínuo para maximizar lucros e crescimento sustentável.')
                    setCorIndicador('amarelo');
                } else if (total >= 45 && total <= 50) {
                    setTituloResposta('Nível de Alta Performance');
                    setTextoResposta('Sua gestão apresenta excelência. Podemos contribuir com estratégias avançadas de expansão, automação e governança financeira para escalar os resultados com solidez.')
                    setCorIndicador('verde');
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
                        labels: [
                            ['1. Fluxo', 'de Caixa'],
                            ['2. Margem', 'Líquida'],
                            ['3. Controle', 'de Custos'],
                            ['4. Compras', 'e Fornecedores'],
                            ['5. Otimização', 'de Processos'],
                            ['6. Precificação', 'Produto/Serviço'],
                            ['7. Gestão', 'de Estoque'],
                            ['8. Gestão', 'Finanças/Operação'],
                            ['9. Uso de', 'Indicadores'],
                            ['10. Cultura', 'focada no Resultado']
                        ],
                        datasets: [
                            {
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
                            },
                            {
                                label: 'Mínimo recomendado - 3P',
                                data: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                                fill: false,
                                borderColor: 'rgba(255, 206, 86, 1)',
                                borderDash: [5, 5],
                                pointRadius: 0
                            },
                            {
                                label: 'Nível de Excelência',
                                data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                                fill: false,
                                borderColor: 'rgba(0, 200, 0, 1)', // verde
                                borderDash: [2, 3],
                                pointRadius: 0
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            r: {
                                min: 0,
                                max: 5,
                                ticks: {
                                    display: true,
                                    stepSize: 1,
                                    color: '#666',
                                    font: {
                                        size: 12
                                    }
                                },
                                pointLabels: {
                                    font: {
                                        size: 11
                                    }
                                },
                                grid: {
                                    circular: true
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
                                        return context.dataset.label + ': ' + context.formattedValue;
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

    const cores = {
        vermelho: 'bg-danger',
        laranja: 'bg-warning',
        amarelo: 'bg-warning-subtle',
        verde: 'bg-success'
    };

    return (

        <>
            <nav className="navbar navbar-expand-lg bg-consultoria">
                <div className="container-fluid d-flex align-items-center justify-content-between">

                    {/* Logo - sempre visível */}
                    <a className="navbar-brand mb-0" href="#">
                        <img
                            src="https://3pservicepartner.com.br/wp-content/uploads/2025/03/3P_logo-horizontal_1-1-e1744026584210.png"
                            alt="Logo 3P"
                            className="img-fluid"
                            style={{ maxHeight: 80 }}
                        />
                    </a>

                    {/* Título no mobile (à direita) */}
                    <div className="d-flex d-lg-none align-items-center">
                        <h1 className="mb-0 fw-bold text-white fs-1">Raio X</h1>
                    </div>

                    {/* Título no desktop (centralizado) */}
                    <div className="mx-auto d-none d-lg-block text-center position-absolute start-50 translate-middle-x">
                        <h1 className="mb-0 fw-bold text-white fs-2">Raio X</h1>
                    </div>

                    {/* Espaço invisível para manter layout equilibrado */}
                    <div style={{ width: 80 }} className="d-none d-lg-block"></div>
                </div>
            </nav>


            <div className="container mt-4 text-center">
                <h2>Resultado da Análise</h2>


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



                <h3 className='mt-3'>Pontuação: <span id="nota">{pontuacao}</span></h3>
                <h5 className="d-flex align-items-center justify-content-center gap-2">
                    {corIndicador && (
                        <span
                            className={`rounded-circle ${cores[corIndicador]}`}
                            style={{ width: 15, height: 15, display: 'inline-block' }}
                        ></span>
                    )}
                    {tituloResposta}
                </h5>
                <p>{textoResposta}</p>




            </div>
            <footer className="text-center mt-5 py-3 bg-consultoria">
                <p className="footer-text mb-0">© 2025 3pservicepartner.com</p>
            </footer>


        </>
    )
}
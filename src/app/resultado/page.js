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
                alert(error)
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
                            Raio X – Resultado do diagnóstico do seu negócio
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
                            Raio X – Resultado do diagnóstico do seu negócio
                        </h1>
                    </div>

                    {/* Espaço invisível para equilibrar no desktop */}
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

            {/* Estilo direto no HTML */}
            <style>
                {`
      @keyframes pulse {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.05);
          opacity: 0.85;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    `}
            </style>

            {/* Botão flutuante do WhatsApp com balão */}
            <div
                className="position-fixed"
                style={{ bottom: '20px', right: '20px', zIndex: 9999 }}
            >
                <div className="d-flex align-items-center gap-2">
                    {/* Balão de fala */}
                    <span
                        className="px-3 py-2 text-white fw-semibold"
                        style={{
                            backgroundColor: '#25D366',
                            borderRadius: '10px',
                            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                            whiteSpace: 'nowrap',
                            animation: 'pulse 2s infinite',
                        }}
                    >
                        Fale com um especialista 3P
                    </span>

                    {/* Botão WhatsApp */}
                    <a
                        href="https://wa.me/5543988081414"
                        className="btn btn-success d-flex align-items-center justify-content-center"
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Fale conosco no WhatsApp"
                    >
                        <i className="bi bi-whatsapp fs-3"></i>
                    </a>
                </div>
            </div>


        </>
    )
}
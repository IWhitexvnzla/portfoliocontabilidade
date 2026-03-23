/**
 * Amazonas Tax Hub - Core Application Logic
 * Autor: Seu Nome (Arquiteto de Software)
 * Versão: 1.1.0 (UI/UX Premium Update)
 */

// Espera o DOM (a estrutura da página) ser completamente carregado para executar o código.
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // MÓDULO DE NAVEGAÇÃO DA SPA (Single Page Application)
    // ==========================================================================
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const views = document.querySelectorAll('.view');

    // Adiciona um "ouvinte" de clique para cada link do menu.
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link (que seria recarregar a página).

            const targetId = link.getAttribute('data-target');

            // 1. Atualiza o estado visual do menu
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');

            // 2. Esconde todas as "views" e mostra apenas a view alvo.
            views.forEach(view => {
                if (view.id === targetId) {
                    view.classList.add('active');
                } else {
                    view.classList.remove('active');
                }
            });
        });
    });


    // ==========================================================================
    // MÓDULO DE CÁLCULO DE ISS (TRIBUTOS MUNICIPAIS)
    // ==========================================================================

    // --- BANCO DE DADOS DE ALÍQUOTAS (em formato JSON) ---
    const aliquotasISS = {
        "servico-geral": 0.05,  // 5%
        "consultoria": 0.03,    // 3%
        "construcao": 0.02      // 2%
    };

    // --- CAPTURA DOS ELEMENTOS DO DOM ---
    const btnCalcularIss = document.getElementById('btn-calcular-iss');
    const selectServico = document.getElementById('iss-servico');
    const inputValorNota = document.getElementById('iss-valor-nota');
    const resultadoContainer = document.getElementById('iss-resultado-container'); // Container principal do resultado
    const resultadoTextoEl = document.getElementById('resultado-iss'); // Onde o texto do resultado aparece

    // --- FUNÇÃO DE CÁLCULO ---
    function calcularISS() {
        const tipoServico = selectServico.value;
        const valorNota = parseFloat(inputValorNota.value);

        // Limpa classes de estado anteriores do CONTAINER
        resultadoContainer.classList.remove('sucesso', 'erro');

        // Validação de entrada
        if (!tipoServico || isNaN(valorNota) || valorNota <= 0) {
            resultadoTextoEl.textContent = "Por favor, preencha todos os campos com valores válidos.";
            resultadoContainer.classList.add('erro'); // Aplica a classe de erro ao container
            return; // Encerra a função
        }

        // Lógica de negócio
        const aliquota = aliquotasISS[tipoServico];
        const valorImposto = valorNota * aliquota;

        // Formatação do resultado para moeda brasileira (BRL)
        const valorFormatado = valorImposto.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        // Exibição do resultado no DOM
        resultadoTextoEl.textContent = valorFormatado;
        resultadoContainer.classList.add('sucesso'); // Aplica a classe de sucesso ao container
    }

    // --- OUVINTE DE EVENTO ---
    if (btnCalcularIss) {
        btnCalcularIss.addEventListener('click', calcularISS);
    }

}); // Fim do 'DOMContentLoaded'

import { supabase } from './supabase.js';

// Função pra contar o total de produtos
async function carregarTotalProdutos() {
  try {
    const { count, error } = await supabase
      .from('produtos') 
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    document.getElementById('total-produtos').innerText = count !== null ? count : 0;
  } catch (erro) {
    console.error("Deu ruim ao puxar produtos:", erro.message);
    document.getElementById('total-produtos').innerText = 'Erro';
  }
}

// Função pra contar o total de clientes
async function carregarTotalClientes() {
  try {
    const { count, error } = await supabase
      .from('clientes') // Puxando do plural, como tava dando bom!
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    document.getElementById('total-clientes').innerText = count !== null ? count : 0;
  } catch (erro) {
    console.error("Deu ruim ao puxar clientes:", erro.message);
    document.getElementById('total-clientes').innerText = 'Erro';
  }
}

// Função pra montar o gráfico bolado
async function montarGrafico() {
  try {
    // Puxa tudo da tabela de produtos
    const { data, error } = await supabase.from('produtos').select('*');
    if (error) throw error;

    // Lógica pra agrupar os produtos por categoria. 
    // Obs: Se lá no teu Supabase a coluna não chamar "categoria", troca aqui!
    const categorias = {};
    data.forEach(prod => {
      const cat = prod.categoria || 'Sem Categoria'; 
      categorias[cat] = (categorias[cat] || 0) + 1; 
    });

    const ctx = document.getElementById('stockChart').getContext('2d');
    
    // Taca o estilo dark com tons de vermelho
    new Chart(ctx, {
      type: 'doughnut', 
      data: {
        labels: Object.keys(categorias),
        datasets: [{
          label: 'Quantidade de Produtos',
          data: Object.values(categorias),
          backgroundColor: [
            '#dc2626', // red-600
            '#991b1b', // red-800
            '#f87171', // red-400
            '#450a0a', // red-950
            '#ffffff'  // branco
          ],
          borderColor: '#000000',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { color: '#a3a3a3' }
          }
        }
      }
    });

  } catch (erro) {
    console.error("Deu zica no gráfico:", erro.message);
  }
}

// Manda rodar TUDO de uma vez quando a página abrir
document.addEventListener('DOMContentLoaded', () => {
  carregarTotalProdutos();
  carregarTotalClientes();
  carregarValorTotal(); // <-- Só adicionar essa linha aqui!
  montarGrafico(); 
});

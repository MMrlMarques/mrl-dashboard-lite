import { supabase } from './supabase.js';

// Busca os produtos certinho (esse aqui a gente acertou!)
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
// Função pra montar o gráfico bolado
async function montarGrafico() {
  try {
    // Puxa tudo da tabela de produtos
    const { data, error } = await supabase.from('produtos').select('*');
    if (error) throw error;

    // Lógica pra agrupar. 
    // Obs: Confere se a tua coluna lá no banco se chama 'categoria' mesmo. Se for diferente, altera aqui embaixo!
    const categorias = {};
    data.forEach(prod => {
      const cat = prod.categoria || 'Sem Categoria'; // Se o campo no banco for diferente, troca o .categoria
      categorias[cat] = (categorias[cat] || 0) + 1; 
    });

    const ctx = document.getElementById('stockChart').getContext('2d');
    
    // Taca o estilo dark com tons de vermelho
    new Chart(ctx, {
      type: 'doughnut', // Fica brabo, mas se quiser barra troca pra 'bar'
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

// Manda rodar tudo quando a página abrir
document.addEventListener('DOMContentLoaded', () => {
  carregarTotalProdutos();
  carregarTotalClientes();
  montarGrafico(); // <-- Adiciona essa linha aqui pra ele renderizar o gráfico!
});

// Voltando a puxar os clientes no plural, que é como tava funcionando antes
async function carregarTotalClientes() {
  try {
    const { count, error } = await supabase
      .from('clientes') // VOLTAMOS PRO PLURAL AQUI!
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    document.getElementById('total-clientes').innerText = count !== null ? count : 0;
  } catch (erro) {
    console.error("Deu ruim ao puxar clientes:", erro.message);
    document.getElementById('total-clientes').innerText = 'Erro';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  carregarTotalProdutos();
  carregarTotalClientes();
});

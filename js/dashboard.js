import { supabase } from './supabase.js';

// Função pra buscar o total de produtos na tabela 'produtos'
async function carregarTotalProdutos() {
  try {
    const { count, error } = await supabase
      .from('produtos') // Corrigido para 'produtos'
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    document.getElementById('total-produtos').innerText = count !== null ? count : 0;
  } catch (erro) {
    console.error("Deu ruim ao puxar produtos:", erro.message);
    document.getElementById('total-produtos').innerText = 'Erro';
  }
}

// Função pra buscar o total de clientes na tabela 'cliente'
async function carregarTotalClientes() {
  try {
    const { count, error } = await supabase
      .from('cliente') // Corrigido para 'cliente'
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    document.getElementById('total-clientes').innerText = count !== null ? count : 0;
  } catch (erro) {
    console.error("Deu ruim ao puxar clientes:", erro.message);
    document.getElementById('total-clientes').innerText = 'Erro';
  }
}

// Dispara o carregamento quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  carregarTotalProdutos();
  carregarTotalClientes();
});

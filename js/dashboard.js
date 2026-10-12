import { supabase } from './supabase.js';

// Função pra contar a porrada de produto que tu tem
async function carregarTotalProdutos() {
  try {
    const { count, error } = await supabase
      .from('estoque') // Se a tabela tiver outro nome, muda aqui
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    document.getElementById('total-produtos').innerText = count || 0;
  } catch (erro) {
    console.error("Deu merda ao puxar produtos:", erro.message);
    document.getElementById('total-produtos').innerText = 'Erro';
  }
}

// Função pra contar os clientes
async function carregarTotalClientes() {
  try {
    const { count, error } = await supabase
      .from('clientes') // Se a tabela tiver outro nome, muda aqui
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    document.getElementById('total-clientes').innerText = count || 0;
  } catch (erro) {
    console.error("Deu merda ao puxar clientes:", erro.message);
    document.getElementById('total-clientes').innerText = 'Erro';
  }
}

// Manda rodar tudo quando a página abrir
document.addEventListener('DOMContentLoaded', () => {
  carregarTotalProdutos();
  carregarTotalClientes();
});

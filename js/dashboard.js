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

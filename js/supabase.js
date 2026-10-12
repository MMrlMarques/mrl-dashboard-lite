// Importa a função de criar o cliente direto do CDN do Supabase (módulo ES6)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Substitua pelas chaves reais do seu projeto Mrl Stock & CRM
const supabaseUrl = 'https://SEU_PROJETO_URL.supabase.co'
const supabaseKey = 'SUA_CHAVE_ANON_KEY'

// Inicia a conexão. O 'export' permite que a gente use essa variável supabase nos outros arquivos JS.
export const supabase = createClient(supabaseUrl, supabaseKey)

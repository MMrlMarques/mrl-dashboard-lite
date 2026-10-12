// Importa a função de criar o cliente direto do CDN do Supabase (módulo ES6)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Tuas credenciais reais do Mrl Stock & CRM já engatilhadas aqui:
const supabaseUrl = 'https://doxzbpjczenukympjltu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRveHpicGpjemVudWt5bXBqbHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2NDIyMDEsImV4cCI6MjEwNzIxODIwMX0.KVxTbUi7QKBJG0HaHoqc_wjvqiSL2WXXA6ar39nJ_v4'

// Inicia a conexão braba
export const supabase = createClient(supabaseUrl, supabaseKey)

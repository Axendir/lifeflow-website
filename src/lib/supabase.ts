import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wkfvuivokvquwmebnzrt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZnZ1aXZva3ZxdXdtZWJuenJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MTIzODMsImV4cCI6MjA5MDE4ODM4M30.PDYc71sg-DGS-Lfw3iPqwMwNuuzBcy8N1ksyPS2sVrQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

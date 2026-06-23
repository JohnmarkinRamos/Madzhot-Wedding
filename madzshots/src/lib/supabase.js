import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'xqycjnueybgrhjkgawqd.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_S8EUMZ2OOQ3_wYpDsyGjpg_NK751qUv'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

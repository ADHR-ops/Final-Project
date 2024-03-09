import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://oqjtlersgczldlzrnljt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xanRsZXJzZ2N6bGRsenJubGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyODQ5NDEsImV4cCI6MjAxNTg2MDk0MX0.00gHU49iZDnKdi8f0cJx9MDaKIbDe6NzPFDZ0mirzc8'

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})


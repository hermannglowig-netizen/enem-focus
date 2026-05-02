import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jykypquiieeicjuwhreh.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5a3lwcXVpaWVlaWNqdXdocmVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MjUzOTcsImV4cCI6MjA5MjQwMTM5N30.ChkPHqtZFNzXigO9rqszkExHFzpHE9hWjGNyiJTvnr0'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
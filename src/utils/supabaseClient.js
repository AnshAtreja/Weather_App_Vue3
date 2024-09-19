import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lndnovbboektarmosupf.supabase.co';  
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuZG5vdmJib2VrdGFybW9zdXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQyMTU1OTYsImV4cCI6MjAzOTc5MTU5Nn0.LNJhCyEHMtbjgDlNXrk_L42UTiMDnE6giPkUJacIJEw';  

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

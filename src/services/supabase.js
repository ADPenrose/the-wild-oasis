import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://opfnzaaxguotzblabyvm.supabase.co';
// Since RLS is active, anyone with this key can only do what we allow in the RLS policies, so there is no need to hide it.
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wZm56YWF4Z3VvdHpibGFieXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyNjE4MzksImV4cCI6MjAyMDgzNzgzOX0.Ij4BoLJGoKVLAM-pxJ7RdR-3xEJz_kDcrJ7JfUrQg8U';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

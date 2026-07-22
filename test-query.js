const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf-8');
const envVars = envFile.split('\n').reduce((acc, line) => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    acc[key.trim()] = valueParts.join('=').trim();
  }
  return acc;
}, {});

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

async function testQuery() {
  const slug = 'sakading-sakading-ee-pak-dung-ding';
  const { data, error } = await supabase.from('news').select('*').eq('slug', slug).single();
  if (error) {
    console.error('ERROR for', slug, ':', error);
  } else {
    console.log('FOUND:', data.title);
  }

  const spaceSlug = 'sakading sakading ee pak dung ding';
  const { data: d2, error: e2 } = await supabase.from('news').select('*').eq('slug', spaceSlug.replace(/\s+/g, '-')).single();
  if (e2) {
    console.error('ERROR for spaced', spaceSlug, ':', e2);
  } else {
    console.log('FOUND spaced fallback:', d2.title);
  }
}

testQuery();

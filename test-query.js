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
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('ERROR:', error);
  } else {
    console.log('PRODUCTS:');
    data.forEach(p => console.log(`- ${p.name} (Category: ${p.category})`));
  }
}

testQuery();

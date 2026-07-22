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
  const { data, error } = await supabase.from('news').select('title, slug');
  if (error) {
    console.error('ERROR:', error);
  } else {
    console.log('NEWS ITEMS:');
    data.forEach(item => {
      console.log(`Title: "${item.title}"`);
      console.log(`Slug: "${item.slug}"`);
    });
  }
}

testQuery();

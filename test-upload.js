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

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing supabase URL or Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpload() {
  console.log('Testing upload to bucket "images"...');
  const dummyFileContent = 'Hello World';
  const file = Buffer.from(dummyFileContent, 'utf-8');
  
  const { data, error } = await supabase.storage
    .from('images')
    .upload('test/dummy.txt', file, {
      contentType: 'text/plain',
      upsert: true
    });
    
  if (error) {
    console.error('UPLOAD ERROR:', error.message);
    console.error(error);
  } else {
    console.log('UPLOAD SUCCESS:', data);
  }
}

testUpload();

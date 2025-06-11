import fs from 'fs';
import path from 'path';
import conn from '../Mysql.database.js';

const proceduresDir = path.join(process.cwd(), 'database/procedures');

async function getExistingProcedures() {
  const [results] = await conn.query(`
    SELECT routine_name FROM information_schema.routines 
    WHERE routine_schema = DATABASE() AND routine_type = 'PROCEDURE'
  `);

  return results.map(row => (row.routine_name || row.ROUTINE_NAME));
}

async function deployNewProcedures() {
  const existingProcedures = await getExistingProcedures();

  const files = fs.readdirSync(proceduresDir);

  for (const file of files) {
    if (!file.endsWith('.sql')) continue;

    const procedureName = path.basename(file, '.sql');
    console.log("procedureName: ", procedureName);
    

    if (existingProcedures.includes(procedureName)) {
      console.log(`✅ Skipping existing procedure: ${procedureName}`);
      continue;
    }

    const sql = fs.readFileSync(path.join(proceduresDir, file), 'utf8');
    try {
      await conn.query(sql);
      console.log(`🆕 Created procedure: ${procedureName}`);
    } catch (err) {
      console.error(`❌ Error in ${procedureName}:`, err.message);
    }
  }
}

deployNewProcedures().then(() => {
  console.log('🎉 SP deployment completed.');
  process.exit(0);
}).catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
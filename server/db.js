const { Pool } = require('pg');

const pool = new Pool({
  user: 'jose',
  host: 'dpg-d1jd8qbe5dus73c54uhg-a.virginia-postgres.render.com',
  database: 'mi_tienda',
  password: 'jGyLrlCAWH5pXKQkGbcHbKZt2BNVtFiv',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;

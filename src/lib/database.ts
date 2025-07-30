import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'isoart.com.br',
  user: process.env.DB_USER || 'isoart_api',
  password: process.env.DB_PASSWORD || 'HWqhEhMBVQ2p8IT4',
  database: process.env.DB_NAME || 'isoart_site',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
};

// Pool de conexões
const pool = mysql.createPool(dbConfig);

export default pool; 
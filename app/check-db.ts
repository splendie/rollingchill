// Check if you have a database connection file

// Example test connection:
import { sql } from '@vercel/postgres';
// or import your database client

export async function testConnection() {
  try {
    const result = await sql`SELECT 1`;
    console.log('✅ Database connected:', result);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}
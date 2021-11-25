import {knex, Knex} from 'knex'

interface User {
  id: number,
  name: string
}

export const connectDB = async () => {
  const config: Knex.Config = {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB
    }
  }

  return knex(config)
}


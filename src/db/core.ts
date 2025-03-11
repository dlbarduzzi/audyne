import postgres from "postgres"

import { env } from "@/env/server"
import { users } from "@/db/schemas/users"
import { drizzle } from "drizzle-orm/postgres-js"

const schema = { users }

const client = postgres(env.DATABASE_URL, { max: undefined })
const connect = drizzle({ client, schema })

export const db = connect

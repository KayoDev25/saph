import { drizzle } from "drizzle-orm/node-postgres"
import { pgTable, serial, text, doublePrecision, timestamp } from "drizzle-orm/pg-core"
import { Pool } from "pg"

export const telegramReports = pgTable("telegram_reports", {
  id: serial("id").primaryKey(),
  telegramChatId: text("telegram_chat_id").notNull(),
  telegramUserId: text("telegram_user_id"),
  neighborhood: text("neighborhood").notNull(),
  description: text("description").notNull(),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  status: text("status").notNull(),
  urgency: text("urgency").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
})

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
export const db = drizzle(pool)

export type TelegramReport = typeof telegramReports.$inferSelect

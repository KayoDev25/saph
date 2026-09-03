import { NextResponse } from "next/server"
import { desc } from "drizzle-orm"
import { db, telegramReports } from "@/lib/db"

export const runtime = "nodejs"

export async function GET() {
  const reports = await db.select().from(telegramReports).orderBy(desc(telegramReports.createdAt)).limit(20)
  return NextResponse.json(reports)
}

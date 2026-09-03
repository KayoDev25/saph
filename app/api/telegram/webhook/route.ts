import { NextResponse } from "next/server"
import { db, telegramReports } from "@/lib/db"

export const runtime = "nodejs"

function parseLocation(text: string) {
  const match = text.match(/(-?\d{1,3}\.\d+)\s*[,; ]\s*(-?\d{1,3}\.\d+)/)
  return match ? { latitude: Number(match[1]), longitude: Number(match[2]) } : {}
}

export async function POST(request: Request) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET
  if (secret && request.headers.get("x-telegram-bot-api-secret-token") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const update = await request.json()
  const message = update?.message
  if (!message?.chat?.id) return NextResponse.json({ ok: true })

  const description = message.text || message.caption || "Reporte con archivo multimedia"
  const location = message.location
    ? { latitude: message.location.latitude, longitude: message.location.longitude }
    : parseLocation(description)

  const inserted = await db.insert(telegramReports).values({
    telegramChatId: String(message.chat.id),
    telegramUserId: message.from?.id ? String(message.from.id) : null,
    neighborhood: "Sin identificar",
    description: description.slice(0, 2000),
    ...location,
    status: "Pendiente",
    urgency: "Media",
    createdAt: new Date(),
  }).returning({ id: telegramReports.id })

  if (process.env.TELEGRAM_BOT_TOKEN) {
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: message.chat.id, text: `Reporte recibido. ID SAPH #R-${inserted[0].id}. La municipalidad ya fue notificada.` }),
    })
  }

  return NextResponse.json({ ok: true })
}

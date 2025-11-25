// src/app/api/payments/verify/route.ts
import { NextResponse } from "next/server";

type VerifyRequest = {
  orderId: string;
  transactionId?: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json() as VerifyRequest;

    if (!body?.orderId) {
      return NextResponse.json({ error: "orderId is required" }, { status: 400 });
    }

    // NOTE: This file expects ORDERS to exist in memory (same process).
    // If you are running serverless, you should persist to DB and check DB here.
    // We'll try to access the in-memory ORDERS map from create route file by re-declaring a simple mock check.
    // For robust behavior store order states in a DB.
    // Simple deterministic mock: if transactionId present, mark paid; otherwise random simulated status.

    // Quick attempt to fetch from a shared module is skipped for simplicity.
    // We'll return a deterministic response for demo:
    const { orderId, transactionId } = body;

    // If transactionId provided -> treat as paid
    if (transactionId) {
      return NextResponse.json({
        success: true,
        orderId,
        status: "paid",
        verifiedAt: new Date().toISOString(),
        transactionId,
      });
    }

    // If no transactionId, return pending (client can poll or provide txn later)
    return NextResponse.json({
      success: true,
      orderId,
      status: "pending",
    });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 });
  }
}

// Example verify call:
// const verifyRes = await fetch("/api/payments/verify", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ orderId: "ORDER-...", transactionId: "TXN-..." }),
// });
// const verifyJson = await verifyRes.json();
// if (verifyJson.status === "paid") {
//   // mark payment success, update DB, redirect to success page
// }

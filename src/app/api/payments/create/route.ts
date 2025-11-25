// src/app/api/payments/create/route.ts
import { NextResponse } from "next/server";

type CreateRequest = {
  amount: number;
  applicationId: string;
  method?: "upi" | "card" | "netbanking" | "offline";
  meta?: Record<string, any>;
};

// Simple in-memory mock store (for demo only). In production use DB.
const ORDERS = new Map<string, any>();

function makeId(prefix = "ORD") {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateRequest;

    if (!body?.amount || !body?.applicationId) {
      return NextResponse.json(
        { error: "amount and applicationId are required" },
        { status: 400 }
      );
    }

    const orderId = makeId("ORDER");
    const order = {
      orderId,
      amount: body.amount,
      applicationId: body.applicationId,
      method: body.method ?? "upi",
      meta: body.meta ?? {},
      createdAt: new Date().toISOString(),
      status: "created",
      // mock payment url (frontend can redirect or open this)
      paymentUrl: `/api/payments/mock-pay/${orderId}`,
      // IMPORTANT: local developer file path you uploaded — toolchain will transform this to a real URL.
      receiptUrl: "/mnt/data/Declartion.pdf",
    };

    ORDERS.set(orderId, order);

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 });
  }
}

// Example create call (from your payment page):
// // create order
// const res = await fetch("/api/payments/create", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ amount: 500, applicationId: "APPL-2025-0001", method: "upi" }),
// });
// const data = await res.json();
// data.order.paymentUrl -> open or embed in iframe / redirect
// data.order.receiptUrl -> currently the local path: "/mnt/data/Declartion.pdf"

// src/lib/mockAuthStore.ts
type OtpEntry = {
  email: string;
  otp: string;
  expiresAt: number; // epoch ms
  attempts: number;
};

type ResetTokenEntry = {
  email: string;
  token: string;
  expiresAt: number;
};

const OTP_STORE = new Map<string, OtpEntry>(); // requestId -> OtpEntry
const RESET_STORE = new Map<string, ResetTokenEntry>(); // token -> ResetTokenEntry

export function createOtp(requestId: string, email: string, otp: string, ttlSeconds = 300) {
  OTP_STORE.set(requestId, {
    email,
    otp,
    expiresAt: Date.now() + ttlSeconds * 1000,
    attempts: 0,
  });
}

export function getOtp(requestId: string) {
  const entry = OTP_STORE.get(requestId);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    OTP_STORE.delete(requestId);
    return null;
  }
  return entry;
}

export function consumeOtp(requestId: string) {
  OTP_STORE.delete(requestId);
}

export function incOtpAttempts(requestId: string) {
  const e = OTP_STORE.get(requestId);
  if (e) {
    e.attempts = (e.attempts ?? 0) + 1;
    OTP_STORE.set(requestId, e);
  }
}

export function createResetToken(token: string, email: string, ttlSeconds = 900) {
  RESET_STORE.set(token, { email, token, expiresAt: Date.now() + ttlSeconds * 1000 });
}

export function getResetToken(token: string) {
  const entry = RESET_STORE.get(token);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    RESET_STORE.delete(token);
    return null;
  }
  return entry;
}

export function consumeResetToken(token: string) {
  RESET_STORE.delete(token);
}

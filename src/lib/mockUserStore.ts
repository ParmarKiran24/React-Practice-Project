// src/lib/mockUserStore.ts
import bcrypt from "bcryptjs";

type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  passwordHash: string;
  verified?: boolean;
  verificationToken?: string | null;
  createdAt: string;
};

const USERS = new Map<string, User>();

export function makeUserId() {
  return `U-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
}

export async function createUser(payload: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
}) {
  const { email, password, firstName, lastName, mobile } = payload;
  // check existing
  for (const u of USERS.values()) {
    if (u.email.toLowerCase() === email.toLowerCase()) {
      throw new Error("User already exists");
    }
  }
  const id = makeUserId();
  const passwordHash = await bcrypt.hash(password, 10);
  const user: User = {
    id,
    email,
    firstName,
    lastName,
    mobile,
    passwordHash,
    verified: false,
    verificationToken: null,
    createdAt: new Date().toISOString(),
  };
  USERS.set(id, user);
  return user;
}

export function findUserByEmail(email: string) {
  return Array.from(USERS.values()).find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function setVerificationToken(userId: string, token: string) {
  const u = USERS.get(userId);
  if (!u) return;
  u.verificationToken = token;
  USERS.set(userId, u);
}

export function verifyUserByToken(token: string) {
  for (const [id, u] of USERS.entries()) {
    if (u.verificationToken === token) {
      u.verified = true;
      u.verificationToken = null;
      USERS.set(id, u);
      return u;
    }
  }
  return null;
}

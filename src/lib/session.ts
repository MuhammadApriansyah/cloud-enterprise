import { SignJWT, jwtVerify, JWTPayload } from "jose";

// PERBAIKAN 1: Deterministic Behavior. Pastikan secret tidak undefined yang memicu runtime error.
const secretKey = process.env.JWT_SECRET_KEY;
if (!secretKey) {
  throw new Error("[FATAL] JWT_SECRET_KEY tidak terdefinisi di Environment Variables.");
}
const key = new TextEncoder().encode(secretKey);

// PERBAIKAN 2: Explicit Contract (EFSER Vol VII Ch 3). Tidak boleh pakai 'any'.
export interface SessionPayload extends JWTPayload {
  pat: string;
  role: "USER" | "ADMIN";
}

export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS512" })
    .setIssuedAt()
    .setExpirationTime("12h") // Sesi otomatis hancur dalam 12 jam
    .sign(key);
}

export async function decrypt(input: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS512"],
    });
    return payload as SessionPayload;
  } catch (error) {
    // PERBAIKAN 3: Observability Governance. Kita tidak menelan error tanpa jejak.
    console.warn(`[SECURITY] Dekripsi sesi gagal atau token kedaluwarsa. Reason: ${(error as Error).message}`);
    return null; 
  }
}


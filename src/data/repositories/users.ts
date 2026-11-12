import type { Role, User } from "@/domain/schemas";
import { clone, getDb, latency } from "../db";

export async function listUsers(role?: Role): Promise<User[]> {
  await latency(100);
  return clone(getDb().users.filter((u) => !role || u.role === role));
}

export function getUserSync(id: string): User | undefined {
  return getDb().users.find((u) => u.id === id);
}

export async function getUser(id: string): Promise<User | undefined> {
  await latency(100);
  const u = getUserSync(id);
  return u && clone(u);
}

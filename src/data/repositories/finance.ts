import { clone, getDb, latency } from "../db";

export async function listTransactions() {
  await latency();
  return clone(getDb().transactions).sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}

export async function financeSummary() {
  await latency();
  const { transactions, properties } = getDb();
  const sum = (kind: string, status?: string) =>
    transactions
      .filter((t) => t.kind === kind && (!status || t.status === status))
      .reduce((acc, t) => acc + t.amount, 0);
  return {
    salesVolume: sum("sale"),
    commissions: sum("commission"),
    feesPaid: sum("publication_fee", "paid"),
    feesPending: sum("publication_fee", "pending"),
    approved: properties.filter((p) => p.status === "approved").length,
    pending: properties.filter((p) => p.status === "pending_review").length,
  };
}

import {
  assertCanCreateNotary,
  assertCanScheduleVisit,
  assignBroker,
  DomainError,
} from "@/domain/rules";
import type { NotaryAppointment, Visit } from "@/domain/schemas";
import { clone, getDb, latency, mutate, newId } from "../db";

export async function scheduleVisit(input: {
  propertyId: string;
  tenantId: string;
  date: string;
  slot: Visit["slot"];
}) {
  await latency(400);
  return mutate((db) => {
    const p = db.properties.find((x) => x.id === input.propertyId);
    const tenant = db.users.find((u) => u.id === input.tenantId);
    if (!p || !tenant) throw new DomainError("Datos de la visita inválidos.");
    assertCanScheduleVisit(p, tenant);
    const dup = db.visits.some(
      (v) =>
        v.propertyId === p.id &&
        v.tenantId === tenant.id &&
        v.status === "scheduled",
    );
    if (dup)
      throw new DomainError(
        "Ya tienes una visita agendada para este inmueble.",
      );
    const brokers = db.users.filter((u) => u.role === "broker");
    const broker = assignBroker(brokers, db.visits, input.date, input.slot);
    if (!broker)
      throw new DomainError("No hay brokers disponibles en ese horario.");
    const visit: Visit = {
      id: newId("v"),
      ...input,
      brokerId: broker.id,
      status: "scheduled",
      createdAt: new Date().toISOString(),
    };
    db.visits.push(visit);
    return clone(visit);
  });
}

const bySchedule = (a: Visit, b: Visit) =>
  `${a.date} ${a.slot}`.localeCompare(`${b.date} ${b.slot}`);

export async function listVisitsForTenant(tenantId: string) {
  await latency();
  return clone(
    getDb()
      .visits.filter((v) => v.tenantId === tenantId)
      .sort(bySchedule),
  );
}

export async function listVisitsForBroker(brokerId: string) {
  await latency();
  return clone(
    getDb()
      .visits.filter((v) => v.brokerId === brokerId)
      .sort(bySchedule),
  );
}

export async function setVisitStatus(
  visitId: string,
  userId: string,
  status: "completed" | "cancelled",
  notes?: string,
) {
  await latency();
  return mutate((db) => {
    const v = db.visits.find((x) => x.id === visitId);
    if (!v) throw new DomainError("Visita no encontrada.");
    const allowed =
      status === "completed"
        ? v.brokerId === userId
        : [v.brokerId, v.tenantId].includes(userId);
    if (!allowed) throw new DomainError("No puedes modificar esta visita.");
    if (v.status !== "scheduled")
      throw new DomainError("La visita ya fue cerrada.");
    v.status = status;
    if (notes) v.notes = notes;
    return clone(v);
  });
}

export async function createNotaryAppointment(input: {
  visitId: string;
  brokerId: string;
  notary: string;
  date: string;
  time: string;
}) {
  await latency(400);
  return mutate((db) => {
    const visit = db.visits.find((v) => v.id === input.visitId);
    const broker = db.users.find((u) => u.id === input.brokerId);
    if (!visit || !broker) throw new DomainError("Datos inválidos.");
    assertCanCreateNotary(visit, broker);
    const property = db.properties.find((p) => p.id === visit.propertyId)!;
    const appt: NotaryAppointment = {
      id: newId("n"),
      propertyId: property.id,
      visitId: visit.id,
      brokerId: broker.id,
      buyerId: visit.tenantId,
      sellerId: property.ownerId,
      notary: input.notary,
      date: input.date,
      time: input.time,
      status: "scheduled",
      createdAt: new Date().toISOString(),
    };
    db.notaryAppointments.push(appt);
    return clone(appt);
  });
}

export async function listNotaryAppointments(userId: string) {
  await latency();
  return clone(
    getDb().notaryAppointments.filter((n) =>
      [n.brokerId, n.buyerId, n.sellerId].includes(userId),
    ),
  );
}

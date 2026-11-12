"use client";

import { useState, type ReactNode } from "react";
import { Inbox } from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  Modal,
  Select,
  Skeleton,
  StatusBadge,
} from "@/components/ui";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

const SWATCHES = [
  "brand",
  "ink",
  "ink-muted",
  "surface-muted",
  "line",
  "success",
  "warning",
  "danger",
  "info",
];

export function DesignGallery() {
  const [modal, setModal] = useState<"dialog" | "sheet" | null>(null);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-10 sm:px-6">
      <header>
        <h1 className="text-3xl font-bold">Sistema de diseño Habi</h1>
        <p className="text-ink-muted mt-2">
          Tokens y componentes base de la aplicación.
        </p>
      </header>

      <Section title="Color">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {SWATCHES.map((s) => (
            <div key={s} className="flex flex-col gap-1.5">
              <div
                className="border-line h-14 rounded-md border"
                style={{ background: `var(--${s})` }}
              />
              <code className="text-ink-muted text-xs">{s}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Botones">
        <div className="flex flex-wrap gap-3">
          <Button>Agendar visita</Button>
          <Button variant="secondary">Guardar borrador</Button>
          <Button variant="ghost">Cancelar</Button>
          <Button variant="danger">Rechazar</Button>
          <Button disabled>Deshabilitado</Button>
          <Button size="sm">Pequeño</Button>
          <Button size="lg">Grande</Button>
        </div>
      </Section>

      <Section title="Formularios">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Dirección" placeholder="Cra. 7 # 72-41" />
          <Input
            label="Precio (COP)"
            hint="Sin puntos ni comas"
            inputMode="numeric"
          />
          <Input label="Área (m²)" error="El área debe ser mayor a 0" />
          <Select
            label="Tipo de inmueble"
            placeholder="Selecciona"
            options={[
              { value: "house", label: "Casa" },
              { value: "apartment", label: "Apartamento" },
            ]}
          />
        </div>
      </Section>

      <Section title="Badges de estado">
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="draft" />
          <StatusBadge status="pending_review" />
          <StatusBadge status="approved" />
          <StatusBadge status="rejected" />
          <Badge tone="info">Nuevo</Badge>
        </div>
      </Section>

      <Section title="Avatar, tarjeta y skeleton">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="flex items-center gap-3">
            <Avatar name="Camilo Rojas" />
            <div>
              <p className="font-semibold">Camilo Rojas</p>
              <p className="text-ink-muted text-sm">Broker asignado</p>
            </div>
          </Card>
          <Card className="flex flex-col gap-3">
            <Skeleton className="aspect-[4/3] w-full rounded-md" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </Card>
          <Card>
            <EmptyState
              icon={<Inbox />}
              title="Sin solicitudes"
              description="No hay inmuebles por revisar."
            />
          </Card>
        </div>
      </Section>

      <Section title="Modal y sheet">
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setModal("dialog")}>
            Abrir modal
          </Button>
          <Button variant="secondary" onClick={() => setModal("sheet")}>
            Abrir sheet
          </Button>
        </div>
        <Modal
          open={modal !== null}
          variant={modal ?? "dialog"}
          onClose={() => setModal(null)}
          title="Rechazar inmueble"
          footer={
            <>
              <Button variant="ghost" onClick={() => setModal(null)}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={() => setModal(null)}>
                Rechazar
              </Button>
            </>
          }
        >
          <Input label="Motivo del rechazo" placeholder="Falta la escritura" />
        </Modal>
      </Section>
    </div>
  );
}

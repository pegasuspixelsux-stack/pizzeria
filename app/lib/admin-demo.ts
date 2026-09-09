/**
 * Datos y credenciales de MUESTRA para el panel /admin.
 *
 * Esto NO es un backend. No hay autenticación real, no se persiste nada:
 * el panel es una maqueta funcional para mostrarle al dueño cómo se vería
 * la gestión de carta y reservas. Al recargar, todo vuelve al estado inicial.
 */

export const DEMO_CREDENTIALS = {
  email: "admin@pizzeria.uy",
  password: "demo1234",
};

export const ADMIN_SESSION_KEY = "pizzeria-admin-demo";

export type ReservationStatus = "pendiente" | "confirmada" | "rechazada";

export interface ReservationRequest {
  id: string;
  name: string;
  phone?: string; // as dialled, e.g. "+598 99 845 210" — also used for WhatsApp
  email?: string;
  date: string; // ISO (YYYY-MM-DD)
  time: string;
  guests: number;
  seating: string;
  note?: string;
  status: ReservationStatus;
  createdAt: string; // ISO datetime
}

/** Digits only, for tel: and wa.me links. */
export function toDigits(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

export const statusLabels: Record<ReservationStatus, string> = {
  pendiente: "Pendiente",
  confirmada: "Confirmada",
  rechazada: "Rechazada",
};

export const SEED_RESERVATIONS: ReservationRequest[] = [
  {
    id: "r1",
    name: "Familia Methol",
    phone: "+598 99 845 210",
    date: "2026-09-12",
    time: "21:15",
    guests: 5,
    seating: "Terraza",
    note: "Cumpleaños — si se puede, mesa contra la ventana.",
    status: "pendiente",
    createdAt: "2026-09-09T13:40:00",
  },
  {
    id: "r2",
    name: "Lucía Barreiro",
    phone: "+598 98 112 640",
    email: "lucia.barreiro@gmail.com",
    date: "2026-09-12",
    time: "20:30",
    guests: 2,
    seating: "Barra junto al horno",
    status: "pendiente",
    createdAt: "2026-09-09T11:02:00",
  },
  {
    id: "r3",
    name: "Grupo Rossi (evento)",
    phone: "+598 99 501 883",
    email: "eventos@rossi.com.uy",
    date: "2026-09-14",
    time: "20:00",
    guests: 14,
    seating: "Salón",
    note: "Cena de equipo. Consultan menú cerrado.",
    status: "pendiente",
    createdAt: "2026-09-08T18:25:00",
  },
  {
    id: "r4",
    name: "Andrés Peña",
    phone: "+598 91 337 004",
    date: "2026-09-13",
    time: "13:30",
    guests: 4,
    seating: "Terraza",
    status: "confirmada",
    createdAt: "2026-09-07T09:15:00",
  },
  {
    id: "r5",
    name: "Marina Cukier",
    phone: "+598 99 720 415",
    email: "marina.ck@gmail.com",
    date: "2026-09-15",
    time: "22:00",
    guests: 3,
    seating: "Salón",
    note: "Una comensal celíaca — consulta por base sin gluten.",
    status: "confirmada",
    createdAt: "2026-09-06T20:48:00",
  },
  {
    id: "r6",
    name: "Tomás Iglesias",
    phone: "+598 94 088 271",
    date: "2026-09-11",
    time: "20:00",
    guests: 8,
    seating: "Terraza",
    note: "Pedían las 8 en terraza un viernes — sin lugar.",
    status: "rechazada",
    createdAt: "2026-09-05T16:30:00",
  },
];

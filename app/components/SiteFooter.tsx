import Link from "next/link";
import { contact, footerLinks, locations } from "../lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-mist">
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-[34ch]">
            <p className="font-display text-2xl tracking-[-0.01em] text-ink">
              Pizzeria<span className="text-gold">.</span>
            </p>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-muted">
              Una pizzería napolitana sobre la Rambla en Punta del Este. Pizzas
              al horno de leña, una carta corta, y una barra desde donde se ve
              el horno.
            </p>
          </div>

          {footerLinks.map((col) => (
            <nav key={col.heading}>
              <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
                {col.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[0.92rem] text-muted transition-colors duration-300 hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
              Reservas
            </h3>
            <p className="mt-5 text-[0.92rem] leading-relaxed text-muted">
              Llamá o escribinos y coordinamos la mesa en la sucursal que
              quieras.
            </p>
            <div className="mt-4 space-y-1 text-[0.92rem]">
              <a
                href={contact.phoneHref}
                className="block font-medium text-ink transition-colors duration-300 hover:text-ocean"
              >
                {contact.phoneLabel}
              </a>
              <a
                href={contact.emailHref}
                className="block text-muted transition-colors duration-300 hover:text-ocean"
              >
                {contact.emailLabel}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
            Sucursales
          </h3>
          <div className="mt-5 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc) => (
              <div key={loc.id}>
                <p className="font-display text-lg tracking-[-0.01em] text-ink">
                  {loc.name}
                </p>
                <address className="mt-2 text-[0.88rem] not-italic leading-relaxed text-muted">
                  {loc.address}
                </address>
                <a
                  href={loc.phoneHref}
                  className="mt-1.5 block text-[0.88rem] font-medium text-ink transition-colors duration-300 hover:text-ocean"
                >
                  {loc.phoneLabel}
                </a>
                <p className="mt-1.5 text-[0.82rem] tabular-nums text-faint">
                  {loc.hours}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-8 text-[0.8rem] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Pizzeria. Una maqueta de diseño — no es un negocio real.</p>
          <p>
            Punta del Este, Uruguay · Fotografía vía{" "}
            <a
              href="https://unsplash.com/license"
              className="text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

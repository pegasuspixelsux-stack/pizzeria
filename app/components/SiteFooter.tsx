import { contact, footerLinks, hours } from "../lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-mist">
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-[34ch]">
            <p className="font-display text-2xl tracking-[-0.01em] text-ink">
              Trattoria<span className="text-gold">.</span>
            </p>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-muted">
              A coastal restaurant and cocktail bar on the Rambla in Punta del
              Este. Lunch on the terrace, dinner at golden hour, the last drink
              after midnight.
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
                    <a
                      href={item.href}
                      className="text-[0.92rem] text-muted transition-colors duration-300 hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
              Find us
            </h3>
            <address className="mt-5 space-y-1 text-[0.92rem] not-italic leading-relaxed text-muted">
              <p>{contact.street}</p>
              <p>{contact.area}</p>
              <p>{contact.country}</p>
            </address>
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
            Hours
          </h3>
          <dl className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {hours.map((row) => (
              <div key={row.days} className="flex flex-col gap-0.5">
                <dt className="text-[0.88rem] font-medium text-ink">
                  {row.days}
                </dt>
                <dd className="text-[0.86rem] tabular-nums text-muted">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-8 text-[0.8rem] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Trattoria. A design mockup — not a real business.</p>
          <p>
            Punta del Este, Uruguay · Photography via{" "}
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

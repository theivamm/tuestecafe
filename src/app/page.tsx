/* eslint-disable @next/next/no-img-element */
import { MenuSection } from "@/components/menu-section";
import { DELIVERIES, SITE } from "@/data/site";

const VALUES = [
  ["Tueste propio", "Molemos el grano el día que lo tomás."],
  ["Horneado del día", "Laminados y pastelería recién hechos."],
  ["Sin TACC", "Opciones sin gluten en casi toda la carta."],
  ["Pets bienvenidos", "La barra los adopta a la primera."],
  ["A tu casa", "Rappi y Mercado Delivery."],
];

export default function Home() {
  return (
    <>
      <header className="top" id="top">
        <a href="#top">
          <img src="/img/logo.png" alt={SITE.name} />
        </a>
        <nav>
          <a href="#barra">La barra</a>
          <a href="#menu">Menú</a>
          <a href="#visita">Visitanos</a>
        </nav>
      </header>

      <main>
        <section className="wrap hero">
          <div>
            <p className="eyebrow">
              {SITE.neighborhood.split(",")[0]} · {SITE.hours.days} {SITE.hours.time}
            </p>
            <h1 className="serif">{SITE.claim}.</h1>
            <p className="lead">
              Primer café de la cuadra. Tueste propio, brunch recién hecho y un lugar para quedarse un rato largo, con tu
              mejor amigo.
            </p>
            <div className="btns">
              <a className="btn solid" href="#menu">Ver el menú →</a>
              <a className="btn" href={SITE.mapsShortUrl} target="_blank" rel="noreferrer">Cómo llegar</a>
            </div>
          </div>
          <div className="hero-img">
            <img className="main" src="/img/hero-02.jpg" alt="Barra de Tueste" />
            <img className="sub" src="/img/hero-04.jpg" alt="Café servido" />
          </div>
        </section>

        <section className="values">
          <div className="wrap">
            {VALUES.map(([t, c]) => (
              <div key={t}>
                <b>{t}</b>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="barra" className="wrap barra">
          <div className="pics">
            <img src="/img/espresso-03.jpg" alt="Espresso" />
            <img src="/img/coffee-08.jpg" alt="Café filtrado" />
          </div>
          <div>
            <p className="eyebrow">La barra</p>
            <h2 className="serif">Specialties, sin apuro.</h2>
            <p className="t">
              Tueste propio en casa. Cada lote se muele según el método que vas a usar: V60, Chemex o Aeropress. En barra
              te preguntamos cómo lo tomás y te armamos el café como corresponde.
            </p>
          </div>
        </section>

        <MenuSection />

        <section id="visita" className="wrap visita">
          <div>
            <h2 className="serif">Pasá por Caballito.</h2>
            <p style={{ margin: 0, color: "rgba(239,232,216,.78)", lineHeight: 1.6 }}>Con vos y tu perro. {SITE.tagline.split(" en ")[0]}.</p>
          </div>
          <div className="col">
            <div><small>Dirección</small>{SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}</div>
            <div><small>Horario</small>{SITE.hours.days} · {SITE.hours.time}</div>
          </div>
          <div className="col">
            <div><small>Envíos</small>{DELIVERIES.map((d) => d.name).join(" · ")}</div>
            <div>
              <small>Seguinos</small>
              <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>@tueste.cafe</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <span><img src="/img/logo.png" alt="" />{SITE.name}</span>
          <span>{SITE.neighborhood}</span>
        </div>
      </footer>
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
import { MenuSection } from "@/components/menu-section";
import { SplitText } from "@/components/split-text";
import { Reveal } from "@/components/reveal";
import { TopBar } from "@/components/top-bar";
import { DELIVERIES, SITE } from "@/data/site";

const VALUES = [
  ["Tueste propio", "Molemos el grano el día que lo tomás."],
  ["Horneado del día", "Laminados y pastelería recién hechos."],
  ["Sin TACC", "Opciones sin gluten en casi toda la carta."],
  ["Pets bienvenidos", "La barra los adopta a la primera."],
  ["A tu casa", "Rappi y Mercado Delivery."],
];
const MARQUEE = ["Café de especialidad", "Tueste propio", "Brunch todo el día", "Pastelería de la casa", "Pets bienvenidos", "Caballito"];

export default function Home() {
  const words = SITE.claim.split(" ");
  const last = words.pop();
  return (
    <>
      <Reveal />
      <header className="top" id="top">
        <a href="#top">
          <img src="/img/logo.png" alt={SITE.name} />
        </a>
      </header>
      <TopBar />

      <main className="main-col">
        <section className="wrap hero">
          <div className="rv">
            <p className="eyebrow">
              {SITE.neighborhood.split(",")[0]} · {SITE.hours.days} {SITE.hours.time}
            </p>
            <h1 className="serif">
              <SplitText text={words.join(" ") + " "} />
              <SplitText text={last + "."} grad />
            </h1>
            <p className="lead">
              Primer café de la cuadra. Tueste propio, brunch recién hecho y un lugar para quedarse un rato largo, con tu
              mejor amigo.
            </p>
            <div className="btns">
              <a className="btn solid" href="#menu">Ver el menú →</a>
              <a className="btn" href={SITE.mapsShortUrl} target="_blank" rel="noreferrer">Cómo llegar</a>
            </div>
          </div>
          <div className="hero-img rv">
            <img className="main" src="/img/hero-02.jpg" alt="Barra de Tueste" />
            <img className="sub" src="/img/hero-04.jpg" alt="Café servido" />
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="track">
            {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
              <span key={i} className="serif">{t}<i>✦</i></span>
            ))}
          </div>
        </div>

        <section className="values">
          <div className="wrap">
            {VALUES.map(([t, c]) => (
              <div key={t} className="rv">
                <b>{t}</b>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="barra" className="wrap barra">
          <div className="pics rv">
            <img src="/img/espresso-03.jpg" alt="Espresso" />
            <img src="/img/coffee-08.jpg" alt="Café filtrado" />
          </div>
          <div className="rv">
            <p className="eyebrow">La barra</p>
            <h2 className="serif"><SplitText text="Specialties, " /><SplitText text="sin apuro." grad /></h2>
            <p className="t">
              Tueste propio en casa. Cada lote se muele según el método que vas a usar: V60, Chemex o Aeropress. En barra
              te preguntamos cómo lo tomás y te armamos el café como corresponde.
            </p>
          </div>
        </section>

        <MenuSection />

        <section id="visita" className="wrap visita">
          <div className="rv">
            <h2 className="serif"><SplitText text="Pasá por " /><SplitText text="Caballito." grad /></h2>
            <p className="s">Con vos y tu perro. {SITE.tagline.split(" en ")[0]}.</p>
          </div>
          <div className="col rv">
            <div><small>Dirección</small>{SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}</div>
            <div><small>Horario</small>{SITE.hours.days} · {SITE.hours.time}</div>
          </div>
          <div className="col rv">
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

export const SITE = {
  name: "Tueste Café",
  tagline: "Primer café de la cuadra en el corazón de Caballito",
  claim: "El café de especialidad del barrio",
  neighborhood: "Caballito, Buenos Aires",
  address: {
    street: "Doblas 690",
    city: "Buenos Aires",
    province: "Buenos Aires",
    postalCode: "C1424",
    country: "AR",
  },
  hours: {
    days: "Todos los días",
    time: "8hs — 20hs",
  },
  mapsUrl:
    "https://www.google.com/maps/place/Tueste/@-34.6250947,-58.4300434,18z/data=!4m15!1m8!3m7!1s0x95bccbf1a3bf8f43:0x349540c507906d75!2sTueste!8m2!3d-34.6250947!4d-58.4300434!10e9!16s%2Fg%2F11kj4t4fjf!3m5!1s0x95bccbf1a3bf8f43:0x349540c507906d75!8m2!3d-34.6250947!4d-58.4300434!16s%2Fg%2F11kj4t4fjf",
  mapsShortUrl: "https://maps.app.goo.gl/94LZJuyYjZWPVV6t8",
  instagramUrl: "https://www.instagram.com/tueste.cafe",
  geo: {
    lat: -34.6250947,
    lng: -58.4300434,
  },
  mapEmbedUrl:
    "https://www.google.com/maps?q=Tueste&ll=-34.6250947,-58.4300434&z=17&hl=es&output=embed",
} as const;

export const DELIVERIES = [
  { id: "rappi", name: "Rappi", href: "https://www.rappi.com.ar/" },
  { id: "mercado", name: "Mercado Delivery", href: "https://www.mercadolibre.com.ar/" },
] as const;

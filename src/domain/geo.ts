/** Approximate city centers for the MVP map (no geocoding API). */
const CITY_COORDS: Record<string, [lat: number, lng: number]> = {
  Bogotá: [4.676, -74.048],
  Medellín: [6.21, -75.571],
  Rionegro: [6.135, -75.43],
  Cali: [3.42, -76.53],
  Cartagena: [10.4, -75.55],
  Barranquilla: [11.0, -74.81],
  Bucaramanga: [7.12, -73.11],
  Pereira: [4.81, -75.73],
};
const DEFAULT: [number, number] = [4.711, -74.072];

function hash(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0;
  return h;
}

/** Deterministic approximate location: city center nudged by neighborhood. */
export function approxLocation(city: string, neighborhood: string) {
  const [lat, lng] = CITY_COORDS[city] ?? DEFAULT;
  const h = hash(neighborhood);
  return {
    lat: lat + ((h % 100) / 100) * 0.03 - 0.015,
    lng: lng + (((h >> 8) % 100) / 100) * 0.03 - 0.015,
  };
}

export function osmEmbedUrl(lat: number, lng: number, d = 0.012) {
  const bbox = [lng - d, lat - d, lng + d, lat + d]
    .map((n) => n.toFixed(5))
    .join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`;
}

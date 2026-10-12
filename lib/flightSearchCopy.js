const spanish = {
  "Flight search": "Búsqueda de vuelos", "Trip type": "Tipo de viaje",
  Roundtrip: "Ida y vuelta", "One Way": "Solo ida", Traveler: "Viajero",
  "Maximum 9 travelers": "Máximo 9 viajeros", Adults: "Adultos", Children: "Niños", Infants: "Bebés",
  "12+ years": "12 años o más", "2–11 years": "2–11 años", "Under 2 years": "Menores de 2 años",
  Done: "Listo", "Cabin class": "Clase de cabina", Economy: "Económica",
  "Premium Economy": "Económica prémium", Business: "Ejecutiva", "First Class": "Primera clase",
  From: "Desde", To: "Hasta", Origin: "Origen", Destination: "Destino",
  "Swap origin and destination": "Intercambiar origen y destino", Departure: "Salida", Return: "Regreso",
  "Select date": "Selecciona una fecha", "Not needed": "No corresponde", "Searching…": "Buscando…",
  "Search Flights": "Buscar vuelos", "Select departure date": "Selecciona la fecha de salida",
  "Select departure and return dates": "Selecciona las fechas de salida y regreso", "Close calendar": "Cerrar calendario",
  "No airports found. Try a city or airport code.": "No se encontraron aeropuertos. Prueba una ciudad o un código de aeropuerto.",
  "Please fill in both origin and destination.": "Indica el origen y el destino.",
  "Please select a departure date.": "Selecciona la fecha de salida.",
  "Departure date must be today or later.": "La salida debe ser hoy o una fecha posterior.",
  "Please select a return date on or after departure.": "Selecciona una fecha de regreso igual o posterior a la salida.",
  "Maximum 9 passengers allowed.": "Se permiten hasta 9 pasajeros.",
  "Choose valid airports from the suggestions or enter their three-letter airport codes.": "Selecciona aeropuertos de la lista o introduce sus códigos de tres letras.",
  "Origin and destination cannot be the same.": "El origen y el destino deben ser distintos.",
  "Something went wrong. Try again.": "La búsqueda falló. Inténtalo de nuevo.",
};

export const searchCopy = (locale) => (text) => locale === "es" ? spanish[text] || text : text;

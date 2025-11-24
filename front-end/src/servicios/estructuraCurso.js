// src/servicios/estructuraCurso.js
import api from './api';

// === Utilidades ===
function normalizarEstablecimiento(s) {
  if (!s) return '';
  try {
    return decodeURIComponent(String(s)).replace(/-/g, ' ').trim();
  } catch {
    return String(s).replace(/-/g, ' ').trim();
  }
}

function parseMaybeId(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function getEstablecimientoNombre(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') return value.nombre || value.nombre_display || '';
  return String(value);
}

function getEstablecimientoId(value) {
  if (!value) return null;
  if (typeof value === 'object' && value.id != null) {
    const num = Number(value.id);
    return Number.isFinite(num) ? num : null;
  }
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}
function compararIgual(a, b) {
  return String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase();
}
function extraerNumero(txt) {
  const m = String(txt || '').match(/(\d{1,2})/);
  return m ? parseInt(m[1], 10) : NaN;
}

// Construye "1° Medio A" a partir de nombre/nivel (sin tocar el back)
function construirNombreDisplay(curso) {
  const nombreRaw = (curso?.nombre || '').trim();
  const nivelCampo = (curso?.nivel || '').trim();

  // "1 medio A", "1° básico B"
  const rx = /^\s*(\d{1,2})\s*(?:°|º)?\s*(b[aá]sico|medio)\s*([A-Z]{1,2})?\s*$/i;
  const m = nombreRaw.match(rx);
  if (m) {
    const n = parseInt(m[1], 10);
    const ciclo = capitalizarCiclo(m[2]);
    const sec = m[3] ? m[3].toUpperCase() : '';
    return `${n}° ${ciclo}${sec ? ` ${sec}` : ''}`;
  }

  const cicloDetectado = detectarCiclo(nombreRaw) || detectarCiclo(nivelCampo);
  const nNombre = extraerNumero(nombreRaw);
  const nNivel = extraerNumero(nivelCampo);
  const n = !Number.isNaN(nNombre) ? nNombre : !Number.isNaN(nNivel) ? nNivel : NaN;

  let sec = '';
  const secMatch = nombreRaw.match(/(?:\s|-)([A-Z]{1,2})\s*$/i);
  if (secMatch) sec = secMatch[1].toUpperCase();

  if (!Number.isNaN(n) && cicloDetectado) return `${n}° ${cicloDetectado}${sec ? ` ${sec}` : ''}`;
  if (!Number.isNaN(n)) return `${n}°${sec ? ` ${sec}` : ''}`;
  return nombreRaw || '—';
}
function detectarCiclo(texto) {
  const t = String(texto || '').toLowerCase();
  if (t.includes('medio')) return 'Medio';
  if (t.includes('básico') || t.includes('basico')) return 'Básico';
  return '';
}
function capitalizarCiclo(s) {
  const t = String(s || '').toLowerCase();
  if (t.startsWith('medio')) return 'Medio';
  if (t.startsWith('básico') || t.startsWith('basico')) return 'Básico';
  return '';
}

// Orden: Básico → Medio → número → sección
function cicloRank(display) {
  const d = String(display || '').toLowerCase();
  if (d.includes('básico') || d.includes('basico')) return 1;
  if (d.includes('medio')) return 2;
  return 99;
}
function numeroDesdeDisplay(display) {
  const m = String(display || '').match(/(\d{1,2})\s*°/);
  return m ? parseInt(m[1], 10) : 999;
}
function extraerSeccion(display) {
  const m = String(display || '').match(/([A-Z]{1,2})\s*$/);
  return m ? m[1] : '';
}

/**
 * Conectado al back:
 *  - Si viene `nombreEst`, intentamos GET /api/cursos/?establecimiento=nombreEst
 *  - Si el back devuelve vacío, traemos todos y filtramos en el front (igualando case-insensitive)
 *  - Si 404 (aún sin endpoint), devolvemos vacío sin romper la UI
 */
export async function obtenerEstructuraCurso(nombreEst) {
  const establecimientoQ = normalizarEstablecimiento(nombreEst);
  const establecimientoId = parseMaybeId(nombreEst);
  let cursosRaw = [];

  try {
    const r = await api.get('/cursos/');
    const todos = Array.isArray(r.data) ? r.data : (r.data?.results ?? []);

    if (establecimientoId != null) {
      cursosRaw = todos.filter((c) => getEstablecimientoId(c.establecimiento) === establecimientoId);
    } else if (establecimientoQ) {
      cursosRaw = todos.filter((c) => compararIgual(getEstablecimientoNombre(c.establecimiento), establecimientoQ));
    } else {
      cursosRaw = todos;
    }
  } catch (err) {
    if (err?.response?.status === 404) {
      return { establecimiento: { nombre: establecimientoQ }, cursos: [] };
    }
    throw err;
  }

  const cursos = cursosRaw
    .map((c) => ({
      ...c,
      nombre_display: construirNombreDisplay(c),
      establecimiento_nombre: getEstablecimientoNombre(c.establecimiento),
      establecimiento_id: getEstablecimientoId(c.establecimiento),
    }))
    .sort((a, b) => {
      const cr = cicloRank(a.nombre_display) - cicloRank(b.nombre_display);
      if (cr !== 0) return cr;
      const nr = numeroDesdeDisplay(a.nombre_display) - numeroDesdeDisplay(b.nombre_display);
      if (nr !== 0) return nr;
      return extraerSeccion(a.nombre_display).localeCompare(extraerSeccion(b.nombre_display));
    });

  const nombreDetectado =
    cursos[0]?.establecimiento_nombre || establecimientoQ || '';
  let idDetectado = cursos[0]?.establecimiento_id ?? establecimientoId;

  if (!idDetectado && establecimientoQ) {
    try {
      const estRes = await api.get('/establecimientos/');
      const listaEst = Array.isArray(estRes.data) ? estRes.data : (estRes.data?.results ?? []);
      const encontrado = listaEst.find((est) => compararIgual(est.nombre, establecimientoQ));
      if (encontrado) {
        idDetectado = encontrado.id;
      }
    } catch (err) {
      console.warn('[obtenerEstructuraCurso] No se pudo resolver el establecimiento por nombre.', err);
    }
  }

  return {
    establecimiento: { id: idDetectado, nombre: nombreDetectado },
    cursos,
  };
}

export async function crearCurso(payload) {
  return (await api.post('/cursos/', payload)).data;
}

// === NUEVO: actualizar un curso (PATCH parcial) ===
export async function actualizarCurso(id, payload) {
  // Si tu back NO usa slash final, cambia a `/cursos/${id}`
  const { data } = await api.patch(`/cursos/${id}/`, payload);
  return data;
}
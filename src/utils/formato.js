export function formatearCLP(valor) {
  const n = Number(valor) || 0
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n)
}

export function fechaCorta(iso) {
  try { return new Date(iso).toLocaleDateString('es-CL') } catch { return '' }
}

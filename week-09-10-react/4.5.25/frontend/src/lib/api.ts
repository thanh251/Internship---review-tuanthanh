export const API_URL = import.meta.env.VITE_API_URL || ''

export function apiUrl(path: string) {
  return `${API_URL}${path}`
}
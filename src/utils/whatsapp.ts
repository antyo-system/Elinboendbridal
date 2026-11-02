export const WHATSAPP_NUMBER = '6287880111169'
export const WHATSAPP_DISPLAY = '+62 878-8011-1169'

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}


/**
 * Variables de entorno (públicas — se bundlean en el JS del cliente).
 *
 * El endpoint de Formspree NO es secreto: cualquiera puede ver tu form en runtime.
 * Si necesitas proteger algo, hazlo del lado de Formspree (allowed domains, captcha).
 *
 * Para activar el formulario:
 *   1. Regístrate en https://formspree.io/ y crea un form
 *   2. Reemplaza 'YOUR_FORM_ID' por el ID que te dé Formspree
 *   3. Restringe el dominio en el dashboard de Formspree a:
 *      https://titusandersonsuarez.github.io
 */
export const environment = {
  production: false,
  formspreeEndpoint: 'https://formspree.io/f/xeedwzqw'
};

/**
 * Metodo q valida para verificar se o valor não é nulo ou indefinido
 * 
 * @param value O valor a ser verificado
 */
export function isValid(value: any): boolean {
  return value !== undefined && value !== null;
}

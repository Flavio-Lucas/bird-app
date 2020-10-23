/**
 * A classe que inclui a implementação do betodo TrackBy para otimizar os ngFor's
 */

export class TrackablePage {
  /**
   * Metdo que retorna a identificação do item da lista para ser usado
   * para verificar se o item já existe na lista, caso já exista, não
   * deve fazer alteração no HTML
   *
   * @param index O indice deste item na lista
   * @param value As informações do item
   */
  public trackById(index: number, value: { id: number }): number {
    return value.id;
  }
}

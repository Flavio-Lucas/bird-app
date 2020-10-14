//#region imports

import { StorageAsyncResult } from 'src/app/models/interfaces/storage-async-result';
import { CommentProxy, getFakeCurrentProxy } from 'src/app/models/proxies/comment.proxy';

//#endregion

/**
 * Metodo que retorna os meus comentários criados
 */
export async function getMyCommentsMockup(): Promise<StorageAsyncResult<CommentProxy[]>> {
  return Promise.resolve({
    error: undefined,
    success: [
      getFakeCurrentProxy(),
      getFakeCurrentProxy(),
      getFakeCurrentProxy(),
      getFakeCurrentProxy(),
    ]
  });
}

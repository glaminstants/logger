import { v4 as uuid } from "uuid";

export function generateTxId(): string {
  return uuid();
}

export async function asyncActionWithLogging<TResult = unknown>(
  fn: () => Promise<TResult>,
  onSuccess: (result: TResult) => void,
  onError: (err: unknown) => void,
  rethrow = true
) {
  try {
    const result = await fn();
    onSuccess(result);

    return result;
  } catch (err) {
    onError(err);

    if (rethrow) {
      throw err;
    }
  }
}

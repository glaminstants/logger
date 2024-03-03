export interface EventParams {
  [key: string]: unknown;
}

export interface EventBase {
  appName: string;
  appEnvironment: string;
  txId: string;
  txType?: string;
  level: string;
  message: unknown;
  timestamp: number;
}

export type TxLogger = {
  // Lifecycle methods
  setTxId: (txId: string) => void;
  hasLogsInQueue: () => boolean;
  end: () => Promise<void>;

  // Producer methods
  info: (eventType: string, eventParams?: EventParams) => void;
  warn: (
    eventType: string,
    warnMessage: string,
    eventParams?: EventParams
  ) => void;
  debug: (eventType: string, eventParams?: EventParams) => void;
  error: (
    eventType: string,
    errorMessage: string,
    eventParams?: EventParams
  ) => void;
};

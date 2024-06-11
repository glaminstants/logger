export interface TxLoggerEventParams {
  [key: string]: unknown;
}

export interface TxLoggerBaseEvent {
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
  info: (eventType: string, eventParams?: TxLoggerEventParams) => void;
  warn: (
    eventType: string,
    warnMessage: string,
    eventParams?: TxLoggerEventParams
  ) => void;
  debug: (eventType: string, eventParams?: TxLoggerEventParams) => void;
  error: (
    eventType: string,
    errorMessage: string,
    eventParams?: TxLoggerEventParams
  ) => void;
};

import * as dotenv from "dotenv";

dotenv.config();

export const APP_NAME = process.env.APP_NAME || "";
export const APP_ENVIRONMENT = process.env.ENVIRONMENT || "N/A";

const DATADOG_API_KEY = process.env.DATADOG_API_KEY || "";
const DATADOG_API_HOST = "http-intake.logs.datadoghq.eu";

export type LoggerConfiguration = {
  datadogApiHost: string;
  datadogApiKey: string;
  appName: string;
  appEnvironment: string;
};

export const CONFIGURATION: LoggerConfiguration = {
  datadogApiHost: DATADOG_API_HOST,
  datadogApiKey: DATADOG_API_KEY,
  appName: APP_NAME,
  appEnvironment: APP_ENVIRONMENT,
};

export function isDatadogConfigurationValid() {
  return Object.keys(CONFIGURATION).every((key: keyof LoggerConfiguration) => {
    return CONFIGURATION[key] && CONFIGURATION[key].length > 0;
  });
}

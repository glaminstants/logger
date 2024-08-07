import * as dotenv from "dotenv";

dotenv.config();

export const APP_NAME: string = process.env.APP_NAME || "N/A";
export const APP_ENVIRONMENT = process.env.ENVIRONMENT || "N/A";

const DATADOG_API_KEY = process.env.DATADOG_API_KEY || "";
const DATADOG_API_HOST = "https://http-intake.logs.datadoghq.eu";

export type LoggerConfiguration = {
  datadogApiHost: string;
  datadogApiKey: string;
  appName: string;
  appEnvironment: string;
};

export const Configuration: LoggerConfiguration = {
  datadogApiHost: DATADOG_API_HOST,
  datadogApiKey: DATADOG_API_KEY,
  appName: APP_NAME,
  appEnvironment: APP_ENVIRONMENT,
};

export function isDatadogConfigurationValid() {
  return Object.keys(Configuration).every((key: keyof LoggerConfiguration) => {
    return Configuration[key] && Configuration[key].length > 0;
  });
}
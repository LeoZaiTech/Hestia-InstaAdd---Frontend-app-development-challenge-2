import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from 'src/environments/environment';
import { EnvConfiguration } from 'src/app/models/apis/env-configuration';

// Function to set environment configuration
function setEnvironmentConfig(envConfig: EnvConfiguration) {
  environment.apiHost = envConfig.apiHost;
  environment.enableAzureLogin = envConfig.enableAzureLogin;
  environment.azure_ad_tenant_id = envConfig.azure_ad_tenant_id;
  environment.azure_ad_client_id = envConfig.azure_ad_client_id;
  environment.azure_monitor_connection_string = envConfig.azure_monitor_connection_string;
}

// Type guard for EnvConfiguration
function isEnvConfiguration(data: unknown): data is EnvConfiguration {
  return typeof data === 'object' && data !== null && 'apiHost' in data;
}

if (!environment.production) {
  bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
} else {
  // Fetch configuration from runtime-host
  fetch('/env.json')
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data: unknown) => {
      // Check if configuration is valid
      if (isEnvConfiguration(data)) {
        setEnvironmentConfig(data);

        bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
      } else {
        console.error('Invalid environment configuration');
      }
    })
    .catch((error) => {
      console.error('Failed to fetch environment configuration:', error);
    });
}

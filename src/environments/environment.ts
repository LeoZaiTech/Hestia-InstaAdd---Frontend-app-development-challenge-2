// This file can be replaced during build by using the `fileReplacements` array.
// The list of file replacements can be found in `angular.json`.
import { commonEnvironments } from './environment.common';

export const environment = {
  production: true,
  // The configurations serve merely as placeholders
  // and will be replaced during the application's runtime via `https://{host}/env.json`.
  apiHost: '',
  enableAzureLogin: '',
  azure_ad_tenant_id: '',
  azure_ad_client_id: '',
  azure_monitor_connection_string: '',
  ...commonEnvironments,
};

import { commonEnvironments } from './environment.common';

export const environment = {
  production: false,
  apiHost: 'http://localhost:8080/api/v1',
  enableAzureLogin: 'false',
  azure_ad_tenant_id: '',
  azure_ad_client_id: '',
  azure_monitor_connection_string: '',
  ...commonEnvironments,
};

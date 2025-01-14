# Hestia InstaAdd Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.

## Technology Stack

- Angular 18
- Microsoft Entra ID using OIDC
- Docker
- TypeScript
- HTML
- SaaS
- Angular Material
- Terraform, Azure
- Application Insights, Azure Monitor

## Install frontend dependencies

Run this to install frontend dependencies:

```
npm i
```

## Configuration

All configurations are in `src/environments`:

- `environment.common.ts`: Common configuration parameters.
- `environment.dev.ts`: Local Development environment configuration.
- `environment.ts`: Production environment configuration.

However, for non-local development environments, the application will dynamically retrieve environment settings from `https://{host}/env.json`. This approach allows the Docker image to be built once and run across different environments.

Therefore, the configurations in the `environment.ts` file serve merely as placeholders and will be replaced during the application's runtime. The deployment team will ensure that each environment has its own distinct version of this `env.json` file.

The app supports the following configurable parameters:

|           Config name           |           Description           |
| :-----------------------------: | :-----------------------------: |
|             apiHost             |           backend api           |
|        enableAzureLogin         |       enable Azure Login        |
|       azure_ad_tenant_id        |         Azure tenant id         |
|       azure_ad_client_id        |         Azure client id         |
| azure_monitor_connection_string | Azure Monitor connection string |

## Start mock backend server

To set up and run the mock backend server, follow these steps:

```
cd mock-backend
npm i
npm start
```

Change the `apiHost` value in your environment configuration to `http://localhost:8080/api/v1`. This will ensure that your application connects to the mock backend during development.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## API request

- API request depend on each API you can check the request for each API in `src/app/services/apis`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

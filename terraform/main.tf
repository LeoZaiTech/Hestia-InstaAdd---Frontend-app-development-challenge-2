provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "main" {
  name     = "hestia-insta-add-frontend-rg"
  location = "East US"
}

resource "azurerm_app_service_plan" "main" {
  name                = "hestia-insta-add-frontend-service-plan"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku {
    tier     = "Basic"
    size     = "B1"
  }
}

resource "azurerm_app_service" "main" {
  name                = "hestia-insta-add-frontend-${random_string.app_suffix.result}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  app_service_plan_id = azurerm_app_service_plan.main.id

  site_config {
    linux_fx_version = "NODE|22"  # Using Node.js for deployment
  }

  app_settings = {
    "NODE_ENV" = "production"
  }
}

resource "random_string" "app_suffix" {
  length  = 8
  special = false
}

resource "azurerm_app_service_zip_deploy" "main" {
  zip_file              = "${path.module}/dist/hestia-insta-add-frontend.zip"  # Path to your zipped Angular build
  app_service_id        = azurerm_app_service.main.id
}

output "app_service_url" {
  value = azurerm_app_service.main.default_site_hostname
}

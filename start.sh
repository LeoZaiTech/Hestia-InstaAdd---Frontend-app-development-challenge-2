#!/usr/bin/env sh

set -Eeuo pipefail

#
#  Angular Frontend configuration
#
ANGULAR_ENV_FILE=/usr/share/nginx/html/env.json
ANGULAR_ENV_TMP_FILE=/tmp/env.$$.conf
echo "Old angular env:"
cat $ANGULAR_ENV_FILE

envsubst '$INSTAADD_API_HOST;\
          $INSTAADD_AZURE_AD_TENANT_ID;\
          $INSTAADD_AZURE_AD_CLIENT_ID;\
          $INSTAADD_AZURE_MONITOR_CONNECTION_STRING;\
          $INSTAADD_ENABLE_AZURE_LOGIN' < $ANGULAR_ENV_FILE > $ANGULAR_ENV_TMP_FILE

echo "New angular env:"
cat $ANGULAR_ENV_TMP_FILE

mv $ANGULAR_ENV_TMP_FILE $ANGULAR_ENV_FILE

#
#  nginx
#
echo "nginx.conf:"
cat /etc/nginx/conf.d/default.conf

nginx -g "daemon off;"
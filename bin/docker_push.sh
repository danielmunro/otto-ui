set -e
docker login quay.io --username $QUAY_BOT_USERNAME --password $QUAY_BOT_PASSWORD
docker push quay.io/danielmunro/otto-ui

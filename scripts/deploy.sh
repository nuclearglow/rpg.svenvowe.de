#!/usr/bin/env zsh

echo "Deploying..."

ssh -T $DEPLOYMENT_USERNAME@$DEPLOYMENT_HOST << EOSSH
cd $DEPLOYMENT_PATH
git pull
npm ci
npm run build
cd $DEPLOYMENT_ECOSYSTEM_PATH
pm2 restart rpg-sveltekit
EOSSH

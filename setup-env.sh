#!/bin/bash

read -p "Enter the value for TWITTER_CREATOR: " TWITTER_CREATOR
read -p "Enter the value for TWITTER_SITE: " TWITTER_SITE
read -p "Enter the value for SITE_NAME: " SITE_NAME
read -p "Enter the value for SHOPIFY_STOREFRONT_ACCESS_TOKEN: " SHOPIFY_STOREFRONT_ACCESS_TOKEN
read -p "Enter the value for SHOPIFY_STORE_DOMAIN: " SHOPIFY_STORE_DOMAIN

echo "TWITTER_CREATOR=\"$TWITTER_CREATOR\"" >> .env
echo "TWITTER_SITE=\"$TWITTER_SITE\"" >> .env
echo "SITE_NAME=\"$SITE_NAME\"" >> .env
echo "SHOPIFY_STOREFRONT_ACCESS_TOKEN=\"$SHOPIFY_STOREFRONT_ACCESS_TOKEN\"" >> .env
echo "SHOPIFY_STORE_DOMAIN=\"$SHOPIFY_STORE_DOMAIN\"" >> .env

echo ".env file created successfully."

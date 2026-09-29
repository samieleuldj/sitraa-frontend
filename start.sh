#!/bin/sh
set -e

# Standalone mode: never use "next start"
exec node server.js

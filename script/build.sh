source $PWD/script/common.sh
ENV=$@

# Expoert all env
exportContent $ENV
# Build
npm install
npm test
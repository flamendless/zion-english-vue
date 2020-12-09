#!/usr/bin/env sh
# abort on errors
set -e
# build
yarn run build
# navigate into the build output directory
cd dist
# if you are deploying to a custom domain
echo 'zion-english.com' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/flamendless/zion-english-vue.git master:gh-pages
# git push -f https://github.com/flamendless/zion-english.git master
cd -

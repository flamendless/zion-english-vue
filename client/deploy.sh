#!/usr/bin/env sh
msg=

function deploy() {
	# abort on errors
	set -e
	# build
	# export NODE_OPTIONS=--openssl-legacy-provider
	yarn run build
	# navigate into the build output directory
	cd dist
	# if you are deploying to a custom domain
	echo 'zion-cha-english.academy' > CNAME
	git init
	git add -A
	git commit -m "${msg}"
	git push -f https://github.com/flamendless/zion-english-vue.git master:gh-pages
	# git push -f https://github.com/flamendless/zion-english.git master
	cd -
}

if [ $# -eq 1 ]; then
	msg=$1
	deploy
else
	echo "must pass in a commit message"
fi

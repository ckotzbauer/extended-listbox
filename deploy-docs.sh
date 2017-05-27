#!/bin/bash
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "master" ]; then exit 0; fi

set -o errexit

rm -rf public

# config
git config --global user.email "christian.kotzbauer@gmail.com"
git config --global user.name "Christian Kotzbauer"

git clone https://${GH_TOKEN}@github.com/code-chris/extended-listbox.git -b gh-pages public

# build
PKG_VERSION=`node -p "require('./package.json').version"`

if [ -d "public/documentation/$PKG_VERSION" ]; then exit 0; fi

rm -r -f public/documentation/fonts
rm -r -f public/documentation/infrastructure
rm -r -f public/documentation/scripts
rm -r -f public/documentation/styles

mkdir public/documentation/fonts
mkdir public/documentation/infrastructure
mkdir public/documentation/scripts
mkdir public/documentation/styles
mkdir public/documentation/$PKG_VERSION

cp -r doc/pages/documentation/fonts/* public/documentation/fonts
cp -r doc/pages/documentation/infrastructure/* public/documentation/infrastructure
cp -r doc/pages/documentation/scripts/* public/documentation/scripts
cp -r doc/pages/documentation/styles/* public/documentation/styles
cp -r doc/pages/documentation/latest/* public/documentation/$PKG_VERSION

sed -i "/refresh/c\<meta http-equiv=\"refresh\" content=\"0; URL=../$PKG_VERSION/\">" public/documentation/latest/index.html
sed -i "/Addhere/c\<li><a href=\"./documentation/$PKG_VERSION/\">$PKG_VERSION</a></li>\n<span id=\"Addhere\"></span>" public/index.html
sed -i "s/VERSION/$PKG_VERSION/g" public/documentation/$PKG_VERSION/index.html

cp dist/js/extended-listbox.js public/documentation/$PKG_VERSION/dist/js/extended-listbox.js
cp dist/css/extended-listbox.css public/documentation/$PKG_VERSION/dist/css/extended-listbox.css

# deploy
cd public
git add .
git commit -m "Deploy to Github Pages"
git push origin gh-pages

# depends on the following packages to be installed:
# https://github.com/kangax/html-minifier
# https://github.com/mishoo/UglifyJS
# https://github.com/jakubpawlowicz/clean-css

mkdir a.out/
mkdir a.out/js/
mkdir a.out/css/

html-minifier portal/index.html --remove-comments --remove-comments-from-cdata --collapse-whitespace --remove-attribute-quotes --remove-redundant-attributes --use-short-doctype --remove-empty-attributes  --remove-optional-tags --remove-empty-elements --minify-js --minify-css > a.out/index.html
uglifyjs portal/js/client.js --screw-ie8 --mangle --compress --lint -o a.out/js/client.js
uglifyjs portal/js/portal.js --screw-ie8 --mangle --compress --lint -o a.out/js/portal.js
cleancss -o a.out/css/style.css portal/css/style.css
cleancss -o a.out/css/reset.css portal/css/reset.css

zip -u client.zip a.out/* a.out/css/* a.out/js/*
rm -r a.out/
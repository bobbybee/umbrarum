# depends on the following packages to be installed:
# https://github.com/kangax/html-minifier
# https://github.com/mishoo/UglifyJS
# https://github.com/jakubpawlowicz/clean-css

export COMMIT=`git log --pretty=format:'%h' -n 1`
html-minifier portal/index.html --remove-comments --remove-comments-from-cdata --collapse-whitespace --remove-attribute-quotes --remove-redundant-attributes --use-short-doctype --remove-empty-attributes  --remove-optional-tags --remove-empty-elements --minify-js --minify-css > ../umbrarum.github.io/index.html
uglifyjs portal/js/client.js --screw-ie8 --mangle --compress --lint -o ../umbrarum.github.io/js/client.js
uglifyjs portal/js/portal.js --screw-ie8 --mangle --compress --lint -o ../umbrarum.github.io/js/portal.js
uglifyjs portal/js/viewmanager.js --screw-ie8 --mangle --compress --lint -o ../umbrarum.github.io/js/viewmanager.js
cleancss -o ../umbrarum.github.io/css/style.css portal/css/style.css
cd ../umbrarum.github.io
git add index.html js/* css/*
git commit -m "Build $COMMIT at `date`"
git push origin master
# cleancss -o a.out/css/reset.css portal/css/reset.css # is this used anywhere?
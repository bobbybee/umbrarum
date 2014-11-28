# depends on the following packages to be installed:
# https://github.com/kangax/html-minifier

html-minifier portal/index.html --remove-comments --remove-comments-from-cdata --collapse-whitespace --remove-attribute-quotes --remove-redundant-attributes --use-short-doctype --remove-empty-attributes  --remove-optional-tags --remove-empty-elements --lint --minify-js --minify-css
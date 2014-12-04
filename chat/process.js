var markdown = require('markdown').markdown;

var emoji = require('emoji-images');

var Retext = require('retext'),
    smartypants = require('retext-smartypants');

var parser = new Retext().use(smartypants({
    dashes: false,
    backticks: false
}));

module.exports = function(message) {
    var smart = parser.parse(message).toString(),
        markup = markdown.toHTML(smart), // built-in sanitization
        emojified = emoji(markup, 'http://hassankhan.github.io/emojify.js/images/emoji');

    return emojified;
}
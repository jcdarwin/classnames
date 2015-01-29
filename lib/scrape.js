// Product a list of all unique CSS classnames
// for a given URL

'use strict'

module.exports = scrape

var cheerio = require('cheerio')
var request = require('request')

var url
var classes = {}
var callback

function parse (err, resp, html) {
    if (err) {
        return console.error(err)
    }

    var $ = cheerio.load(html)

    $('*').each(
        function(i, e) {
            var classNames = cheerio(e).attr('class')
            if (classNames) {
                classNames = classNames.split(/\s+/);
                classNames.map(function(className){
                    if (className) {
                        if (!classes[className]) {
                            classes[className] = 1
                        } else {
                            classes[className]++
                        }
                    }
                });
            }
        }
    );

    callback(classes)
}

function scrape () {
}

scrape.get = function (href, cb) {
    url = href
    classes = {}
    callback = cb
    request(url, parse)
}

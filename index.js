// Product a list of all unique CSS classnames
// for a given URL

var cheerio = require('cheerio')
var fs      = require('fs')
var request = require('request')

function scrape (err, resp, html) {
    if (err) {
        return console.error(err)
    }

    var classes = [];
    $ = cheerio.load(html)

    $('*').each(
        function(i, e) {
            classNames = cheerio(e).attr('class')
            if (classNames) {
                classNames = classNames.split(/\s+/);
                classNames.map(function(className){
                    if (className && classes.indexOf(className) == -1) {
                        classes.push(className)
                    }
                });
            }
        }
    );

    // Spit out the unique class names in alphabetical order
    classes.sort().map(function(className){
        console.log(className)
    })
}

var url = 'http://stuff.co.nz/technology'
//var url = 'http://athena.fairfaxmedia.co.nz/sites/site-athena/article-page.php?sitebreakpoint=desktop&sectionname=national'
request(url, scrape)

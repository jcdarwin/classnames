// Product a list of all unique CSS classnames
// for a given URL

var cheerio = require('cheerio')
var fs      = require('fs')
var request = require('request')

function scrape (err, resp, html) {
    if (err) {
        return console.error(err)
    }

    var classes = {};
    $ = cheerio.load(html)

    $('*').each(
        function(i, e) {
            classNames = cheerio(e).attr('class')
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

    // Spit out the unique class names in alphabetical order, with counts of occurence
    Object.keys(classes).sort().map(function(className, i){
        console.log(className + ': ' + classes[className])
    })

    // Write the object to the file system
    filename = url.replace(/\?.*/, '').replace(/(\:\/\/|\.|\/)/g, '_')
    fs.writeFile(filename, JSON.stringify(classes, null, 4), function(err){
        if (err) {
            console.log(err)
        } else {
            console.log('\nFile written to ' + filename)
        }
    })
}

// expecting: node index.js http://stuff.co.nz
var url = process.argv[2]

request(url, scrape)

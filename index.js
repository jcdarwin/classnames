'use strict'

var fs      = require('fs')
var scrape  = require('./lib/scrape')

// expecting: node index.js http://stuff.co.nz
var url = process.argv[2]

scrape.get(url, function(classes){
    // Spit out the unique class names in alphabetical order, with counts of occurence
    Object.keys(classes).sort().map(function(className, i){
        console.log(className + ': ' + classes[className])
    })

    // Write the object to the file system
    var filename = url.replace(/\?.*/, '').replace(/(\:\/\/|\.|\/)/g, '_')
    fs.writeFile(filename, JSON.stringify(classes, null, 4), function(err){
        if (err) {
            console.log(err)
        } else {
            console.log('\nFile written to ' + filename)
        }
    })
})

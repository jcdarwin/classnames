# What is this?

This is a couple of scripts to allow us to determine whether there are any clashes
(identical CSS classnames) on two different URLs.

## Installation

    npm install

## Execution

### Listing classnames for a URL

Run `index.js` to generate a list of classes found for a given URL:

    node index.js http://stuff.co.nz

This will list the classnames found, including counts of occurences, and write
the results to `http_stuff_co_nz` as a JSON object.

### Comparing classnames between two URLs, to determine whether there are any clashes

    node compare.js http://stuff.co.nz http://athena.fairfaxmedia.co.nz/sites/site-athena/article-page.php?sitebreakpoint=desktop&sectionname=national

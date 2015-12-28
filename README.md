NomNom
------

NomNom is a data ingestion node app.

Usage
=====

`JSON_DIR=someDirPath node index.js`

Notice
======

This is a work in progress. Right now I'm setting it up to do insertions into
neo4j. A funnel could be made under `src/db-funnels` to insert into any other db
such as mongo or postgresql. It's written on ES2015 and it uses the require-hook
from babel to transpile at runtime. (Not suitable for libraries)

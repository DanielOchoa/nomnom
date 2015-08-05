NomNom
------

NomNom is a data ingestion tool. It's a simple node app used to consume a large
amount of json files from a specified directory and inserts the json objects
into a mongo collection. This is the start of a project that I plan to use for
big data analysis.

Usage
=====

`JSON_DIR=someDirPath node index.js`

Notice
======

This is a work in progress. anything that's ingested is expected to be in a
specific format. See `lib/ingest.js` for the schema definition.

Created by DanielO.

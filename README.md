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

Details
=======

For the most part `lib/ingest.js` is doing the actual heavy lifting. I'm using
the promise pattern along with sprinkles of streaming and funcional
programming. Michael Bay wouldn't be able to come up with this.

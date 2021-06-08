#! /usr/bin/env bash

# %5B -> [
# %5D -> ]
for f in packages/docs/site/static/jsDocBuild/*.html;
  do mv "$f" $(echo "$f" | sed 's/%5B/\[/g' | sed 's/%5D/\]/g');
done

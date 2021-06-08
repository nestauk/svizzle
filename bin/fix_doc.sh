#! /usr/bin/env bash

for f in packages/docs/site/static/jsDocBuild/*.html;
  do \
    cat "$f" \
    | sed 's/%5B/\[/g' \
    | sed 's/%255B/\[/g' \
    | sed 's/%25255B/\[/g' \
    | sed 's/%5D/\]/g' \
    | sed 's/%255D/\]/g' \
    | sed 's/%25255D/\]/g' \
    > "$f.tmp" \
  && mv "$f.tmp" "$f";
done

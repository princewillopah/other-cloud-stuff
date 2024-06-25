#!/bin/bash

# Read each line from xxx.txt and clone the repository
while IFS= read -r url; do
    echo "Cloning $url..."
    git clone "$url"
done < ~/DevOps/Bash-script/repo_list.txt
#!/bin/bash
# usage: ./publish.sh /c/Workspaces/github/global-game-jame-2017/ /c/temp/global-game-jame-2017
# other example: ./publish.sh ~/base_repo ~/folder_with_gh_pages

base_repo=$1
gh_pages_repo=$2
actual_dir=${PWD}

cd $base_repo;
git pull; 
npm run build;

cd $gh_pages_repo;
cp -r $base_repo/dist/** .;
git ci -am 'new version';
git push;

cd $actual_dir
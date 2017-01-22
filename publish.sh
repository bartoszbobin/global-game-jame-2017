#!/bin/bash

actual_dir=${PWD}
base_repo=$0
gh_pages_repo=$1

#cd /c/Workspaces/github/global-game-jame-2017/; 
cd $base_repo;
git pull; 
npm run build; 

cd $gh_pages_repo; 
cp -r $base_repo/dist/** .; 
git ci -am 'new version'; 
git push;

cd $actual_dir
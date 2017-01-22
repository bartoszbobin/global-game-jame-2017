#!/bin/bash

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
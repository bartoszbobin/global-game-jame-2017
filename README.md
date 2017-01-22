# Phaser skeleton w/ TypeScript and WebPack

##About

A simple example using Phaser with TypeScript and WebPack. 

Based on [lean/phaser-es6-webpack](https://github.com/lean/phaser-es6-webpack) and [the-simian/slush-phaser-webpack](https://github.com/the-simian/slush-phaser-webpack) and also [AngularClass/angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter).

This is a fork of [mgiambalvo/phaser-typescript-webpack-starter](https://github.com/mgiambalvo/phaser-typescript-webpack-starter) to add npm commands below and karma test framework.

##Setup

```sh
# install the repo with npm
npm install

# start the dev server
npm start
```


##Server

```sh
# development
npm run server

# production
npm run build:prod && npm run server:prod
```

##Test
```sh
npm run test
```

##Clean
```sh
# clean all cache node modules etc
npm run clean

# awesome-typescript-loader has its own cache which can be cleared 
# worth trying if you are seeing strange results!
npm run clean:typescript

```


/*******************************************************************************************
* Author: Michael Myer     \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / *
* ID:     201601488         *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *  *
* Course: Comp 3612        / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ *
* Asg:    3                \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / *
* Due:    Dec 09, 2022      *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *  *
* File:   data-provider.js / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ *
*******************************************************************************************/

const path = require('path');
const fs = require('fs');

const artistPath = path.join(__dirname, "/../data/artists.json");
const galleriesPath = path.join(__dirname, "/../data/galleries.json");
const paintingsPath = path.join(__dirname, "/../data/paintings-nested.json");

const artistData = fs.readFileSync(artistPath, 'utf-8');
const galleriesData = fs.readFileSync(galleriesPath, 'utf-8');
const paintingsData = fs.readFileSync(paintingsPath, 'utf-8');

const artists = JSON.parse(artistData);
const galleries = JSON.parse(galleriesData);
const paintings = JSON.parse(paintingsData);

module.exports = {
    artists,
    galleries,
    paintings,
};

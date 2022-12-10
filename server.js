/*******************************************************************************************
* Author: Michael Myer     \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / *
* ID:     201601488         *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *  *
* Course: Comp 3612        / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ *
* Asg:    3                \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / *
* Due:    Dec 09, 2022      *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *  *
* File:   server.js        / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ *
*******************************************************************************************/

const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
const port = 6969;

const data = require('./scripts/data-provider.js');
const router = require('./scripts/router.js');


app.listen(port, () => {
    console.log(`Site listening port: localhost: ` + port);
});


router.home(app);
router.paintings(data.paintings, app);
router.paintingID(data.paintings, app);
router.galleryID(data.paintings, app);
router.paintingTitle(data.paintings, app);
router.paintingYear(data.paintings, app);
router.paintingColour(data.paintings, app);
router.artists(data.artists, app);
router.artistsCountry(data.artists,app);
router.artistID(data.paintings, app);
router.galleries(data.galleries, app);
router.galleriesCountry(data.galleries, app);
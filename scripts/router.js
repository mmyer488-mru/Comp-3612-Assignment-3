/*******************************************************************************************
* Author: Michael Myer     \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / *
* ID:     201601488         *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *  *
* Course: Comp 3612        / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ *
* Asg:    3                \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / *
* Due:    Dec 09, 2022      *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *  *
* File:   router.js        / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ *
*******************************************************************************************/

const path = require('path');

const homepage = path.join(__dirname, '/../html/index.html');

const jsonMessage = (msg) => {
    return { message : msg };
};

const validate = (data, jsonMessage) => { 
    if (data.length > 0) {
        return data;
    } else {
        return jsonMessage(`No Matching Data Found`);
    }
}

/*******************************************************************************************
 * \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / *
 *  *   *   *   *   *   *   *   *   *   *  Routes   *   *   *   *   *   *   *   *   *   *  *
 * / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ *
 ******************************************************************************************/

const home = (app) =>{
    app.get('/', (req, res) => {
        res.sendFile(homepage);
    });
}

const paintings = (data, app) => {
    app.get('/api/paintings', (req, res) => {
        res.json(validate(data, jsonMessage));
    });
}

const paintingID = (data, app) => {
    app.get('/api/painting/:id', (req, res) => {
        const search = data.filter(p => p.paintingID == req.params.id);
        console.log(typeof search);
        res.json(validate(search, jsonMessage));
    });
}

const galleryID = (data, app) => {
    app.get('/api/painting/gallery/:id', (req, res) => {
        const search = data.filter(p => req.params.id == p.gallery.galleryID);
        res.json(validate(search, jsonMessage));
    });
}

const artistID = (data, app) => {
    app.get('/api/painting/artist/:id', (req, res) => {
        const search = data.filter(p => req.params.id == p.artist.artistID);
        res.json(validate(search, jsonMessage));
    });
}

const paintingYear = (data, app) => {
    app.get('/api/painting/year/:min/:max', (req, res) => {
        const search = data.filter(p => (p.yearOfWork >= req.params.min && p.yearOfWork <= req.params.max));
        res.json(validate(search, jsonMessage));
    });
}

const paintingTitle = (data, app) => {
    app.get('/api/painting/title/:text', (req, res) => {
        const search = data.filter(p => p.title.toLowerCase().includes(req.params.text.toLowerCase()));
        res.json(validate(search, jsonMessage));
    });
}

const paintingColour = (data, app) => {
    app.get('/api/painting/color/:name', (req, res) => {
        const match = getMatchingColours(data, req.params.name.toLowerCase());
        res.json(validate(match, jsonMessage));
    });
}

const artists = (data, app) => {
    app.get('/api/artists', (req, res) => {
        res.json(validate(data, jsonMessage));
    });
}

const artistsCountry = (data, app) => {
    app.get('/api/artists/:country', (req, res) => {
        const search = data.filter(a => a.Nationality.toLowerCase() == req.params.country.toLowerCase());
        res.json(validate(search, jsonMessage));
    });
}

const galleries = (data, app) => {
    app.get('/api/galleries', (req, res) => {
        res.json(validate(data, jsonMessage));
    });
}

const galleriesCountry = (data, app) => {
    app.get('/api/galleries/:country', (req, res) => {
        const search = data.filter(g => g.GalleryCountry.toLowerCase() == req.params.country.toLowerCase());
        res.json(validate(search, jsonMessage));
    });
}


/*******************************************************************************************
 * \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / *
 *  *   *   *   *   *   *   *   *  getMatchingColours   *   *   *   *   *   *   *   *   *  *
 * / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ *
 *******************************************************************************************
 *                                                                                         *
 *  Returns an array paintings that contain a dominant colour which matches the requested  *
 *  colour. Used in the data search for the paintingColour route.                          *
 *                                                                                         *
 ******************************************************************************************/

function getMatchingColours(data, colour) {
    let match = [];
    data.forEach( p => {
        p.details.annotation.dominantColors.forEach( c => {
            if (c.name.toLowerCase() == colour)
                match.push(p);
        })
    })
    return match;
}


module.exports = {
    home,
    paintings,
    paintingID,
    galleryID,
    paintingTitle,
    paintingYear,
    paintingColour,
    artists,
    artistsCountry,
    artistID,
    galleries,
    galleriesCountry,
};
const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid'); // module for generating ID's
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true })) // middleware to parse data from forms, in POST requests bodies
app.use(methodOverride('_method'))              // middleware to 'fake' put/patch/delete requests
app.set('views', path.join(__dirname, 'views')) // setting for relative paths usage
app.set('view engine', 'ejs')                   // setting for ejs templating

// A fake database:
let artists = [
    {
        id: uuid(),
        name: 'Cris',
        url: "https://source.unsplash.com/250x250/?art/1",
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae et aperiam blanditiis sint? Natus, dolor."

    },
    {
        id: uuid(),
        name: 'Taylor',
        url: "https://source.unsplash.com/250x250/?art/2",
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique suscipit fugiat voluptates ex."
    },
    {
        id: uuid(),
        name: 'Tom',
        url: "https://source.unsplash.com/250x250/?art/3",
        bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. At voluptatibus vel perferendis ad et ipsam ex doloremque iusto excepturi atque."

    },
    {
        id: uuid(),
        name: 'BlueInk',
        url: "https://source.unsplash.com/250x250/?art/4",
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quibusdam aperiam deserunt sed vel minima odit eos dignissimos totam? Aut ducimus a odio quibusdam vero dicta iure provident labore, consequuntur explicabo dolore culpa quae ab ut magnam perferendis hic harum, tempore ullam dolor saepe doloribus."

    }
]

// ***************************************************
// INDEX - renders multiple artists
// ***************************************************
app.get('/artists', (req, res) => {
    res.render('artists/index', { artists });
})

// ***************************************************
// NEW - renders a form to create an artist
// ***************************************************
app.get('/artists/new', (req, res) => {
    res.render('artists/new');
})

// ******************************************************************************************************
// CREATE - creates a new artist
// ******************************************************************************************************
app.post('/artists', (req, res) => {
    const { name , bio } = req.body;
    artists.push({ name, url: "https://source.unsplash.com/250x250/?art/" + uuid(), id: uuid(), bio })
    res.redirect('/artists');
})

// ***************************************************
// SHOW - renders a single artist
// ***************************************************
app.get('/artists/:id', (req, res) => {
    const { id } = req.params;
    const artist = artists.find(a => a.id === id);
    res.render('artists/show', {artist});
})

// ***************************************************
// EDIT - renders a form to edit an artist
// ***************************************************
app.get('/artists/:id/edit', (req, res) => {
    const { id } = req.params;
    const artist = artists.find(a => a.id === id);
    res.render('artists/edit', { artist });
})


// ***************************************************
// UPDATES - edits a particular artist
// ***************************************************
app.patch('/artists/:id', (req, res) => {
    const { id } = req.params;
    const artist = artists.find(a => a.id === id);
    const newName = req.body.name;
    const newBio = req.body.bio;
    artist.name = newName;
    artist.bio = newBio;
    res.redirect(`/artists/${id}`);
})

// ***************************************************
// DELETES - deletes a particular artist
// ***************************************************
app.delete('/artists/:id', (req, res) => {
    const { id } = req.params;
    const artist = artists.find(a => a.id === id);
    artists.pop(artist);
    res.redirect('/artists');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`SERVING ON PORT ${port}!`)
})
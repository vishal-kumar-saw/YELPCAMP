const mongoose = require('mongoose');
const cities = require('./cities');
const {
    places,
    descriptors
} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60df2d9e04b8c51388c1d4bf',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            images: [{
                    url: 'https://res.cloudinary.com/dnxbj6pvp/image/upload/v1626100424/YelpCamp/icqhvdqo5yce0z9zqntk.jpg'
                },
                {
                    url: 'https://res.cloudinary.com/dnxbj6pvp/image/upload/v1626100421/YelpCamp/emtmnqkccw8nkgccdpve.jpg'
                }
            ],
            price,
            geometry: {
                type: "Point",
                coordinates: [88.33778, 22.54111]
            }
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})
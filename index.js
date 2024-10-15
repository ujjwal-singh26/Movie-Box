const express = require("express");
const app = express();
const port = process.env.PORT || 8080; // Use environment variable for port
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// ----------------------------------------------------------------------------------------------------------------------------------

let posts = [
    {
            id: uuidv4(),
            title: "Titanic",
            director: "James Cameron",
            releaseYear: 1997,
            genre: "Drama, Romance",
            rating: 7.8,
            description: "A fictionalized account of the tragic sinking of the RMS Titanic, focusing on the love story between a wealthy young woman and a poor artist.",
            poster: "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png"
    },
    {
        id: uuidv4(),
        title: "Casablanca",
        director: "Michael Curtiz",
        releaseYear: 1942,
        genre: "Romance, Drama",
        rating: 8.5,
        description: "A love story set during World War II, where an American expatriate must choose between his love for a woman and helping her and her husband escape from the Nazis.",
        poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/CasablancaPoster-Gold.jpg/330px-CasablancaPoster-Gold.jpg"
    },
    {
        id: uuidv4(),
        title: "The Godfather",
        director: "Francis Ford Coppola",
        releaseYear: 1972,
        genre: "Crime drama",
        rating: 9.2,
        description: "A crime family saga that follows the Corleone family from the 1940s to the early 1950s, illustrating the complexities of loyalty, power, and family ties in the treacherous world of organized crime and betrayal.",
        poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg"
    },
    {
        id: uuidv4(),
        title: "The Dark Knight",
        director: "Christopher Nolan",
        releaseYear: 2008,
        genre: "Action/Thriller",
        rating: 9.0,
        description: "Batman battles the Joker, a sadistic criminal mastermind who throws Gotham City into chaos, testing the limits of heroism, morality, and justice as he fights to protect his home from destruction.",
        poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg"
    },
    {
        id: uuidv4(),
        title: "The Lord of the Rings: The Fellowship of the Ring",
        director: "Peter Jackson",
        releaseYear: 2001,
        genre: "Fantasy/Adventure",
        rating: 8.8,
        description: "The first installment in the epic Lord of the Rings trilogy, where a hobbit named Frodo inherits the One Ring and embarks on a perilous quest to destroy it, facing numerous challenges and forging unexpected alliances along the way.",
        poster: "https://upload.wikimedia.org/wikipedia/en/f/fb/Lord_Rings_Fellowship_Ring.jpg"
    },
    {
        id: uuidv4(),
        title: "Schindler's List",
        director: "Steven Spielberg",
        releaseYear: 1993,
        genre: "Historical Drama",
        rating: 8.9,
        description: "The true story of Oskar Schindler, a German businessman who saved over a thousand Jews from the Holocaust, highlighting the moral complexities of human nature and the incredible power of individual action amidst widespread atrocity.",
        poster: "https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg"
    },
    {
        id: uuidv4(),
        title: "Inception",
        director: "Christopher Nolan",
        releaseYear: 2010,
        genre: "Sci-Fi/Action",
        rating: 8.8,
        description: "A professional thief and his team of specialists steal information by infiltrating the subconscious minds of their targets, exploring the complex boundaries between dreams and reality while facing their inner demons in a high-stakes adventure.",
        poster: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg"
    },
    {
        id: uuidv4(),
        title: "The Matrix",
        director: "The Wachowskis",
        releaseYear: 1999,
        genre: "Sci-Fi/Action",
        rating: 8.7,
        description: "A computer hacker discovers the truth about the world he lives in and joins a rebellion against the machines, leading to a thrilling journey of self-discovery, freedom, and the fight against a dystopian reality.",
        poster: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg"
    },
    {
        id: uuidv4(),
        title: "Forrest Gump",
        director: "Robert Zemeckis",
        releaseYear: 1994,
        genre: "Comedy/Drama",
        rating: 8.8,
        description: "The life story of Forrest Gump, a kind-hearted man with a low IQ who unknowingly influences several historical events while navigating his own extraordinary journey, illustrating the impact of fate and the power of love.",
        poster: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg"
    },
    {
        id: uuidv4(),
        title: "Fight Club",
        director: "David Fincher",
        releaseYear: 1999,
        genre: "Psychological Thriller",
        rating: 8.8,
        description: "An insomniac office worker forms an underground fight club with a soap salesman and discovers a secret society that may destroy the world, challenging societal norms and exploring themes of identity, masculinity, and consumerism.",
        poster: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg"
    },
    {
        id: uuidv4(),
        title: "The Departed",
        director: "Martin Scorsese",
        releaseYear: 2006,
        genre: "Crime/Thriller",
        rating: 8.5,
        description: "An undercover cop and an undercover mobster infiltrate each other's organizations, leading to a tense game of cat and mouse filled with deception, betrayal, and moral ambiguity that culminates in a shocking conclusion.",
        poster: "https://upload.wikimedia.org/wikipedia/en/5/50/Departed234.jpg"
    },
    {
        id: uuidv4(),
        title: "The Social Network",
        director: "David Fincher",
        releaseYear: 2010,
        genre: "Drama/Biography",
        rating: 8.3,
        description: "The story of Mark Zuckerberg and the creation of Facebook, exploring themes of ambition, friendship, betrayal, and the consequences of technological innovation in the digital age as it reshapes human interaction.",
        poster: "https://upload.wikimedia.org/wikipedia/en/8/8c/The_Social_Network_film_poster.png"
    },
    {
        id: uuidv4(),
        title: "The King's Speech",
        director: "Tom Hooper",
        releaseYear: 2010,
        genre: "Drama/Historical",
        rating: 8.0,
        description: "King George VI struggles to overcome his stammer with the help of a speech therapist, highlighting the challenges of leadership, personal courage, and the importance of communication during a pivotal moment in history.",
        poster: "https://upload.wikimedia.org/wikipedia/en/4/4a/The_King%27s_Speech_poster.jpg"
    },
    {
        id: uuidv4(),
        title: "The Grand Budapest Hotel",
        director: "Wes Anderson",
        releaseYear: 2014,
        genre: "Comedy/Drama",
        rating: 8.1,
        description: "A concierge in a grand European hotel embarks on a series of adventures that intertwine themes of nostalgia, friendship, and the fading elegance of a bygone era, all set against a richly stylized backdrop.",
        poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Grand_Budapest_Hotel.png"
    },
    {
        id: uuidv4(),
        title: "La La Land",
        director: "Damien Chazelle",
        releaseYear: 2016,
        genre: "Musical/Romance",
        rating: 8.0,
        description: "An aspiring actress and a jazz musician fall in love in Los Angeles, navigating the challenges of ambition, romance, and the harsh realities of pursuing their dreams in a vibrant yet unforgiving city.",
        poster: "https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png"
    },
    {
        id: uuidv4(),
        title: "Moonlight",
        director: "Barry Jenkins",
        releaseYear: 2016,
        genre: "Drama",
        rating: 8.5,
        description: "A coming-of-age story about a young black man growing up in Miami, exploring themes of identity, family, love, and the quest for acceptance throughout different stages of life in a beautifully poignant manner.",
        poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Holma_Boat_Club_by_the_light_of_the_moon.jpg/375px-Holma_Boat_Club_by_the_light_of_the_moon.jpg"
    },
    {
        id: uuidv4(),
        title: "Star Wars: Episode IV - A New Hope",
        director: "George Lucas",
        releaseYear: 1977,
        genre: "Action, Adventure, Fantasy",
        rating: 8.6,
        description: "A young farm boy joins forces with a group of rebels to fight against the oppressive Galactic Empire and rescue Princess Leia.",
        poster: "https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg"
    },
    {
        id: uuidv4(),
        title: "Jurassic Park",
        director: "Steven Spielberg",
        releaseYear: 1993,
        genre: "Adventure, Sci-Fi, Thriller",
        rating: 8.1,
        description: "A theme park suffers a catastrophic failure when genetically-engineered dinosaurs escape containment, leading to a fight for survival.",
        poster: "https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg"
    },
    {
        id: uuidv4(),
        title: "Parasite",
        director: "Bong Joon-ho",
        releaseYear: 2019,
        genre: "Comedy, Drama, Thriller",
        rating: 8.6,
        description: "A poor family schemes to become employed by a wealthy family by posing as unrelated, highly qualified individuals, leading to unexpected consequences.",
        poster: "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png"
    },
    {
        id: uuidv4(),
        title: "The Lion King",
        director: "Roger Allers and Rob Minkoff",
        releaseYear: 1994,
        genre: "Animation, Adventure, Drama",
        rating: 8.5,
        description: "The journey of a young lion cub named Simba as he struggles to accept his place in the circle of life after the death of his father.",
        poster: "https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg"
    },
    {
        id: uuidv4(),
        title: "12 Years a Slave",
        director: "Steve McQueen",
        releaseYear: 2013,
        genre: "Biography, Drama, History",
        rating: 8.1,
        description: "Based on the true story of Solomon Northup, a free man who is kidnapped and sold into slavery, exploring his struggle for survival and freedom.",
        poster: "https://upload.wikimedia.org/wikipedia/en/5/5c/12_Years_a_Slave_film_poster.jpg"
    },
];

// ----------------------------------------------------------------------------------------------------------------------------------


// Update all redirects and renders to use relative URLs
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs", { posts });
});

app.post("/posts", (req, res) => {
    let { titlename, dir_name, description, poster, release, genere, ratings } = req.body;
    let id = uuidv4();
    posts.push({ id, title: titlename, director: dir_name, description, poster, release, genere, ratings });
    res.redirect("/posts"); // This is already correct
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) {
        res.render("error.ejs");
    }
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id != p.id);
    res.redirect("/posts");
});

// Use the port from environment variable
app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});

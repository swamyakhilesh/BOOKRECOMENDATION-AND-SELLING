document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0;
    const slidesAuto = document.querySelectorAll("#banner .banner-slide:not(.clickable)");
    const totalSlidesAuto = slidesAuto.length;

    function showAutoSlide(index) {
        const bannerContainer = document.querySelector("#banner .banner-container");
        bannerContainer.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextAutoSlide() {
        currentIndex = (currentIndex + 1) % totalSlidesAuto;
        showAutoSlide(currentIndex);
    }

    setInterval(nextAutoSlide, 3000); // Change slide every 3 seconds

    // Clickable banner slide
    const clickableSlide = document.querySelector("#banner .clickable");
    const clickableImages = clickableSlide.querySelectorAll("img");

    clickableSlide.addEventListener("click", () => {
        clickableImages.forEach(img => img.classList.toggle("hidden"));
    });

    // Optional: Add event listeners for manual slide control if needed
    document.querySelectorAll("#banner .banner-button").forEach((button, index) => {
        button.addEventListener("click", () => {
            showAutoSlide(index);
            currentIndex = index; // Update the current index
        });
    });
});

const books = {
    fiction: [
        "To Kill a Mockingbird by Harper Lee",
        "1984 by George Orwell",
        "The Great Gatsby by F. Scott Fitzgerald",
        "The Catcher in the Rye by J.D. Salinger",
        "Pride and Prejudice by Jane Austen"
    ],
    nonFiction: [
        "Sapiens by Yuval Noah Harari",
        "Educated by Tara Westover",
        "The Immortal Life of Henrietta Lacks by Rebecca Skloot",
        "The Wright Brothers by David McCullough"
    ],
    science: [
        "A Brief History of Time by Stephen Hawking",
        "The Selfish Gene by Richard Dawkins",
        "The Origin of Species by Charles Darwin",
        "Silent Spring by Rachel Carson"
    ],
    history: [
        "Guns, Germs, and Steel by Jared Diamond",
        "1776 by David McCullough",
        "The Diary of a Young Girl by Anne Frank",
        "Team of Rivals by Doris Kearns Goodwin"
    ],
    fiction: [
        "To Kill a Mockingbird by Harper Lee",
        "1984 by George Orwell",
        "The Great Gatsby by F. Scott Fitzgerald",
        "The Catcher in the Rye by J.D. Salinger",
        "Pride and Prejudice by Jane Austen"
    ],
};

document.getElementById('search-button').addEventListener('click', () => {
    const category = document.getElementById('category-select').value;
    const randomIndex = Math.floor(Math.random() * books[category].length);
    const bookName = books[category][randomIndex];
    document.getElementById('book-name').textContent = bookName;
});

const bookCollection = {
    fiction: [
        {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            description: "A gripping mystery involving a journalist and a hacker who investigate a wealthy ",
            category: "fiction"
        },
        {
            title: "1984",
            author: "George Orwell",
            description: "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.",
            category: "fiction"
        },
        {
            title: "The Girl with the Dragon Tattoo",
            author: "Stieg Larsson",
            description: "A novel about the serious issues of rape and racial inequality.",
            category: "fiction"
        }
        
        // More fiction books...
    ],
    nonFiction: [
        {
            title: "Sapiens",
            author: "Yuval Noah Harari",
            description: "A brief history of humankind.",
            category: "nonFiction"
        },
        {
            title: "Educated",
            author: "Tara Westover",
            description: "A memoir about a woman who grows up in a strict and abusive household in rural Idaho but eventually escapes to learn about the wider world through education.",
            category: "nonFiction"
        },
        // More non-fiction books...
    ],
    science: [
        {
            title: "A Brief History of Time",
            author: "Stephen Hawking",
            description: "An overview of cosmology, explaining complex concepts in a way accessible to the general public.",
            category: "science"
        },
        {
            title: "The Selfish Gene",
            author: "Richard Dawkins",
            description: "A book on evolution that popularized the gene-centered view of evolution.",
            category: "science"
        },
        // More science books...
    ],
    history: [
        {
            title: "Guns, Germs, and Steel",
            author: "Jared Diamond",
            description: "A transdisciplinary non-fiction book that explains why Eurasian and North African civilizations have survived and conquered others.",
            category: "history"
        },
        {
            title: "1776",
            author: "David McCullough",
            description: "A historical book about the American Revolutionary War.",
            category: "history"
        },
        // More history books...
    ]
};

document.getElementById('topic-search-button').addEventListener('click', () => {
    const searchQuery = document.getElementById('topic-search-bar').value.toLowerCase();
    let foundBook = null;

    for (const category in bookCollection) {
        foundBook = bookCollection[category].find(book => 
            book.title.toLowerCase().includes(searchQuery) ||
            book.author.toLowerCase().includes(searchQuery) ||
            book.description.toLowerCase().includes(searchQuery)
        );

        if (foundBook) break;
    }

    const bookDetails = document.getElementById('topic-book-details');
    if (foundBook) {
        bookDetails.innerHTML = `
            <h3>${foundBook.title}</h3>
            <p><strong>Author:</strong> ${foundBook.author}</p>
            <p><strong>Description:</strong> ${foundBook.description}</p>
            <p><strong>Category:</strong> ${foundBook.category}</p>
        `;
    } else {
        bookDetails.textContent = 'No book found for the given topic.';
    }
});

document.querySelectorAll('#search-examples li').forEach(example => {
    example.addEventListener('click', () => {
        document.getElementById('topic-search-bar').value = example.textContent;
        document.getElementById('topic-search-button').click();
    });
});

// script-book-search.js
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const mood = document.getElementById('mood').value;
    const taste = document.getElementById('taste').value;

    if (mood && taste) {
        const results = getBookRecommendations(mood, taste);
        displayResults(results);
    } else {
        alert('Please enter both mood and taste preferences.');
    }
});

const bookRecommendations = [
    { title: "To Kill a Mockingbird", author: "Harper Lee", mood: "thoughtful", taste: "classic" },
    { title: "1984", author: "George Orwell", mood: "dark", taste: "dystopian" },
    { title: "Pride and Prejudice", author: "Jane Austen", mood: "romantic", taste: "classic" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", mood: "melancholic", taste: "classic" },
    { title: "Moby-Dick", author: "Herman Melville", mood: "adventurous", taste: "classic" },
    { title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", mood: "whimsical", taste: "magical realism" },
    { title: "War and Peace", author: "Leo Tolstoy", mood: "reflective", taste: "historical" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", mood: "rebellious", taste: "modern classic" },
    { title: "Crime and Punishment", author: "Fyodor Dostoevsky", mood: "intense", taste: "psychological" },
    { title: "The Lord of the Rings", author: "J.R.R. Tolkien", mood: "epic", taste: "fantasy" },
    { title: "Harry Potter", author: "J.K. Rowling", mood: "adventurous", taste: "fantasy" },
    { title: "The Road", author: "Cormac McCarthy", mood: "dark", taste: "post-apocalyptic" },
    { title: "The Night Circus", author: "Erin Morgenstern", mood: "mysterious", taste: "fantasy" },
    { title: "The Alchemist", author: "Paulo Coelho", mood: "inspirational", taste: "philosophical" },
    { title: "Brave New World", author: "Aldous Huxley", mood: "thought-provoking", taste: "dystopian" },
    { title: "The Book Thief", author: "Markus Zusak", mood: "melancholic", taste: "historical" },
    { title: "The Kite Runner", author: "Khaled Hosseini", mood: "emotional", taste: "historical" },
    { title: "The Catch-22", author: "Joseph Heller", mood: "satirical", taste: "classic" },
    { title: "Jane Eyre", author: "Charlotte Brontë", mood: "romantic", taste: "classic" },
    { title: "Wuthering Heights", author: "Emily Brontë", mood: "dramatic", taste: "classic" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", mood: "adventurous", taste: "fantasy" },
    { title: "Life of Pi", author: "Yann Martel", mood: "thought-provoking", taste: "adventure" },
    { title: "Anna Karenina", author: "Leo Tolstoy", mood: "tragic", taste: "classic" },
    { title: "The Picture of Dorian Gray", author: "Oscar Wilde", mood: "dark", taste: "classic" },
    { title: "The Shining", author: "Stephen King", mood: "creepy", taste: "horror" },
    { title: "Dracula", author: "Bram Stoker", mood: "gothic", taste: "classic" },
    { title: "Frankenstein", author: "Mary Shelley", mood: "gothic", taste: "classic" },
    { title: "Great Expectations", author: "Charles Dickens", mood: "thoughtful", taste: "classic" },
    { title: "Les Misérables", author: "Victor Hugo", mood: "dramatic", taste: "historical" },
    { title: "A Tale of Two Cities", author: "Charles Dickens", mood: "historical", taste: "classic" },
    { title: "The Odyssey", author: "Homer", mood: "epic", taste: "classic" },
    { title: "The Iliad", author: "Homer", mood: "epic", taste: "classic" },
    { title: "Lolita", author: "Vladimir Nabokov", mood: "controversial", taste: "classic" },
    { title: "Fahrenheit 451", author: "Ray Bradbury", mood: "thought-provoking", taste: "dystopian" },
    { title: "The Handmaid's Tale", author: "Margaret Atwood", mood: "dark", taste: "dystopian" },
    { title: "Beloved", author: "Toni Morrison", mood: "emotional", taste: "historical" },
    { title: "Slaughterhouse-Five", author: "Kurt Vonnegut", mood: "satirical", taste: "science fiction" },
    { title: "A Clockwork Orange", author: "Anthony Burgess", mood: "disturbing", taste: "dystopian" },
    { title: "The Grapes of Wrath", author: "John Steinbeck", mood: "serious", taste: "historical" },
    { title: "East of Eden", author: "John Steinbeck", mood: "epic", taste: "historical" },
    { title: "Dune", author: "Frank Herbert", mood: "epic", taste: "science fiction" },
    { title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", mood: "philosophical", taste: "classic" },
    { title: "Middlesex", author: "Jeffrey Eugenides", mood: "reflective", taste: "contemporary" },
    { title: "The Goldfinch", author: "Donna Tartt", mood: "melancholic", taste: "contemporary" },
    { title: "American Gods", author: "Neil Gaiman", mood: "fantastical", taste: "fantasy" },
    { title: "The Giver", author: "Lois Lowry", mood: "thought-provoking", taste: "dystopian" },
    { title: "The Wind-Up Bird Chronicle", author: "Haruki Murakami", mood: "mysterious", taste: "magical realism" },
    { title: "Cloud Atlas", author: "David Mitchell", mood: "complex", taste: "science fiction" },
    { title: "Infinite Jest", author: "David Foster Wallace", mood: "thought-provoking", taste: "contemporary" },
    { title: "The Shadow of the Wind", author: "Carlos Ruiz Zafón", mood: "mysterious", taste: "historical" }
];

function getBookRecommendations(mood, taste) {
    return bookRecommendations
        .filter(book => book.mood === mood && book.taste === taste)
        .map(book => `${book.title} by ${book.author} matching mood "${mood}" and taste "${taste}"`);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = results.length > 0 
        ? results.map(result => `<p>${result}</p>`).join('') 
        : `<p>No recommendations found for mood "${mood}" and taste "${taste}".</p>`;
}

// JavaScript code can be added here for handling button clicks or other functionality
// This remains the same as before
document.getElementById('loginBtn').addEventListener('click', function() {
    alert('Login functionality will be implemented here.');
  });
  
  document.getElementById('registerBtn').addEventListener('click', function() {
    alert('Register functionality will be implemented here.');
  });
  
  document.getElementById('shopNowBtn').addEventListener('click', function() {
    alert('Redirect to shop page or initiate shopping functionality here.');
  });
  
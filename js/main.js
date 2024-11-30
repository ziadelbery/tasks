var quotes = [
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
];

var quoteElement = document.querySelector('.quote');
var authorElement = document.querySelector('.author');
var likeBtn = document.querySelector('.like-btn');
var saveBtn = document.querySelector('.save-btn');
var newQuoteBtn = document.querySelector('.new-quote-btn');
var shareBtn = document.querySelector('.share-btn');
var translateBtn = document.querySelector('.translate-btn');

var translations = {
    "Happiness is not something ready made. It comes from your own actions.": "السعادة ليست شيئًا جاهزًا. إنها تأتي من أفعالك.",
    "Success usually comes to those who are too busy to be looking for it.": "النجاح عادة ما يأتي لأولئك المشغولين جدًا عن البحث عنه.",
    "Don't be afraid to give up the good to go for the great.": "لا تخف من التخلي عن الجيد للوصول إلى العظيم.",
    "I find that the harder I work, the more luck I seem to have.": "أجد أنه كلما عملت بجد، زاد حظي."
};

var isTranslated = false;

function getNewQuote() {
    var randomIndex = Math.floor(Math.random() * quotes.length);
    var newQuote = quotes[randomIndex];
    quoteElement.textContent = `"${newQuote.text}"`;
    authorElement.textContent = `- ${newQuote.author}`;
    isTranslated = false;
    translateBtn.title = "Translate";
    likeBtn.classList.remove('liked');
    saveBtn.classList.remove('saved');
}

function likeQuote() {
    likeBtn.classList.toggle('liked');
}

function saveQuote() {
    saveBtn.classList.toggle('saved');
}

function shareQuote() {
    console.log("Quote shared!");
}

function translateQuote() {
    var currentQuote = quoteElement.textContent.replace(/"/g, '');
    if (!isTranslated) {
        if (translations[currentQuote]) {
            quoteElement.textContent = `"${translations[currentQuote]}"`;
            translateBtn.title = "Show Original";
            isTranslated = true;
        } else {
            console.log("Translation not available for this quote!");
        }
    } else {
        var originalQuote = Object.keys(translations).find(
            function (key) {
                return translations[key] === currentQuote;
            }
        );
        quoteElement.textContent = `"${originalQuote}"`;
        translateBtn.title = "Translate";
        isTranslated = false;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    newQuoteBtn.addEventListener('click', getNewQuote);
    likeBtn.addEventListener('click', likeQuote);
    saveBtn.addEventListener('click', saveQuote);
    shareBtn.addEventListener('click', shareQuote);
    translateBtn.addEventListener('click', translateQuote);
});

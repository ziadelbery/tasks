
const quotes = [
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
];

const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.author');
const likeBtn = document.querySelector('.like-btn');
const saveBtn = document.querySelector('.save-btn');
const newQuoteBtn = document.querySelector('.new-quote-btn');
const shareBtn = document.querySelector('.share-btn');

function getNewQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = `"${quotes[randomIndex].text}"`;
    authorElement.textContent = `- ${quotes[randomIndex].author}`;
}

function likeQuote() {
    alert("You liked this quote!");
}

function saveQuote() {
    alert("Quote saved!");
}

function shareQuote() {
    alert("Quote shared!");
}

newQuoteBtn.addEventListener('click', getNewQuote);
likeBtn.addEventListener('click', likeQuote);
saveBtn.addEventListener('click', saveQuote);
shareBtn.addEventListener('click', shareQuote);
const translations = {
    "Happiness is not something ready made. It comes from your own actions.": "السعادة ليست شيئًا جاهزًا. إنها تأتي من أفعالك.",
    "Success usually comes to those who are too busy to be looking for it.": "النجاح عادة ما يأتي لأولئك المشغولين جدًا عن البحث عنه.",
    "Don't be afraid to give up the good to go for the great.": "لا تخف من التخلي عن الجيد للوصول إلى العظيم.",
    "I find that the harder I work, the more luck I seem to have.": "أجد أنه كلما عملت بجد، زاد حظي."
};

const translateBtn = document.querySelector('.translate-btn');
let isTranslated = false;

function translateQuote() {
    const currentQuote = quoteElement.textContent.replace(/"/g, '');
    if (!isTranslated) {

        if (translations[currentQuote]) {
            quoteElement.textContent = `"${translations[currentQuote]}"`;
            translateBtn.title = "Show Original";
            isTranslated = true;
        } else {
            alert("Translation not available for this quote!");
        }
    } else {

        const originalQuote = Object.keys(translations).find(
            (key) => translations[key] === currentQuote
        );
        quoteElement.textContent = `"${originalQuote}"`;
        translateBtn.title = "Translate";
        isTranslated = false;
    }
}

translateBtn.addEventListener('click', translateQuote);
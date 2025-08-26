const words = [
    { word: "apple", translate: "яблоко", example: "I eat an apple every day" },
    { word: "book", translate: "книга", example: "I read  a book every weekend" },
    { word: "car", translate: "машина", example: "My car is fast" },
    { word: "house", translate: "дом", example: "I live in a big house" },
    { word: "mouse", translate: "мышка", example: "I saw a little mouse today" },
];

let currentIndex = 0;

const totalWord = document.getElementById("total-word");
const currentWord = document.getElementById("current-word");
const cardFrontTitle = document.querySelector("#card-front h1");
const cardBackTitle = document.querySelector("#card-back h1");
const cardBackExample = document.querySelector("#card-back span");

const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");
const examBtn = document.getElementById("exam");

const studyMode = document.getElementById("study-mode");
const examMode = document.getElementById("exam-mode");
const examCardContainer = document.getElementById("exam-cards");

const flipCard = document.querySelector(".flip-card");

function completeCard(index) {
    const item = words[index];
    cardFrontTitle.textContent = item.word;
    cardBackTitle.textContent = item.translate;
    cardBackExample.textContent = item.example;

    backBtn.disabled = index === 0;
    nextBtn.disabled = index === words.length - 1;
}

flipCard.addEventListener("click", () => {
    flipCard.classList.toggle("active");
});

backBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        completeCard(currentIndex);
        flipCard.classList.remove("active");
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < words.length - 1) {
        currentIndex++;
        completeCard(currentIndex);
        flipCard.classList.remove("active");
    }
});

examBtn.addEventListener("click", startExam);

function startExam() {
    studyMode.classList.add("hidden");
    studyMode.classList.remove("hidden");
    document.querySelector(".study-cards").classList.add("hidden");
    examCardContainer.innerHTML = "";
}

function initExamLogic() {
    examCardContainer.addEventListener("click", function(event) {
        const target = event.target;
        if (!target.classList.contains("exam-card")) return;
        if (!target.classList.contains("fade-out")) return;
    })

    if (!firstCard) {
        firstCard = target;
        firstCard.classList.add("correct");
    } else if (!secondCard && target !== firstCard) {
        secondCard = target;
        if (firstCard.dataset.id === secondCard.dataset.id && firstCard.dataset.type === secondCard.dataset.type) {
            setTimeout(() => {
                firstCard.classList.add("fade-out");
                secondCard.classList.add("fade-out");
                if (
                    [...examCardContainer.querySelectorAll(".exam-card")].every((card) =>
                        cardBackExample.classList.contains("fade-out"))
                ) {
                    alert("Поздравляю!Ты завершил тестирование");

                }
            }, 300);
        } else {
            secondCard.classList.add("wrong");
            setTimeout(() => {
                firstCard.classList.remove("correct");
                secondCard.classList.remove("wrong");
            }, 500);
        }
    }
}
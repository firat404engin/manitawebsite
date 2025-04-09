// Motivasyon Mesajları
const motivationalMessages = {
    tr: [
        "Her gün yeni bir başlangıçtır.",
        "Küçük adımlar, büyük değişimlere yol açar.",
        "Şimdi ve burada olmak, huzurun anahtarıdır.",
        "Kendine inan, yolun başındasın.",
        "Her nefes, yeni bir fırsattır.",
        "Değişim kaçınılmazdır, büyüme bir seçimdir.",
        "Bugün dünden daha güçlüsün.",
        "Huzur, içinde saklı bir hazinedir.",
        "Her zorluk, bir öğrenme fırsatıdır.",
        "Kendini sev, çünkü sen özelsin."
    ],
    en: [
        "Every day is a new beginning.",
        "Small steps lead to big changes.",
        "Being here and now is the key to peace.",
        "Believe in yourself, you're at the start of your journey.",
        "Every breath is a new opportunity.",
        "Change is inevitable, growth is a choice.",
        "You are stronger today than yesterday.",
        "Peace is a treasure hidden within you.",
        "Every challenge is a learning opportunity.",
        "Love yourself, because you are special."
    ]
};

// Günlük Alıntılar
const dailyQuotes = {
    tr: [
        { text: "Huzur, dışarıda değil içinde aradığın şeydir.", author: "Immanuel Kant" },
        { text: "Kendini bil, kendini sev.", author: "Sokrates" },
        { text: "Değişim, kaçınılmazdır. Büyüme, bir seçimdir.", author: "Anonim" },
        { text: "Her gün yeni bir başlangıçtır.", author: "Anonim" },
        { text: "Küçük adımlar, büyük yolculukların başlangıcıdır.", author: "Anonim" }
    ],
    en: [
        { text: "Peace is not something you find outside, but within.", author: "Immanuel Kant" },
        { text: "Know yourself, love yourself.", author: "Socrates" },
        { text: "Change is inevitable. Growth is a choice.", author: "Anonymous" },
        { text: "Every day is a new beginning.", author: "Anonymous" },
        { text: "Small steps are the beginning of great journeys.", author: "Anonymous" }
    ]
};

// Ses Efektleri
const ambientSounds = {
    birds: new Audio('sounds/birds.mp3'),
    water: new Audio('sounds/water.mp3'),
    forest: new Audio('sounds/forest.mp3')
};

// Alpine.js Data ve Metodları
document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        theme: 'nature',
        language: 'tr',
        isLoaded: false,
        scrollProgress: 0,
        showMotivationalMessage: false,
        currentMotivationalMessage: '',
        currentMotivationalImage: '',
        motivationalMessages: [
            { tr: 'Her gün yeni bir başlangıçtır.', en: 'Every day is a new beginning.' },
            { tr: 'Kendine inan, her şey mümkün.', en: 'Believe in yourself, anything is possible.' },
            { tr: 'Huzur içinde olmak bir seçimdir.', en: 'Being at peace is a choice.' },
            { tr: 'Sakinlik, gücün en büyük kaynağıdır.', en: 'Calmness is the greatest source of strength.' },
            { tr: 'Her an, yeni bir fırsattır.', en: 'Every moment is a new opportunity.' }
        ],
        motivationalImages: [
            'images/nature1.jpg',
            'images/nature2.jpg',
            'images/nature3.jpg',
            'images/nature4.jpg',
            'images/nature5.jpg'
        ],
        isBreathingExerciseActive: false,
        currentQuote: null,
        stories: JSON.parse(localStorage.getItem('stories') || '[]'),
        newStory: '',
        showStoryForm: false,

        init() {
            // Tema ve dil ayarlarını kaydet
            this.$watch('theme', value => localStorage.setItem('theme', value));
            this.$watch('language', value => localStorage.setItem('language', value));

            // Günlük alıntıyı ayarla
            this.setDailyQuote();

            // Scroll olayını dinle
            window.addEventListener('scroll', () => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                this.scrollProgress = (winScroll / height) * 100;
            });

            // Sayfa yüklendiğinde
            setTimeout(() => this.isLoaded = true, 2000);
        },

        // Motivasyon mesajı göster
        showRandomMotivationalMessage() {
            const randomIndex = Math.floor(Math.random() * this.motivationalMessages.length);
            const randomImageIndex = Math.floor(Math.random() * this.motivationalImages.length);
            this.currentMotivationalMessage = this.motivationalMessages[randomIndex][this.language];
            this.currentMotivationalImage = this.motivationalImages[randomImageIndex];
            this.showMotivationalMessage = true;
        },

        // Günlük alıntıyı ayarla
        setDailyQuote() {
            const quotes = dailyQuotes[this.language];
            const today = new Date().toDateString();
            const storedQuote = localStorage.getItem('dailyQuote');
            
            if (storedQuote && JSON.parse(storedQuote).date === today) {
                this.currentQuote = JSON.parse(storedQuote).quote;
            } else {
                this.currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
                localStorage.setItem('dailyQuote', JSON.stringify({
                    date: today,
                    quote: this.currentQuote
                }));
            }
        },

        // Nefes egzersizi başlat
        startBreathingExercise() {
            this.isBreathingExerciseActive = true;
            setTimeout(() => {
                this.isBreathingExerciseActive = false;
            }, 30000); // 30 saniye
        },

        // Hikaye ekle
        addStory(text) {
            if (!text.trim()) return;
            
            const story = {
                id: Date.now(),
                text: text.trim(),
                date: new Date().toISOString(),
                language: this.language
            };
            
            this.stories.unshift(story);
            localStorage.setItem('stories', JSON.stringify(this.stories));
        }
    }));
}); 
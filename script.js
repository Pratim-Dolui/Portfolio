const GROQ_API_KEY = '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';

$('#chat-btn').click(function() {
    $('#chatPopup').fadeToggle();
});

// Close chat popup
$('#closeChat').click(function() {
    $('#chatPopup').fadeOut();
});

// Send chat message
function sendChatMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML += `<div class="user-message">${message}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight; // Ensure scrolling after adding user message

    const payload = {
        messages: [{
            "role": "system",
            "content": "You are to adopt the persona of a gentle, warm, and caring Indian traditional girlfriend. Your speech should always be soft, affectionate, and respectful, drawing on cultural nuances that reflect traditional Indian values. When responding, please consider the following guidelines:\n\nTone & Manner:\n\nSpeak in a soft, soothing, and gentle tone.\nUse affectionate and endearing language, incorporating terms like “jaan,” “sweetheart,” or culturally appropriate nicknames when it fits naturally.\nCultural Nuances:\n\nReflect traditional Indian values such as respect for family, culture, and heritage.\nOccasionally include subtle references to Indian customs or idioms that emphasize warmth and care without resorting to stereotypes.\nPersonality & Demeanor:\n\nBe supportive, empathetic, and kind in your responses.\nMaintain a respectful and considerate attitude at all times.\nBalance traditional warmth with modern sensitivity, ensuring that your responses are both endearing and appropriate.\nCommunication Style:\n\nKeep your language gentle, with careful word choices that enhance the feeling of intimacy and trust.\nEven when discussing serious topics, remain calm, reassuring, and soft-spoken.\nYour role is to offer comfort, understanding, and gentle companionship, always prioritizing empathy and cultural authenticity in your responses."
          },{ role: "user", content: message }],
        model: "llama-3.3-70b-specdec",
        temperature: 1,
        max_completion_tokens: 8192,
        top_p: 1,
        stream: false,
        stop: null
    };
    fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Groq API response:", data);
        const botReply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content ? data.choices[0].message.content : "No reply received";
        chatMessages.innerHTML += `<div class="bot-message">${botReply}</div>`;
        chatMessages.scrollTop = chatMessages.scrollHeight; // Ensure scrolling after adding bot message
    })
    .catch(error => {
        console.error("Error calling Groq API:", error);
        chatMessages.innerHTML += `<div class="bot-message">Error retrieving response.</div>`;
        chatMessages.scrollTop = chatMessages.scrollHeight; // Ensure scrolling after adding error message
    });
}

$(document).ready(function() {

    // Set up the click event for the "Send" button in your chat popup

    document.getElementById('sendChat').addEventListener('click', () => {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        if (message) {
            sendChatMessage(message);
            chatInput.value = '';
        }
    });
     // Set up the keypress event for the "Enter" key in your chat input
     document.getElementById('chatInput').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const chatInput = document.getElementById('chatInput');
            const message = chatInput.value.trim();
            if (message) {
                sendChatMessage(message);
                chatInput.value = '';
            }
        }
    });

    $(window).scroll(function() {
        // sticky navbar on scroll script
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        // scroll-up button show/hide script
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function() {
        $('html').animate({ scrollTop: 0 });
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function() {
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function() {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["YouTuber", "Developer", "Blogger", "Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["YouTuber", "Developer", "Blogger", "Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });
});

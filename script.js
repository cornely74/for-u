/* =========================================================
   ❤️ CORRY &     JACK — EASY CONFIGURATION
========================================================= */

const loveConfig = {

    // Names
    person1: "Corry",
    person2: "vee",

    // Optional relationship date
    relationshipStartDate: "",

    // WhatsApp number
    // Example:
    // "255712345678"
    whatsappNumber: "255746371374",

    // Music
    // Put your MP3 inside the assets folder
    musicFile: "our-song.mp3",

    // Optional background music path
    backgroundMusic: "",

    // Romantic messages
    finalMessage:
        "One beautiful story at a time. ❤️"
};


/* =========================================================
   BASIC HELPERS
========================================================= */

const $ = (selector) =>
    document.querySelector(selector);

const $$ = (selector) =>
    document.querySelectorAll(selector);


const screens =
    [...document.querySelectorAll(".experience-section")];


/* =========================================================
   INSERT NAMES
========================================================= */

$$(".person1").forEach(element => {

    element.textContent =
        loveConfig.person1;

});


$$(".person2").forEach(element => {

    element.textContent =
        loveConfig.person2;

});


/* =========================================================
   OPENING SCREEN
========================================================= */

const openingScreen =
    $("#openingScreen");

const openButton =
    $("#openButton");


openButton.addEventListener("click", () => {

    openingScreen.classList.add("hidden");

    startFloatingParticles();

    showScreen("step1");

    createHeartBurst(15);

});


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function showScreen(id) {

    screens.forEach(screen => {

        screen.classList.remove("active");

    });


    const screen =
        document.getElementById(id);


    if (!screen) return;


    screen.classList.add("active");

}


/* =========================================================
   STEP 1
========================================================= */

$$(".cute-answer").forEach(button => {

    button.addEventListener("click", () => {

        $("#step1Response").textContent =
            "Correct answer. I knew you were smart 😌❤️";

        createHeartBurst(15);

        setTimeout(() => {

            showScreen("step2");

        }, 1100);

    });

});


/* =========================================================
   STEP 2
========================================================= */

$$(".date-choice").forEach(button => {

    button.addEventListener("click", () => {

        const selected =
            button.dataset.choice;

        $("#step2Response").textContent =
            `${selected}? Hmm… noted 👀❤️ ${loveConfig.person1} is taking notes.`;

        createHeartBurst(10);

        setTimeout(() => {

            showScreen("step3");

        }, 1300);

    });

});


/* =========================================================
   STEP 3
========================================================= */

$("#yesEnjoy").addEventListener("click", () => {

    $("#step3Response").textContent =
        "I knew it ❤️";

    createHeartBurst(12);

    setTimeout(() => {

        showScreen("step4");

    }, 900);

});


$("#maybeEnjoy").addEventListener("click", () => {

    $("#step3Response").textContent =
        "Maybe?? 😭😂 We need to investigate this.";

    setTimeout(() => {

        showScreen("step4");

    }, 1300);

});


/* =========================================================
   NO BUTTON
========================================================= */

const noButton =
    $("#noDate");

const answerArea =
    $("#answerArea");

const noMessage =
    $("#noMessage");


const noMessages = [

    "Hehe… try again 😂",

    "Are you sure? 👀",

    "vee please 😭❤️",

    "That button seems shy 😂",

    "Wrong button 😌🌹",

    "Nice try 😭❤️",

    "The button has other plans 😂"

];


let dodgeCount = 0;


/* Desktop */

noButton.addEventListener(
    "mouseenter",
    dodgeNoButton
);


/* Touch devices */

noButton.addEventListener(
    "touchstart",
    function(event) {

        event.preventDefault();

        dodgeNoButton();

    },
    {
        passive: false
    }
);


/* Keyboard */

noButton.addEventListener(
    "focus",
    dodgeNoButton
);


/* If somehow clicked */

noButton.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        dodgeNoButton();

    }
);


function dodgeNoButton() {

    const area =
        answerArea.getBoundingClientRect();


    const button =
        noButton.getBoundingClientRect();


    /*
        Calculate safe movement area.
        The button never leaves the answer area.
    */

    const maxX =
        Math.max(
            20,
            area.width - button.width - 20
        );


    const maxY = 90;


    const randomX =
        Math.random() * maxX -
        (area.width / 2 - button.width / 2);


    const randomY =
        Math.random() * maxY - 30;


    const rotation =
        Math.random() * 18 - 9;


    /*
        After several attempts,
        make the button slightly smaller.
    */

    const scale =
        Math.max(
            0.72,
            1 - dodgeCount * 0.04
        );


    noButton.style.transform =
        `translate(${randomX}px, ${randomY}px)
         rotate(${rotation}deg)
         scale(${scale})`;


    noMessage.textContent =
        noMessages[
            dodgeCount % noMessages.length
        ];


    dodgeCount++;

}


/* =========================================================
   YES BUTTON
========================================================= */

$("#yesDate").addEventListener("click", () => {

    createHeartBurst(80);

    createFlowerBurst(30);

    showScreen("step5");

});


/* =========================================================
   OPEN DATE PLANNER
========================================================= */

$("#openPlanner").addEventListener(
    "click",
    () => {

        showScreen("step6");

        setMinimumDate();

    }
);


/* =========================================================
   DATE MINIMUM
========================================================= */

function setMinimumDate() {

    const today =
        new Date();


    const localDate =
        new Date(
            today.getTime() -
            today.getTimezoneOffset() * 60000
        );


    $("#dateInput").min =
        localDate
            .toISOString()
            .split("T")[0];

}


/* =========================================================
   DATE FORM
========================================================= */

let selectedDateData = null;


$("#dateForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const date =
            $("#dateInput").value;


        const time =
            $("#timeInput").value;


        const type =
            document.querySelector(
                'input[name="dateType"]:checked'
            )?.value;


        const message =
            $("#messageInput").value.trim();


        if (!date || !time || !type) {

            return;

        }


        selectedDateData = {

            date,
            time,
            type,

            message:
                message ||
                "Just come with your beautiful smile. ❤️"

        };


        updateConfirmation();


        createHeartBurst(30);


        showScreen("step7");

    }
);


/* =========================================================
   UPDATE CONFIRMATION
========================================================= */

function updateConfirmation() {

    const data =
        selectedDateData;


    if (!data) return;


    const dateObject =
        new Date(
            `${data.date}T${data.time}`
        );


    const formattedDate =
        dateObject.toLocaleDateString(
            undefined,
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );


    const formattedTime =
        dateObject.toLocaleTimeString(
            undefined,
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );


    $("#summaryDate").textContent =
        formattedDate;


    $("#summaryTime").textContent =
        formattedTime;


    $("#summaryType").textContent =
        data.type;


    $("#summaryMessage").textContent =
        data.message;

}


/* =========================================================
   SAVE DATE TO CALENDAR
========================================================= */

$("#calendarButton").addEventListener(
    "click",
    () => {

        if (!selectedDateData) return;


        const start =
            new Date(
                `${selectedDateData.date}
                T${selectedDateData.time}`
                .replace(/\s/g, "")
            );


        /*
            Two-hour date duration.
        */

        const end =
            new Date(
                start.getTime() +
                (2 * 60 * 60 * 1000)
            );


        const calendarData = [

            "BEGIN:VCALENDAR",

            "VERSION:2.0",

            "PRODID:-//Corry Vee//Date//EN",

            "BEGIN:VEVENT",

            `UID:${Date.now()}@corry-Vee`,

            `DTSTAMP:${formatICSDate(new Date())}`,

            `DTSTART:${formatICSDate(start)}`,

            `DTEND:${formatICSDate(end)}`,

            "SUMMARY:Corry ❤️ Vee — Date",

            `DESCRIPTION:${escapeICS(
                selectedDateData.type +
                " - " +
                selectedDateData.message
            )}`,

            "END:VEVENT",

            "END:VCALENDAR"

        ].join("\r\n");


        const blob =
            new Blob(
                [calendarData],
                {
                    type:
                        "text/calendar;charset=utf-8"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            "Corry-Vee-Date.ics";


        document.body.appendChild(link);

        link.click();

        link.remove();


        URL.revokeObjectURL(url);

    }
);


function formatICSDate(date) {

    const pad =
        number =>
            String(number).padStart(2, "0");


    return (

        date.getFullYear() +

        pad(date.getMonth() + 1) +

        pad(date.getDate()) +

        "T" +

        pad(date.getHours()) +

        pad(date.getMinutes()) +

        pad(date.getSeconds())

    );

}


function escapeICS(text) {

    return text

        .replace(/\\/g, "\\\\")

        .replace(/\n/g, "\\n")

        .replace(/,/g, "\\,")

        .replace(/;/g, "\\;");

}


/* =========================================================
   WHATSAPP
========================================================= */

$("#whatsappButton").addEventListener(
    "click",
    () => {

        if (!selectedDateData) return;


        const dateObject =
            new Date(
                `${selectedDateData.date}
                T${selectedDateData.time}`
                .replace(/\s/g, "")
            );


        const formattedDate =
            dateObject.toLocaleDateString(
                undefined,
                {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );


        const formattedTime =
            dateObject.toLocaleTimeString(
                undefined,
                {
                    hour: "numeric",
                    minute: "2-digit"
                }
            );


        const whatsappMessage =

`Corry ❤️ Vee accepted the date!

📅 ${formattedDate}

🕐 ${formattedTime}

🌹 ${selectedDateData.type}

💌 ${selectedDateData.message}

Looks like it's a date! 😌❤️`;


        /*
            If number is empty:
            WhatsApp opens with the message.

            If number is provided:
            WhatsApp opens directly to that number.
        */

        let whatsappURL;


        if (
            loveConfig.whatsappNumber.trim() !== ""
        ) {

            const number =
                loveConfig.whatsappNumber
                    .replace(/\D/g, "");


            whatsappURL =
                `https://wa.me/${number}?text=${encodeURIComponent(
                    whatsappMessage
                )}`;

        } else {

            whatsappURL =
                `https://wa.me/?text=${encodeURIComponent(
                    whatsappMessage
                )}`;

        }


        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    }
);


/* =========================================================
   FINAL SCREEN
========================================================= */

$("#finalButton").addEventListener(
    "click",
    () => {

        createHeartBurst(25);

        createFlowerBurst(20);

        showScreen("step8");

    }
);


/* =========================================================
   MUSIC PLAYER
========================================================= */

const music =
    $("#backgroundMusic");

const musicButton =
    $("#musicButton");


music.src =
    loveConfig.musicFile;


musicButton.addEventListener(
    "click",
    async () => {

        if (!loveConfig.musicFile) {

            alert(
                "Add your music file inside the assets folder."
            );

            return;

        }


        try {

            if (music.paused) {

                await music.play();

                musicButton.textContent =
                    "❚❚";

            } else {

                music.pause();

                musicButton.textContent =
                    "♫";

            }

        } catch (error) {

            console.error(error);

            alert(
                "The music could not be played. Check your music file path."
            );

        }

    }
);


/* =========================================================
   FLOATING HEARTS + FLOWERS
========================================================= */

function startFloatingParticles() {

    setInterval(() => {

        const particle =
            document.createElement("span");


        particle.className =
            "particle";


        const symbols = [
            "♥",
            "♡",
            "✿",
            "❀",
            "✦",
            "🌸"
        ];


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.top =
            "-30px";


        particle.style.fontSize =
            `${10 + Math.random() * 18}px`;


        particle.style.color =
            Math.random() > 0.5
                ? "#c76f88"
                : "#d9bd88";


        particle.style.animationDuration =
            `${5 + Math.random() * 7}s`;


        $("#particles")
            .appendChild(particle);


        setTimeout(() => {

            particle.remove();

        }, 13000);

    }, 550);

}


/* =========================================================
   HEART EXPLOSION
========================================================= */

function createHeartBurst(amount) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const heart =
            document.createElement("span");


        heart.className =
            "burst-particle";


        heart.textContent =
            Math.random() > 0.25
                ? "♥"
                : "✨";


        heart.style.left =
            "50%";


        heart.style.top =
            "50%";


        heart.style.fontSize =
            `${12 + Math.random() * 25}px`;


        heart.style.color =
            Math.random() > 0.5
                ? "#c76f88"
                : "#efb4c4";


        heart.style.setProperty(
            "--x",
            `${(Math.random() - 0.5) * 800}px`
        );


        heart.style.setProperty(
            "--y",
            `${(Math.random() - 0.5) * 600}px`
        );


        $("#particles")
            .appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 1400);

    }

}


/* =========================================================
   FLOWER BURST
========================================================= */

function createFlowerBurst(amount) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const flower =
            document.createElement("span");


        flower.className =
            "burst-particle";


        flower.textContent =
            Math.random() > 0.5
                ? "🌹"
                : "🌸";


        flower.style.left =
            "50%";


        flower.style.top =
            "50%";


        flower.style.fontSize =
            `${14 + Math.random() * 20}px`;


        flower.style.setProperty(
            "--x",
            `${(Math.random() - 0.5) * 900}px`
        );


        flower.style.setProperty(
            "--y",
            `${(Math.random() - 0.5) * 700}px`
        );


        $("#particles")
            .appendChild(flower);


        setTimeout(() => {

            flower.remove();

        }, 1700);

    }

}


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            noButton.style.transform =
                "translate(0,0) rotate(0deg) scale(1)";

        }

    }
);

function goBack() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}
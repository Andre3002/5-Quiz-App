'use strict';

// Initialize variables to track the score and current question
let score = 0;
let currentQuestion = 0;

// Responds to "start" button --------------------- TESTED AND WORKS ----------------------
function startQuiz() {
    $('button#start').on('click', function (event) {
        displayQuestion();
    })
}

// Display current status (i.e. score and question progress) -------- TESTED AND WORKS / UPDATE WITH FLEXBOX! ------
function displayStatus() {
    const statusHtml = $(`
            <p>
                Question number: ${currentQuestion + 1}/${STORE.questions.length}    
                Score: ${score}/${STORE.questions.length}
            </p>
        `);
    $('.question-and-score').html(statusHtml);
}

// Display answer choices for questions ---------------- TESTED AND WORKS -------------------------
function displayChoices() {

    let question = STORE.questions[currentQuestion];
    //console.log(question) // QA is OK
    for (let i = 0; i < question.options.length; i++) {
        //console.log(question.options.length); //QA is OK
        $('.js-options').append(`
        <input type = "radio" name="options" id="option${i + 1}" value="${question.options[i]}" tabindex="${i + 1}" required>
        <label for="option${i + 1}"> ${question.options[i]}</label>
        <br>
        <span id="js-r${i + 1}"></span>
        `);
    }

}

// Displays the current question  ------------------------- TESTED AND WORKS ---------------------
function displayQuestion() {

    let question = STORE.questions[currentQuestion];
    displayStatus();
    const questionHtml = $(`
    <div>
        <form id="js-questions" class="question-form">

            <fieldset>
                <div class="row question">
                    <div class="col-12">
                        <legend> ${question.question}</legend>
                    </div>
                </div>

                <div class="row options">
                    <div class="col-12">
                        <div class="js-options"> </div>  <!-- -----.js-options added here ------ -->
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <button type="submit" id="answer" tabindex="5">Submit</button>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
    `);
    $('main').html(questionHtml);
    displayChoices();
    $('button#next-question').hide(); // hides the next question button until answer is evaluated

}

// Display final quiz results and the restart quiz button ------- TESTED AND WORKS ----------
function displayResults() {

    $('#js-answered').hide();
    $('#js-score').hide();

    let resultHtml = $(
        `<div class="results">
            <form id="js-restart-quiz">
                <fieldset>
                    <div class="row">
                        <div class="col=12">
                            <legend>You answered ${STORE.questions.length} questions </legend> <br>
                            <legend>Your final score is: ${score}/${STORE.questions.length}</legend> <br>
                            <button type="button" id="restart">Restart The Quiz</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
        `);

    $('main').html(resultHtml);

}

// Responds to "next question" button -------------- TESTED AND WORKS ------------------
function nextQuestion() {

    $('body').on('click', 'button#next-question', function (event) {
        if (currentQuestion == STORE.questions.length) {
            displayResults();
        } else {
            displayQuestion();
        }
    });

}

// Evalutes answer to question ---------------------- Tested and Works --------------------------
function evalAnswer() {

    $('body').on('submit', '#js-questions', function (event) {
        event.preventDefault(); // prevent default form submission
        let currentQues = STORE.questions[currentQuestion];
        let selectedOption = $("input[name=options]:checked").val(); //obtain selected answer choice

        if (selectedOption == currentQues.answer) {
            score++;
            displayStatus();
            $('main').html(`
            <p> Your answer is correct! </p>
            <div class="row">
                    <div class="col-12">
                        <button type="button" id="next-question" tabindex="6"> Next Question </button>
                    </div>
            </div>        
            `);
        } else {
            $('main').html(`
                <p> Your answer is incorrect. <br> The correct answer is ${currentQues.answer}. <br> </p>
                <div class="row">
                    <div class="col-12">
                        <button type="button" id="next-question" tabindex="6"> Next Question </button>
                    </div>
                </div>    
            `);
        }
        // increment counter to next question
        currentQuestion++;
    });

}

// Responds to "restart quiz" button ------------TESTED AND WORKS --------------------
function restartQuiz() {
    $('body').on('click', 'button#restart', function (event) {
        //console.log("* RESTART BUTTON HAS BEEN PRESSED");
        score = 0;
        currentQuestion = 0;
        displayQuestion();
    });
}

// Main function to call all others
function handleQuizApp() {
    //console.log("> handleQuizApp function has started");
    startQuiz();
    nextQuestion();
    evalAnswer();
    restartQuiz();
    //console.log("> handleQuizApp function has ended");
}

$(handleQuizApp());
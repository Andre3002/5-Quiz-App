'use strict';

function render() {
    let html="";
    if (STORE.page == "landing") {
        html = `
        <section class="start-section">
      <!-- This is the description text for the quiz -->
      <div class="start-page">
        <p> This quiz tests five basic corporate finance topics.</p>
        <p>Enjoy the quiz!</p>
      </div>

      <!-- This is the start button -->
      <div class="start-page">
        <button type="button" id="start">Start The Quiz</button>
      </div>
    </section>
        `
    }
    else if (STORE.page=="question") {
        html = displayQuestion();
    }
  
  
    else if (STORE.page=="score"){
       html = displayResults();
    }

    $("main").html(html);
}

// Display current status (i.e. score and question progress) -------- TESTED AND WORKS ------
function displayStatus() {
    const statusHtml = $(`
            <p>
                Question number: ${STORE.currentQuestion + 1}/${STORE.questions.length}    
                Score: ${STORE.score}/${STORE.questions.length}
            </p>
        `);
    $('.question-and-score').html(statusHtml);
}

// Display answer choices for questions ---------------- TESTED AND WORKS -------------------------
function displayChoices() {
    let options = "";
    let question = STORE.questions[STORE.currentQuestion];
    for (let i = 0; i < question.options.length; i++) {
        options +=
            `
        <input type = "radio" name="options" id="option${i + 1}" value="${question.options[i]}" tabindex="${i + 1}" required>
        <label for="option${i + 1}"> ${question.options[i]}</label>
        <br>
        <span id="js-r${i + 1}"></span>
        `;
    }
    return options;

}

// Displays the current question  ------------------------- TESTED AND WORKS ---------------------
function displayQuestion() {
    
    let question = STORE.questions[STORE.currentQuestion];
    displayStatus();
    const questionHtml = `
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
                        <div class="js-options"> 
                        ${displayChoices()}
                        </div>  <!-- -----.js-options added here ------ -->
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
    `;
    return questionHtml;

}

// Display final quiz results and the restart quiz button ------- TESTED AND WORKS ----------
function displayResults() {

    $('#js-answered').hide();
    $('#js-score').hide();

    let resultHtml =
        `<div class="results">
            <form id="js-restart-quiz">
                <fieldset>
                    <div class="row">
                        <div class="col=12">
                            <legend>You answered ${STORE.questions.length} questions </legend> <br>
                            <legend>Your final score is: ${STORE.score}/${STORE.questions.length}</legend> <br>
                            <button type="button" id="restart">Restart The Quiz</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
        `;


    //$('main').html(resultHtml);
    return resultHtml;

}


// Responds to "start" button --------------------- TESTED AND WORKS ----------------------
function startQuiz() {
    $('body').on('click','button#start', function (event) {
        STORE.page="question";
        render();
    })
}

// Responds to "next question" button -------------- TESTED AND WORKS ------------------
function nextQuestion() {

    $('body').on('click', 'button#next-question', function (event) {
        if (STORE.currentQuestion == STORE.questions.length) {
            STORE.page="score";
        } else {
            STORE.page="question";
        }
        render();
    });

}

// Evalutes answer to question ---------------------- Tested and Works --------------------------
function evalAnswer() {

    $('body').on('submit', '#js-questions', function (event) {
        event.preventDefault(); // prevent default form submission
        let currentQues = STORE.questions[STORE.currentQuestion];
        let selectedOption = $("input[name=options]:checked").val(); //obtain selected answer choice

        if (selectedOption == currentQues.answer) {
            STORE.score++;
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
        STORE.currentQuestion++;
    });

}

// Responds to "restart quiz" button ------------TESTED AND WORKS --------------------
function restartQuiz() {
    $('body').on('click', 'button#restart', function (event) {
        STORE.score = 0;
        STORE.currentQuestion = 0;
        STORE.page="landing";
        render();
    });
}

// Main function to call all others
function handleQuizApp() {
    startQuiz();
    nextQuestion();
    evalAnswer();
    restartQuiz();
    render();
}

$(handleQuizApp());
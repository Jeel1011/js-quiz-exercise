$(document).ready(function() {
    // Reset the form when refresh button is clicked
    $('.container__quiz-refresh-button').click(function() {
        $('#quiz-form')[0].reset();
        $('.container__quiz-footer-buttons').show(); // Show submit button after refresh
        $('.container__quiz-footer-note-text').show(); 
        $('#quiz-error-message').hide();
        $('#result').empty(); // Clear previous result
        $('input[type="radio"]').removeClass('wrong right'); // Remove wrong and right classes
        $('.container__quiz-submit-button').removeClass('quiz-submitted');
    });

    // Handle form submission
    $('.container__quiz-submit-button').click(function() {
        var emptyInputs = $('input[type="radio"]:checked').length !== 5;

        if (emptyInputs) {
            $('#quiz-error-message').text('Please answer all questions.').show();
        } else {
            $('#quiz-error-message').hide(); // Hide error message if all questions are answered
           

            var score = 0;
            var answers = ['7', '24', '26', '7', 'Camel']; // Correct answers
            var userAnswers = [];

            $('input[type=radio]:checked').each(function() {
                userAnswers.push($(this).val());
            });

            for (var i = 0; i < answers.length; i++) {
                if (userAnswers[i] === answers[i]) {
                    $('input[type=radio][name=q' + (i + 1) + '][value="' + userAnswers[i] + '"]').addClass('right');
                    score++;
                } else {
                    $('input[type=radio][name=q' + (i + 1) + '][value="' + userAnswers[i] + '"]').addClass('wrong');
                }
                
            }

            var percentage = (score / answers.length) * 100;
            var resultMessage = '';

            if (percentage < 40) {
                resultMessage = 'You are failed.';
            } else if (percentage >= 40 && percentage < 80) {
                resultMessage = 'You are passed.';
            } else {
                resultMessage = 'You are distinct.';
            }

            $('#result').html('<p>Result: ' + score + ' out of ' + answers.length + ' questions are correct. You achieved ' + percentage.toFixed(2) + '% Score.<br> ' + resultMessage + '</p>');         
            $(".container__quiz-footer-note-text").hide();

            $('.container__quiz-submit-button').addClass('quiz-submitted'); // Add submitted button color
        }
            
    });

});

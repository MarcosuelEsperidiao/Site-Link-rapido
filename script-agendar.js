$(document).ready(function() {
    $('#appointmentForm').submit(function(event) {
        event.preventDefault();

        var formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            service: $('#service').val(),
            date: $('#date').val(),
            time: $('#time').val()
        };

        $.ajax({
            type: 'POST',
            url: '/agendar',
            data: formData,
            success: function(response) {
                $('#message').text(response.message);
                $('#appointmentForm')[0].reset();
            },
            error: function(xhr, status, error) {
                $('#message').text('Erro ao agendar: ' + error);
            }
        });
    });
});

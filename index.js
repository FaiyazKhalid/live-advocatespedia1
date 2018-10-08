function ajaxCall() {
    $.ajax({
        url: 'https://advocatespedia.com/api.php?action=query&list=search&format=json&srsearch=' + $('#search').val(),
        dataType: 'jsonp',
        type: 'GET',
        success: function(data) {
            $('#update').empty();
            var data = JSON.stringify(data);
            data = JSON.parse(data);
            var output = '';
            data.query.search.forEach(function(data) {
                var title = '<h2>' + data.title + '</h2>' + '<br>';
                var snippet = '<p>' + data.snippet + '</P>';
                var url = '<a href="https://advocatespedia.com/' + data.title + '" target="_blank">';
                var endUrl = '</a>';
                output += url + title + endUrl + snippet + '<hr>';
            });
            $('#update').append(output);
        }
    });
}

function randomFunction() {
    $('#update').empty();
    $('#serach').empty();
    $('iframe').attr('src', 'https://advocatespedia.com/Special:Random');
}

$(document).ready(function() {
    $('#search').focus();
    $('#search').off('keyup');
    $('#search').on('keyup', function() {
        ajaxCall();
        $('iframe').attr('src', '');
    });
    // show random wiki article
    $('.random').on('click', function() {
        randomFunction();
        $(this).text('Show me another random article!');
    });
});

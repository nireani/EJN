const render = playe => {
    $(`#container`).empty();
    const source = $("#player-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template({ playe });
    $(`#container`).append(newHTML);
  };
  const getRoster = () => {
    let input = $(`#input`).val();
    $.get(`/teams/${input}`, function(response) {
      render(response)
    });
  };
  
  $(`#getRoster`).on(`click`, function() {
    $(`#container`).empty();
    getRoster();
    // $("#input").val('');
  });
  
  
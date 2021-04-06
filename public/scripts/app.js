$(() => {
  $.ajax({
    method: "GET",
    url: "/db/quiz" // Replace with db file!
  }).done(quizes => {
    // show quizes
});

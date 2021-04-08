$(document).ready(function() {
  $("#view_quiz").on("click", function() {
    $("#view_quiz_display").css("display", "block");
    $("#view_quiz").css("display", "none");
  });

  $("#result_detail").on("click", function() {
    $(".quiz_result").css("display", "block");
    $("#result_detail").css("display", "none");
  });
});

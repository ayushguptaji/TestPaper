var stop_timer;
//for timer
function prependZero(number) {
  if (number <= 9) return "0" + number;
  else return number;
}

//add option
function add_option(t) {
  $(t.parentNode.children[0]).append(`<div>
    <div class="input-group">
        <div class="input-group-text">${
          t.parentNode.children[0].children.length + 1
        })</div>
        <textarea class="form-control option" rows="1" placeholder="Write Option Here"></textarea>
    </div>
</div>`);
}

//delete option
function delete_option(t) {
  $(t.parentNode.children[0].lastElementChild).remove();
}

//calculate Total Marks
function calc_total_marks() {
  let total_mark = 0;
  for (let i of $(".marks")) {
    if (i.value != "") total_mark = total_mark + parseInt(i.value);
  }
  $("#total_marks_for_test").text(total_mark);
}

$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip({ placement: "bottom" });

  //adding total marks calculation
  $("#all_question").on("keyup",".marks",function(){
    calc_total_marks()});
  
  //remove question
  $("#all_question").on("click",".remove_question",function(event){
    $(event.target).parents(".each_question").remove();
    calc_total_marks()});

  $("#add_question").click(function () {
    $("#all_question").append(`<div class="mt-3 card each_question">
        <div class="card-header">
            <div class="row">
                <div class="col-lg-9 col-12">
                    <div class="input-group">
                        <div class="input-group-text">Q.</div>
                        <textarea class="form-control question" rows="1" placeholder="Write The Question Here"></textarea>
                    </div>
                </div>
                <div class="col-lg-3 offset-lg-0 col-6 offset-6 mt-lg-0 mt-2">
                    <div class="input-group">
                        <div class="input-group-text" data-toggle="tooltip" title="Enter only integer">Marks</div>
                        <input type="text" class="form-control text-end marks">
                        <a class="fa fa-trash input-group-text fs-5 pt-2 remove_question" data-toggle="tooltip" title="Remove this Question"></a>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="card-body">
            <div class="options">
            <div>
                <div class="input-group">
                    <div class="input-group-text">1)</div>
                    <textarea class="form-control option" rows="1" placeholder="Write Option Here"></textarea>
                </div>
            </div>
            <div>
                <div class="input-group">
                    <div class="input-group-text">2)</div>
                    <textarea class="form-control option" rows="1" placeholder="Write Option Here"></textarea>
                </div>
            </div>
            <div>
                <div class="input-group">
                    <div class="input-group-text">3)</div>
                    <textarea class="form-control option" rows="1" placeholder="Write Option Here"></textarea>
                </div>
            </div>
            <div>
                <div class="input-group">
                    <div class="input-group-text">4)</div>
                    <textarea class="form-control option" rows="1" placeholder="Write Option Here"></textarea>
                </div>
            </div>
            </div>
            <a class="mt-2 d-inline-block btn btn-primary" onclick="add_option(this)">+Add Option</a>
            <a class="mt-2 d-inline-block btn btn-primary" onclick="delete_option(this)">-Delete Option</a>
            <div class="input-group mt-2">
                <div class="input-group-text"  data-toggle="tooltip" title="Write Correct Answer's Option No. eg. If Correct Option for this question is 2, then write 2 in this field">Correct Answer</div>
                <input class="form-control correct_answer" placeholder="Write Only Option No. eg.1"></input>
            </div>
        </div>
        
    </div>`);

    $('[data-toggle="tooltip"]').tooltip({ placement: "bottom" });
    window.scrollBy(0, 500);
  });

  //preview paper
  $("#preview_paper").click(function () {
    //scroll window to top
    window.scrollTo(0, 0);

    //hide teacher segment
    $("#teacher_work").css("display", "none");

    //show preview work
    $("#preview_work").css("display", "");

    //total_marks
    $("#total_marks").text($("#total_marks_for_test").text());

    //total time
    $("#total_time").text($("#time_for_test").val());

    //clearing all data of preview_question
    $("#preview_question").empty();
    //adding each question
    for (let i = 0; i < $(".each_question").length; i++) {
      //console.log($(".options")[i].children.length)
      $("#preview_question").append(`<div class="card mt-4 shadow">
                <div class="card-header">
                    <div class="row">
                        <div class="col-lg-9 col-12"> 
                            <div class="input-group">
                                <div class="input-group-text">Q.${i+1}</div>
                                <div class="form-control">${
                                  $(".question")[i].value
                                }</div>
                            </div>  
                        </div>
                        <div class="col-lg-2 offset-lg-1 col-4 offset-8 mt-lg-0 mt-2">
                            <div class="input-group">
                                <div class="input-group-text">Marks</div>
                                <div class="form-control">${
                                  $(".marks")[i].value
                                }</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body preview_card_body">
                    <div id="preview_options_q${i + 1}">
                    </div>
                </div>
            </div>`);

      for (let j = 0; j < $(".options")[i].children.length; j++) {
        $(`#preview_options_q${i + 1}`).append(`<div class="form-check">
                        <input class="form-check-input" type="radio" name="question${
                          i + 1
                        }" id="question${i + 1}option${j + 1}" disabled>
                        <label class="form-check-label" for="question${
                          i + 1
                        }option${j + 1}">
                            ${
                              $(".options")[i].children[j].children[0]
                                .children[1].value
                            }
                        </label>
                    </div>`);
      }
    }
  });

  //modify question paper
  $("#modify_question_paper").click(function () {
    //scroll window to top
    window.scrollTo(0, 0);

    //show teacher segment
    $("#teacher_work").css("display", "");

    //hide preview work
    $("#preview_work").css("display", "none");
  });

  //start test
  $("#start_test").click(function () {
    
    //scroll window to top
    window.scrollTo(0, 0);
    
    //enable input
    $("input").prop("disabled", false);
    
    //remove modify and start test
    $("#modify_start_test").remove();
    
    //show submit test
    $("#submit_test").css("display", "");
    
    //timer
    let h,
      m,
      s = 0;
    let total_time = $("#total_time").text();
    if (total_time >= 60) {
      h = Math.floor(total_time / 60);
      m = total_time % 60;
    } else {
      h = 0;
      m = total_time;
    }
    stop_timer = setInterval(() => {
      let t = document.querySelector("#total_time");
      if (h == 0 && m == 0 && s == 0) {
        t.innerHTML = "Time Out";
        // hide preview work
        $("#preview_work").css("display", "none");
        //show test completed section
        $("#test_completed_section").css("display", "");
        clearInterval(stop_timer);
      } else {
        s = s - 1;
        if (s < 0) {
          m = m - 1;
          s = 59;
        }
        if (m < 0) {
          s = 59;
          m = 59;
          h = h - 1;
        }
        t.innerHTML = `${prependZero(h)}:${prependZero(m)}:${prependZero(s)}`;
      }
    }, 1000);
  });

  //submit test
  $("#submit_test").click(function () {
    //stop timer
    clearInterval(stop_timer);

    //scroll window to top
    window.scrollTo(0, 0);

    // hide preview work
    $("#preview_work").css("display", "none");

    //show test completed section
    $("#test_completed_section").css("display", "");
  });

  //view scorecard
  $("#view_scorecard").click(function () {
    //hide test completed section
    $("#test_completed_section").css("display", "none");

    //show scorecard
    $("#scorecard").css("display", "flex");

    //final score calculation
    let final_score = 0;
    for (let i = 0; i < $(".each_question").length; i++) {
      if ($(`input[name=question${i + 1}]:checked`).attr("id") != undefined) {
        let x = $(`input[name=question${i + 1}]:checked`).attr("id").length;
        if (
          $(".correct_answer")[i].value ==
          $(`input[name=question${i + 1}]:checked`)
            .attr("id")
            .slice(x - 1, x)
        ) {
          final_score = final_score + parseInt($(".marks")[i].value);
        }
      }
    }

    //final score change
    $("#final_score").text(
      `${final_score}/${$("#total_marks_for_test").text()}`
    );
  });

  //view detailed scorecard
  $("#view_detailed_scorecard").click(function(){
    //hide scorecard
    $("#scorecard").css("display","none");

    //showing marked answers
    $("#preview_work").css("display","");

    //hide the time section
    $("#time_section").css("display","none");

    //hide the submit test button
    $("#submit_test").css("display","none");

    //disable input
    $("input").prop("disabled", true);

    //adding correct answers
    for(let i=0;i<$(".preview_card_body").length;i++)
    {
      $($(".preview_card_body")[i]).append(`<div class="input-group mt-2">
        <div class="input-group-text">Correct Answer</div>
        <div class="form-control">${$(".correct_answer")[i].value}</div>
        </div>`)
    }
  })
});

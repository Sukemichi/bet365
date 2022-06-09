(script = document.createElement('script')).src = 'https://code.jquery.com/jquery-latest.min.js';
document.getElementsByTagName('head')[0].appendChild(script);


setTimeout (function() {
  createFilter();
  createFavorite();
  $("div.ipn-Competition").click();
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const ul = document.getElementById("ul");
  const filterList = JSON.parse(localStorage.getItem("filterWord"));

setInterval(() => {
  selection();
}, 5000);


  if(filterList) {
    filterList.forEach(filter => {
      add(filter);
    })
  };
  selection();
  form.addEventListener("submit", function(event){
    event.preventDefault();
    let liTexts = input.value;
    if (/,/.test(liTexts)) {
      liTexts.split(",").forEach(filter => {
        add(filter);
      });
    } else {
      add();
    }
  });
},400);

function createFilter() {
  $('.ipn-Classification:first-child').before('<div class="selection" style="position:relative;padding:8px 20px;color: #c3c3c3;border-bottom: solid 2px #137A5A;"><div class="ipn-CompetitionButton_TextContainer" style="font-size:14px;"><div class="ipn-CompetitionButton_Text">Filter</div></div><div class="ipn-CompetitionContainer" id="selection" style="display:flex;margin-top:8px;font-size:12px;"><div class="container"><form id="form"><input type="text" id="input" class="form-control" placeholder="不要文字列(半角英数字)" autocomplete="off" pattern="^[0-9a-zA-Z,]+$"></form><ul id="ul"></ul></div></div></div>');
}
function createFavorite() {
  $('.ipn-ClassificationContainer').before('<div class="selection" style="order:1;color:#c3c3c3;border-bottom:1px solid #474747;"><div style="display:flex;align-items: center;height:45px;padding:0 20px;border-bottom:1px solid #474747;"><div>Favorite</div></div><div id="favorite"></div></div>');
}

function selection() {
  const filterList = JSON.parse(localStorage.getItem("filterWord"));
  if(filterList) {
    filterList.forEach(filter => {
      $("div.ipn-Competition:contains(" + filter + ")").hide();
    })
  };
  $("div.ipn-Classification:not(:contains(Soccer))").hide();
  const competitionButtonText = document.querySelectorAll(".ipn-CompetitionButton_Text");
  competitionButtonText.forEach(text => {
    if(text.textContent == ""){
      text.parentNode.parentNode.remove();
    }
  });
  const fixture = document.querySelectorAll(".ipn-Fixture");
  fixture.forEach(item => {
    item.oncontextmenu = function(event) {
      event.preventDefault();
      $(this).appendTo('#favorite').addClass("apended");
      removeCompCont();
      $(".apended").on("contextmenu", function(event) {
        event.preventDefault();
        $(this).remove();
      });
    };
  });
}

function add(filter) {
  const oldList = document.querySelectorAll("#ul > li");
  let oldLists = [];
  let liText = input.value;
  if(filter) {
    liText = filter;
  }
  if(liText && !oldLists.includes(liText)) {
    const li = document.createElement("li");
    li.innerText = liText;
    li.style.cssText = "display:inline-block;margin:3px 1px 0;padding:3px;border: solid 1px #c3c3c3;border-radius: 3px;";
    li.addEventListener("contextmenu", function
    (event) {
      event.preventDefault();
      li.remove();
      if($(".ipn-Competition:contains(" + li.innerText + ")")) {
        $(".ipn-Competition:contains(" + li.innerText + ")").show();
      }
      saveDate();
    });
    ul.appendChild(li);
    oldLists.push(liText);
  }
  saveDate();
  input.value = "";
};
function removeCompCont() {
  const competitionContainer = document.querySelectorAll(".ipn-CompetitionContainer");
  competitionContainer.forEach(comp => {
    if(comp.childElementCount == 0) {
      comp.parentNode.remove();
    }
  });
}

function saveDate() {
  const lists = document.querySelectorAll("li");
  let filterWord = [];
  lists.forEach(list => {
    filterWord.push(list.innerText);
  });
  localStorage.setItem("filterWord", JSON.stringify(filterWord));
};


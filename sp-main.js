(script = document.createElement('script')).src = 'https://code.jquery.com/jquery-latest.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
(function(d){
  var head = d.getElementsByTagName('head')[0];
  var link = d.createElement('link');
  link.setAttribute('rel','stylesheet');
  link.setAttribute('href','https://use.fontawesome.com/releases/v5.6.1/css/all.css');
  head.appendChild(link);
})(document);


setTimeout (function() {
  createFilter();
  $("div.ies-Competition").click();
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const ul = document.getElementById("ul");
  const filterList = JSON.parse(localStorage.getItem("filterWord"));

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
},600);

setInterval(function() {
  if (document.getElementById("filterBtn") === null) {
    createFilter();
    const filterList = JSON.parse(localStorage.getItem("filterWord"));
    if(filterList) {
      filterList.forEach(filter => {
        add(filter);
      });
    };
  }
  selection();
},1000);

function createFilter() {
  $('.ipe-EventHeaderMatchButton').before('<i id="filterBtn" class="fas fa-filter fa-xs" style="padding:19px 5px;color:#e4e4e4;"></i><div class="selection" style="position:absolute;top:50px;width:100%;padding:18px 20px;color: #404040;background-color:#ddd;overflow:hidden;z-index:39;"><div class="ipn-CompetitionButton_TextContainer" style="font-size:14px;"><div class="ipn-CompetitionButton_Text">Filter</div></div><div class="ipn-CompetitionContainer" id="selection" style="display:flex;margin-top:8px;font-size:12px;"><div class="container"><form id="form"><input type="text" id="input" class="form-control" placeholder="不要文字列(半角英数字)" autocomplete="off" pattern="^[0-9a-zA-Z,]+$"></form><ul id="ul" style="margin-top:20px;"></ul></div></div></div>');
  $('.selection').hide();
  $('#filterBtn').on('click',function(){
    $('.selection').fadeToggle(100);
  });
  $(document).on('click',function(e) {
    if(!$(e.target).closest('#filterBtn').length && !$(e.target).closest('.selection').length) {
      $('.selection').hide();
    }
  });
}
function selection() {
  const filterList = JSON.parse(localStorage.getItem("filterWord"));
  if(filterList) {
    filterList.forEach(filter => {
      $("div.ies-Competition:contains(" + filter + ")").hide();
    })
  };
  $("div.ies-Classification:not(:contains(Soccer))").hide();
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
    let count = 0;
    li.innerText = liText;
    li.style.cssText = "display:inline-block;margin: 3px;padding:15px;border: solid 1px #c3c3c3;border-radius: 3px;";
    li.addEventListener("touchstart", function
    (event) {
      event.preventDefault();
      li.remove();
      $(".ipe-EventHeaderMatchButton").click();
      if($(".ies-Competition:contains(" + li.innerText + ")")) {
        $(".ies-Competition:contains(" + li.innerText + ")").show();
      }
      saveDate();
      count = 0;
    });
    ul.appendChild(li);
    oldLists.push(liText);
  }
  saveDate();
  input.value = "";
};

function saveDate() {
  const lists = document.querySelectorAll("li");
  let filterWord = [];
  lists.forEach(list => {
    filterWord.push(list.innerText);
  });
  localStorage.setItem("filterWord", JSON.stringify(filterWord));
};
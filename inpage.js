(function (d, w) {
  var actions = d.querySelector('.nav_list'),
      header = d.querySelector('.fixable_fixed'),
      s = '<li class="quoraCollapse" style="display: none;">' +
                /*'<div class="hover_menu hidden nav_menu" style="display: none" id="__w2_GbRzBwe_menu"></div>'+*/
                 '<a href="#" class="home has_count nav_item has_nav_menu" title="Collapse all answers" onclick="return false;" id="__nav">' +
                   '<span class="text">Collapse</span>' +
                 '</a>' +
               '</li>',
      button = document.createElement('ul'),
      isExpanded = d.querySelectorAll('.expanded_q_text'),
      moreLink = d.querySelectorAll('.more_link'),
      mainDiv = d.querySelector('.main_col');
  button.className = 'nav_list nav_list_reorg';
  button.innerHTML = s;
  function isDescendant(parent, child) {
     var node = child.parentNode;
     while (node !== null) {
         if (node.className === parent || node.className === parent + ' expanded_feed_content') {
             return true;
         }
         node = node.parentNode;
     }
     return false;
  }

  if (!(actions)) return;

  //actions.innerHTML = button + actions.innerHTML;
  header.firstChild.firstChild.insertBefore(button, actions);

  mainDiv.addEventListener('click', function(e){
    if(e.target && e.target.nodeName === "A" && e.target.className === "more_link" && isDescendant('feed_item_answer answer_text', e.target)){
      d.querySelector('.quoraCollapse').style.display = "block";
    } else if(isDescendant('feed_item_answer answer_text', e.target)){
      d.querySelector('.quoraCollapse').style.display = "block";
    } else if(isDescendant('board_item_content', e.target)){
      d.querySelector('.quoraCollapse').style.display = "block";
    }
  });

  var collapseBtn = d.querySelector('.quoraCollapse');
  collapseBtn.addEventListener('click', function(e){
    var allExpanded = d.querySelectorAll('.expanded_feed_content');
    for(var i=0; i < allExpanded.length; i++){
      if(allExpanded[i].firstChild.firstChild.className === 'board_item_content'){
        //get element with class 'feed_item_board'
        var post = allExpanded[i].firstChild.firstChild.firstChild.firstChild;
        //hide voting
        post.firstChild.firstChild.lastChild.firstChild.style.display = 'none';
        //hide list of voters
        post.childNodes[1].childNodes[2].firstChild.classList.add('hidden');
        post.childNodes[1].childNodes[2].firstChild.style.display = 'none';
        //show more link
        for(var j=0; j < post.childNodes[1].lastChild.getElementsByTagName('a').length; j++){
          if(post.childNodes[1].lastChild.getElementsByTagName('a')[j].className === "more_link"){
            post.childNodes[1].lastChild.getElementsByTagName('a')[j].style.display = "block";
          }        
        }
        post.childNodes[1].lastChild.firstChild.classList.remove('hidden');
        //show compressed post
        post.lastChild.lastChild.firstChild.firstChild.classList.remove('hidden');
        //hide expanded post
        post.childNodes[1].lastChild.childNodes[1].classList.add('hidden');
        //hide date
        post.childNodes[1].lastChild.lastChild.classList.add('hidden');
      } else {
        //hide list of voters
        if(allExpanded[i].childNodes[1].firstChild.childNodes[0].className !== 'answer_voters_row'){
          allExpanded[i].childNodes[1].firstChild.childNodes[1].classList.add('hidden');
        }
        //show short answer
        allExpanded[i].childNodes[1].childNodes[2].firstChild.firstChild.classList.remove('hidden');
        //hide long answer
        allExpanded[i].childNodes[1].childNodes[2].childNodes[1].classList.add('hidden');
        //show more link
        for(var j=0; j < allExpanded[i].childNodes[1].childNodes[2].firstChild.firstChild.firstChild.getElementsByTagName('a').length; j++){
          if(allExpanded[i].childNodes[1].childNodes[2].firstChild.firstChild.firstChild.getElementsByTagName('a')[j].className === "more_link"){
            allExpanded[i].childNodes[1].childNodes[2].firstChild.firstChild.firstChild.getElementsByTagName('a')[j].style.display = "block";
          }
        }
        //show vote count
        allExpanded[i].firstChild.firstChild.classList.remove('hidden');
        //hide voteing icons
        allExpanded[i].firstChild.childNodes[1].classList.add('hidden');
        //hide the collapse button
        allExpanded[i].classList.remove("expanded_feed_content");
      }
      d.querySelector('.quoraCollapse').style.display = "none";
    }
  });

})(document, window);
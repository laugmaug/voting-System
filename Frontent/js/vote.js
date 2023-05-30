const listItems = document.querySelectorAll('.list-item');
let xhr = new XMLHttpRequest();

try{
  listItems.forEach(item => {
      item.addEventListener('click', () => {
          // Remove selected class from all list items
          listItems.forEach(item => item.classList.remove('selected'));
          
          // Add selected class to the clicked list item
          item.classList.add('selected');
          document.getElementById("selection").innerHTML = item.innerHTML;

          console.log(item.innerHTML);

          sessionStorage.setItem("party", item.innerHTML);
      }); 
  });
}
catch(err){
  console.log(err);
  alert(err);
}

const modalBtn = document.querySelector('.modal-btn');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');
const voteBtn = document.querySelector('#btnVote');

modalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

voteBtn.addEventListener('click', () => {
  xhr.open("POST", "http://localhost:5000/votingpage", false);
  xhr.setRequestHeader("Content-Type","application/text");
  xhr.send(sessionStorage.getItem("party") + "#" + sessionStorage.getItem("userID"));
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

function validate(){
    
}

function navigate(){
    let selection = document.getElementById("selection");
    document.getElementById("btnClose").click();

    if(selection.innerHTML == "National"){
        document.getElementById("national").style.display = "block";
        document.getElementById("root").style.display = "none";
    }
    else if(selection.innerHTML == "District"){
        document.getElementById("district").style.display = "block";
        document.getElementById("root").style.display = "none";
    }
}


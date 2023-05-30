const listItems = document.querySelectorAll('.list-item');

listItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove selected class from all list items
        listItems.forEach(item => item.classList.remove('selected'));
        
        // Add selected class to the clicked list item
        item.classList.add('selected');
        document.getElementById("selection").innerHTML = item.innerHTML;
    });
});

const modalBtn = document.querySelector('.modal-btn');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');

modalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
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
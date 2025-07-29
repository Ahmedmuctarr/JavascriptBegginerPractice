let lists = document.getElementsByClassName('list');
let left = document.getElementById('left');
let right = document.getElementById('right');
let selected = null;
for(let list of lists)
{
    list.addEventListener("dragstart",function(e){
        selected = e.target;
    });

    right.addEventListener("dragover",function(e){
        e.preventDefault();
    });
    right.addEventListener("drop",function(e){
        e.preventDefault(); // Prevent default action for drop
        if (selected) {
            right.appendChild(selected);
            selected = null;
        }
    });
    left.addEventListener("dragover",function(e){
        e.preventDefault();
    });
    left.addEventListener("drop",function(e){
        e.preventDefault(); // Prevent default action for drop
        if (selected) {
            left.appendChild(selected);
            selected = null;
        }
    });
}
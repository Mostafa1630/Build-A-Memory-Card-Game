document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("Whats Your Name");

  if(yourName == null || yourName == ""){
    document.querySelector(".name span").innerHTML = "UnKnown";
  }else{
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
}

let duration = 1000;

let blocksContainer = document.querySelector(".game-momery-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

// Add CSS Property order

shuffle(orderRange);

blocks.forEach((block,index) => {


  block.style.order = orderRange[index];

  block.addEventListener('click',function(){
    flipBlock(block);
  });
});

// Flip Block Function
function flipBlock(selectBlock){
  selectBlock.classList.add('is-flipped');

  // collect all contains is-flipped
  let allFlippedBlocks = blocks.filter(flipped => flipped.classList.contains('is-flipped'));

  // if two flippedblocks
  if(allFlippedBlocks.length === 2){

    // Stop click function
    stopClicking();

    //check match block
    checkMatchBlock(allFlippedBlocks[0],allFlippedBlocks[1]);
  }
}



function stopClicking(){
  blocksContainer.classList.add('no-clicking');

  setTimeout( () =>{
    blocksContainer.classList.remove('no-clicking')
  }, duration)
}

// Check Match block

function checkMatchBlock(fristBlock,secondBlock) {
  let triesElement = document.querySelector('.tries span');

  if(fristBlock.dataset.fane === secondBlock.dataset.fane){
    fristBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');
    

    fristBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');

    //audio
    document.getElementById("sucess").play();

  }else{
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout( () => {
      fristBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');
    },duration);

    //audio
    document.getElementById("fill").play();
  }

  
}





// function to return a random array
function shuffle(array) {

  let current = array.length , temp , random;

  // to return A Random Number 
  while(current > 0){
    random = Math.floor(Math.random() * current);
    // decress array one number
    current--;

    temp = array[current];
    array[current]=array[random];
    array[random]=temp;

  }
  return array;
}



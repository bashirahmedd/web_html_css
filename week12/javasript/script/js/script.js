function createParagraph() {
  const para = document.createElement('p');
  para.textContent = 'You clicked the button!';
  document.body.appendChild(para);
}

const button = document.getElementById("btnClick");
button.addEventListener('click', createParagraph);

/* 
  const buttons = document.querySelectorAll('button'); 
 const buttons = document.querySelectorAll('button');
  
  for (const button of buttons) {
    button.addEventListener('click', createParagraph);
  } */
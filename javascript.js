

let book1 = new Book('LOTR', 'Otter', '790', true);
let book2 = new Book('Farenheit', 'wilog', '300', false);

const mylib = [book1, book2];
console.log(book1.author)


function Book(title, author, pages, read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = `${pages} pages.`
    this.read = read;
}

function addBooktoLibrary(currbook){
    mylib.push(currbook);
}

function openform(){
    
}
const addbutton = document.querySelector('.addbutton');
const openmodal = document.querySelector('dialog');
addbutton.addEventListener('click', (e) =>{
    openmodal.showModal();
}
)
const closebutton = document.querySelector('#cancel');
closebutton.addEventListener('click', (e) => {
    openmodal.close();
});



const form = document.querySelector('form');
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const booktitle = document.querySelector('#title-box').value;
    const bookauthor = document.querySelector('#author-box').value;
    const bookpages = document.querySelector('#pages-box').value;
    const isread = document.querySelector('#checklist').checked;
    document.querySelector('#title-box').value = null;
    document.querySelector('#author-box').value = null;
    document.querySelector('#pages-box').value = null;
    const newbook = new Book(booktitle, bookauthor, bookpages, isread);
    addBooktoLibrary(newbook);
    console.log(mylib.length);
    openmodal.close();
    displaybooks();
})

const content = document.querySelector('.content');


function displaybooks(){
    while(content.firstChild){
            content.removeChild(content.firstChild);
        }
    for(let i  = 0; i < mylib.length; i++){
        let current_book = mylib[i];
        //console.log(current_book.id);
        curr_card = document.createElement('div');
        curr_card.classList.add('card');
        curr_card.dataset.id = current_book.id;
        let card_text = document.createElement('div');
        card_text.classList.add('book-text');
        let card_buttons = document.createElement('div');
        card_buttons.classList.add('book-buttons');
        curr_card.appendChild(card_text);
        curr_card.appendChild(card_buttons);
        content.appendChild(curr_card);
        if(current_book.read == true){
            curr_card.classList.add('active');
        }
        //details
        let booktitle = document.createElement('div');
        let bookpages =document.createElement('div');
        let bookauthor = document.createElement('div');
        booktitle.classList.add('book-title');
        bookpages.classList.add('book-pages');
        bookauthor.classList.add('book-author');
        booktitle.textContent = current_book.title;
        bookpages.textContent = current_book.pages;
        bookauthor.textContent = current_book.author;
        let buttonremove = document.createElement('button');
        let buttonread = document.createElement('button');
        buttonremove.classList.add('remove');
        buttonread.classList.add('read');
        buttonremove.textContent = "Remove";
        buttonread.textContent = "Mark as read";
        //let card_buttons = document.createElement('div')
        card_buttons.classList.add('book-buttons');
        

        //other
        card_text.appendChild(booktitle);
        card_text.appendChild(bookauthor);
        card_text.appendChild(bookpages);

        card_buttons.appendChild(buttonread);
        card_buttons.appendChild(buttonremove);

    }
}

content.addEventListener('click', (e)=>{
    if(e.target.classList.contains('remove')){
        const cards = e.target.closest('.card');
        console.log(cards);
        const cardsid = cards.dataset.id;
        for(let i = 0; i < mylib.length; i++){
            if(cardsid == mylib[i].id){
                mylib.splice(i, 1);
                break;
            }
        }
        
        displaybooks();
    };
});

content.addEventListener('click', (e)=>{
    if(e.target.classList.contains('read')){
        const card = e.target.closest('.card');
        console.log(card);
        const targetbutton = e.target;
        for(let i  = 0; i < mylib.length; i++){
            if(mylib[i].id == card.dataset.id){
                if(mylib[i].read == false){
                    mylib[i].read = true;
                }else mylib[i].read = false;
                break;
            }
        }
        displaybooks();
    }
});
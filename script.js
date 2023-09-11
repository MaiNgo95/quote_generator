//create the variables that get the values and output to html page
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = []; //this global variable with let - use let instead of the const to change the variable later

//function get new quote
function newQuote(){
    loaderSign();
//pick a random quote from the array
//math floor is too round the number of the random number from 5.33464 to 5
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]; //console.log(apiQuotes[12]); return eleemnt in index
//console.log(quote);
//if the element in the array is NULL replace with UNKNOWN
if(!quote.author){
    author.textContent = 'UNKNOWN';
}
else{
    author.textContent = quote.author; 
}


//pass the string from the array to the id and show in the page with TextContent
quoteText.textContent = quote.text;
complete();
//if the quote length is too long we will change the style of the box
if(quote.text.length>50){
    //add the style class name into the text string
    quoteText.classList.add('long-quote');
}
else{
    quoteText.classList.remove('long-quote');
}
}


// get quote from API
async function getquotes(){
    loaderSign();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'; 
    // get the link for quotes
    try{
//fetch request
        const response = await fetch(apiURL);
        //get the array quote from the website and assign it to json()
        apiQuotes = await response.json();
        //console.log(apiQuotes);
        newQuote();
        
    }
    catch(error){
        //catch error
        alert(error);
    }
}
//show loading sign

//the load function need to put into the function of get quote and new quote 
//so when getting the quote the loader will run
function loaderSign(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//hidden loading sign 
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//fuctions activate twitter button
//open the webpage and get the text + author to the 
function twitter(){
    //use back stick 
const tweetURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
window.open(tweetURL, '_blank'); //open the page with new tab _blank
}
//add event to make the twitter works
newQuoteBtn.addEventListener('click', newQuote); //when click call newQuote function
twitterBtn.addEventListener('click', twitter);
getquotes();
//loaderSign();
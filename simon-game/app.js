var round = 1;
var title = document.querySelector("#level-title");
var again = document.querySelector(".again");
var sequence = [];

function game()

{
    
    var colors = ['red', 'green', 'blue', 'yellow'];

    
    var userAnswer = [];



    function setSequence()
    {
        
            var randomNum = Math.floor(Math.random()*4);
            sequence.push(colors[randomNum]);
            console.log(sequence + " C");
        
    }

    //using promise made that loop doesn't rush.
    function sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function showSequence ()
    {
        for (let i = 0; i < sequence.length; i++)
        {
            var choosen = document.querySelector("." +sequence[i])
            
            choosen.classList.add("pressed");
                
            var colorSound = new Audio("sounds/"+sequence[i]+".mp3");
            colorSound.play();
            setTimeout(() =>
                {
                    choosen.classList.remove("pressed");
                }, 500);
            await sleep(1000);
        }
    }

    function removeListeners()
    {
        for(var i = 0; i<btn.length; i++)
            {
               btn[i].removeEventListener("click", addClass);
            };
    }

    var btn = document.querySelectorAll(".btn");


    for(var i = 0; i<btn.length; i++)
    {
        btn[i].addEventListener("click", addClass);
    };

    function addClass()
    {
        userAnswer.push(this.id);
        console.log(userAnswer + " U");
        var pressedButton = this;
        pressedButton.classList.add("pressed");
        var colorSound = new Audio("sounds/"+this.id+".mp3");
        colorSound.play();

        setTimeout(function()
        {
            pressedButton.classList.remove("pressed");
        }, 500)



        //Checking if computer sequence and user sequence are equal    
            if (sequence.length == userAnswer.length && sequence.every((value,index)=> value == userAnswer[index]))
            {
                if (round >= 5)
                {
                    title.innerHTML = "You Won! Congrats!(Play again with A)";
                    removeListeners();
                    //reseting game state
                    round = 1;
                    sequence = [];
                    userAnswer = [];
                    return;
                }
                round++;
                
                
                setTimeout(function()
                { 
                    title.innerHTML = "Round " + round;
                    removeListeners();
                    game();
                }, 1000);
            }
            
            //this works, for every click loop checking if concrete element in one array is equal with another element in another array

            for (var i = 0; i<userAnswer.length; i++)
            {
                if (userAnswer[i]!=sequence[i])
                {
                    title.innerHTML = "You lost!</br></br>Play Again? Press A";
                    var wrongSound = new Audio("sounds/wrong.mp3");
                    wrongSound.play();
                    document.querySelector('body').classList.add("game-over");
                    removeListeners();
                    setTimeout(function()
                        {
                            document.querySelector('body').classList.remove("game-over");
                        }, 500)
                    //reseting game state
                    round = 1;
                    sequence = [];
                    userAnswer = [];
                    return;
                }
            }
         
    }


    setSequence();
    showSequence();
    
}


document.addEventListener("keypress", function(e)
{
    if(e.key == 'a')
    {
        round = 1;
        title.innerHTML = "Round 1";
        game();
    }
    
});

//jest jakis błąd bo else nie wykrywa ze od razu błedny jest pierwszy strzal nie po sekwencji

//na dublowanie userAnswer pomoglo usuniecie addeventlistenera po kazdym zgadnieciu

  // else if (sequence.every((val,index)=> val != userAnswer[index]))
            // {
            //     title.innerHTML = "You lost!";
            //     for(var i = 0; i<btn.length; i++)
            //     {
            //         btn[i].removeEventListener("click", addClass);
            //     };
            //     return;
            // }
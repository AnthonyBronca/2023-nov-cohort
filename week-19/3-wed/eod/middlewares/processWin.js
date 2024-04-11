const random = require('getrandomjs');



const processWin = ((req, res, next) => {
    try {
        // figure out what the AI chose
        const aiChoice = random(["rock", "paper", "scissors"]);
        // figure out what we chose
        const {choice} = req.body;
        // figure out who won
        const choices = {
            rock: {
                win: "scissors",
                lose: "paper"
            },
            paper: {
                win: "rock",
                lose: "scissors"
            },
            scissors: {
                win: "paper",
                lose: "rock"
            }
        }

        // did we win
        if(choices[choice].win === aiChoice){
            res.json({
                you: choice,
                aiChoice: aiChoice,
                result: "win"
            })
        }
        // did we lose
        else if(choices[choice].lose === aiChoice){
            res.json({
                you: choice,
                aiChoice: aiChoice,
                result: "lose"
            })
        } else{
            res.json({
                you: choice,
                aiChoice: aiChoice,
                result: "tie"
            })
        }

    } catch (error) {
        next(error)
    }


})


module.exports = {processWin};

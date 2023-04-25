
export default function Question(props){    
    function getBackColor(answer){
        let styles
        if(props.isFinished){
            if(answer.isCorrect)
                styles = {
                    backgroundColor: "#94D7A2"
                }
            else if(answer.isHeld && !answer.isCorrect){
                styles = {
                    backgroundColor: "#F8BCBC",
                    color: "grey",
                    borderColor: "grey"
                }
            }
            else {
                styles = {
                    color: "grey",
                    borderColor: "grey"
                }
            }
        }
        else {
            if(answer.isHeld){
                styles = {
                    backgroundColor: "#D6DBF5",
                    border: "none"
                }
            } else {
                styles = {
                    backgroundColor: "white"
                }
            }
        }
        return styles
    }
    
    return (
        <div className="quizz">
            <p className="quizz--question">{props.title}</p>
            <div className="quizz--answers">
                {props.answers.map(answer => <div className="quizz--choice" 
                key={answer.id} 
                onClick={() => props.onAnswerClick(props.id, answer.id)}
                style={getBackColor(answer)}
                >{answer.questionTitle}</div>)}
            </div>
            <div className="quizz--separator"></div>
        </div>
    )
}
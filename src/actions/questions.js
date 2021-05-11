import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import {addQuestionToUser, addAnswerToUser} from '../actions/users'
import {showLoading, hideLoading} from 'react-redux-loading'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION'


export function receiveQuestions(questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function addAnswerToQuestions( authedUser, qid, answer ){
    return {
        type: ADD_ANSWER_TO_QUESTION,
            qid,
            answer,
            authedUser,
    }
}


// Async Action creators

export function handleAddQuestion(optionOne, optionTwo){
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return saveQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser
        })
            .then(question =>{
                dispatch(addQuestion(question))
                dispatch(addQuestionToUser(question))

            })
            .then(() => dispatch(hideLoading()))
    }
}

export function handleAddAnswer(qid, answer) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		dispatch(showLoading());

		return saveQuestionAnswer({
            authedUser,
            qid,
			answer,
        })
			.then(() => {
                dispatch(addAnswerToQuestions(authedUser,qid,answer))
                dispatch(addAnswerToUser(authedUser,qid,answer))
            })
			.then(() => dispatch(hideLoading()));
	};
}

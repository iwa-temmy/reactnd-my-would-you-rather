import React, { Component } from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { Route, Switch } from 'react-router';
import Home from './Home';
import {Container} from 'semantic-ui-react'
import Nav from './Nav'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import PageNotFound from './PageNotFound'


class PrivateApp extends Component {
	render() {
		return (
			<Router>
				<Container>
					<Nav />
					<main>
						<Switch>
							<Route path="/" exact component={Home} />
                            <Route path="/questions/:id" component={QuestionPage} />
                            <Route path="/add" component={NewQuestion} />
							<Route path="/leaderboard" component={LeaderBoard} />
                            <Route component={PageNotFound} />
						</Switch>
					</main>
				</Container>
			</Router>
        )
    }
}

export default PrivateApp
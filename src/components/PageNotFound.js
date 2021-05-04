import React from 'react';
import { Link } from 'react-router-dom';
import {Header,Grid} from 'semantic-ui-react'

function PageNotFound() {
	return (
		<Grid centered>
			<Header as='h1' className="display3 text-center">404 ERROR</Header>
			<Header as='h1'className="display4 text-center">
				<Link to="/">Return to Home Page</Link>
			</Header>
		</Grid>
	);
}

export default PageNotFound;

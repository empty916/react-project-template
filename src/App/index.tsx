import React, { useMemo, useEffect } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
// import { History } from 'history';
import TransitionSwitch from '@common/components/base/TransitionSwitch';
import Inject from '@inject';
import routes from '@channel/route';
// import style from '../theme.scss';
import './style.scss';

let RLocation: React.FC<any> | React.ComponentClass<any> = ({locationModule, location}) => {
	const $locationState = useMemo(() => location, [location]);
	useEffect(() => { locationModule.actions.update($locationState); }, []);
	return null;
};
RLocation = withRouter(Inject('locationModule')(RLocation));

type Props = {
	className?: string;
}

const App: React.FC<Props> = (p: any) => {
	const {
		app: { state, actions },
	} = p;

	return (
		<>
			<RLocation />
			<Link to="/page1">page1</Link>
			<Link to="/page2">page2</Link>
			<Link to="/page3">page3</Link>
			<br />
			<input
				type="text"
				value={state.name}
				onChange={e => actions.update(e.target.value)}
			/>
			<TransitionSwitch>
				{routes.map((route, index) => (
					<Route key={index.toString()} {...route} />
				))}
			</TransitionSwitch>
		</>
	);
};

export default Inject('app')(App) as React.FC<Props>;

import { func, number, shape } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
	addContent,
	removeContent,
} from 'src/store/features/contents/contentsSlice';
import { v4 as uuidv4 } from 'uuid';
import BuildControl from './build-control';
import {
	buildControls,
	currentPrice,
	orderButton,
	topSection,
} from './build-controls.module.css';

const controls = [
	{ label: 'Patty', type: 'patty' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Pickles', type: 'pickles' },
	{ label: 'Lettuce', type: 'lettuce' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Onion Ring', type: 'onion-ring' },
	{ label: 'Tomato', type: 'tomato' },
];

function BuildControls({ contents, proceed, total }) {
	const dispatch = useDispatch();
	const [purchasable, setPurchasable] = useState(false);

	useEffect(() => {
		if (contents) {
			const canPurchase = Object.values(contents).some((val) => val > 0);
			setPurchasable(canPurchase);
		}
		return () => {};
	}, [contents]);
	return (
		<>
			<div className={topSection}>
				<p className={currentPrice}>
					Total&nbsp;~&nbsp;
					<strong>
						₦&nbsp;
						{total}
					</strong>
				</p>
				<button
					type="button"
					className={orderButton}
					aria-disabled={!purchasable}
					onClick={purchasable ? proceed : null}
				>
					PLACE ORDER
				</button>
			</div>
			<div className={buildControls}>
				{controls.map(({ label, type }) => (
					<BuildControl
						key={uuidv4()}
						type={type}
						label={label}
						adder={() => dispatch(addContent(type))}
						remover={() => dispatch(removeContent(type))}
					/>
				))}
			</div>
		</>
	);
}

BuildControls.propTypes = {
	contents: shape({
		bacon: number.isRequired,
		cheese: number.isRequired,
		lettuce: number.isRequired,
		'onion-ring': number.isRequired,
		patty: number.isRequired,
		pickles: number.isRequired,
		tomato: number.isRequired,
	}).isRequired,
	proceed: func.isRequired,
	total: number.isRequired,
};

const mapStateToProps = (state) => {
	const { contents, total } = state.contents;
	return { contents, total };
};

export default connect(mapStateToProps)(BuildControls);

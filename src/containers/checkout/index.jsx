import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CheckoutSummary from 'src/components/order/checkout-summary';
import DetailsForm from './details-form';

function Checkout() {
	const navigate = useNavigate();

	return (
		<Routes>
			<Route path="details" element={<DetailsForm />} />
			<Route
				index
				element={
					<CheckoutSummary
						cancel={() => navigate(-1)}
						proceed={() => navigate('details')}
					/>
				}
			/>
		</Routes>
	);
}

export default Checkout;

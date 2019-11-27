import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
	0% {
		transform: rotate(0);
	}

	100% {
		transform: rotate(360deg);
	}
`;

const Spinner = styled.div`
	width: 4.5rem;
	height: 4.5rem;
	margin: 1rem auto;
	position: relative;
`;

const spacing = "5px";

const OuterRing = styled.div`
	position: absolute;
	top: 0.2rem;
	right: 0.2rem;
	bottom: 0.2rem;
	left: 0.2rem;
	border: 2px solid #ffa502;
	border-right-color: transparent;
	border-left-color: transparent;
	border-radius: 50%;
	animation: ${rotate} 1s ease infinite;
`;

const InnerRing = styled.div`
	position: absolute;
	top: ${spacing};
	right: ${spacing};
	bottom: ${spacing};
	left: ${spacing};
	border: 2px solid #fafafa;
	border-top-color: transparent;
	border-bottom-color: transparent;
	border-radius: 50%;
	animation: ${rotate} 1s ease infinite reverse;
`;

const Loader = () => {
	return (
		<Spinner>
			<OuterRing>
				<InnerRing />
			</OuterRing>
		</Spinner>
	);
};

export default Loader;

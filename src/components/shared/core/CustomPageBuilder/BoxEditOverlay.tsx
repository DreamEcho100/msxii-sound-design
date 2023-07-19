import { type Box } from "./_";

export default function BoxEditOverlay(props: { boxDeepLevel: number; box: Box }) {

	return (
		<div
			className="box-edit-overlay"
			style={{
				zIndex: props.boxDeepLevel.toString(),
			}}
		>
			<div className="borders-container">
				<div className="top"></div>
				<div className="right"></div>
				<div className="bottom"></div>
				<div className="left"></div>
			</div>
		</div>
	);
}

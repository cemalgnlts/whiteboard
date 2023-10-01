import {
	BaseBoxShapeTool,
	BaseBoxShapeUtil,
	Box2d,
	SVGContainer,
} from "@tldraw/tldraw";

export class IconShapeTool extends BaseBoxShapeTool {
	static id = "icon";
	shapeType = "icon";
	iconName = "";

	onEnter = (info) => {
		this.iconName = info.name;
	};

	onExit = () => {
		const shapeId = this.editor.selectedShapeIds[0];
		this.editor.updateShape({
			id: shapeId,
			props: {
				name: this.iconName,
			},
		});
	};
}

export class IconShapeUtil extends BaseBoxShapeUtil {
	static type = "icon";

	canResize = () => true;
	isAspectRatioLocked = () => true;

	/**
	 *
	 * @param {IconShapeUtil} shape
	 */
	component(shape) {
		return (
			<SVGContainer id={shape.id}>
				<text
					x="0"
					y={shape.props.w}
					fontSize={shape.props.w}
					fontFamily="Material Symbols Rounded"
				>
					{shape.props.name}
				</text>
			</SVGContainer>
		);
	}

	getDefaultProps() {
		return {
			w: 56,
			h: 56,
			name: "help",
		};
	}

	getBounds(shape) {
		return new Box2d(0, 0, shape.props.w, shape.props.h);
	}

	indicator(shape) {
		return <rect width={shape.props.w} height={shape.props.h} />;
	}
}

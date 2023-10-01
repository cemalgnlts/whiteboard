import {
	BaseBoxShapeTool,
	BaseBoxShapeUtil,
	Box2d,
	SVGContainer,
} from "@tldraw/tldraw";

export class EmojiShapeTool extends BaseBoxShapeTool {
	static id = "emoji";
	shapeType = "emoji";
	hexcode = "";

	onEnter = (info) => {
		this.hexcode = info.hexcode;
	};

	onExit = () => {
		const shapeId = this.editor.selectedShapeIds[0];
		this.editor.updateShape({
			id: shapeId,
			props: {
				hexcode: this.hexcode,
			},
		});
	};
}

export class EmojiShapeUtil extends BaseBoxShapeUtil {
	static type = "emoji";

	canResize = () => true;
	isAspectRatioLocked = () => true;

	/**
	 *
	 * @param {EmojiShapeUtil} shape
	 */
	component(shape) {
		return (
			<SVGContainer id={shape.id}>
				<image href={`/assets/openmoji/${shape.props.hexcode}.svg`} width={shape.props.w} />
			</SVGContainer>
		);
	}

	getDefaultProps() {
		return {
			w: 56,
			h: 56,
			hexcode: "",
		};
	}

	getBounds(shape) {
		return new Box2d(0, 0, shape.props.w, shape.props.h);
	}

	indicator(shape) {
		return <rect width={shape.props.w} height={shape.props.h} />;
	}
}

import {
	BaseBoxShapeTool,
	BaseBoxShapeUtil,
	Box2d,
	SVGContainer,
} from "@tldraw/tldraw";

export class EmojiShapeTool extends BaseBoxShapeTool {
	static id = "emoji";
	shapeType = "emoji";
	emojiName = "";

	onEnter = (info) => {
		this.emojiName = info.name;
	};

	onExit = () => {
		const shapeId = this.editor.selectedShapeIds[0];
		this.editor.updateShape({
			id: shapeId,
			props: {
				name: this.emojiName,
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

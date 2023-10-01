function ExtraShapeTabButton({ icon, title, type, currentToolId, onSelect }) {
  return (
    <button
      className="material-symbols-rounded"
      data-isactive={currentToolId === type}
      onClick={() => onSelect(type)}
      title={title}
    >
      {icon}
    </button>
  );
}

export { ExtraShapeTabButton };

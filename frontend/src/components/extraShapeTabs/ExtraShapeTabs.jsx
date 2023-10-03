import { useEffect, useState } from "react";
import { ExtraShapeTabButton } from "./ExtraShapeTabButton";

/**
 * @param {Object} arguments
 * @param {Array} arguments.tabs
 * @param {String} arguments.currentToolId
 * @param {Function} arguments.onToolSelect
 */
function ExtraShapeTabs({ tabs, currentToolId, onToolSelect }) {
  const [isAnyActive, setIsAnyActive] = useState(false);

  useEffect(() => {
    const anySelected = tabs.some(
      (tab) => tab.type === currentToolId && tab.picker !== null
    );
    
    setIsAnyActive(anySelected);
  }, [currentToolId]);

  const onSelect = (type, info) => {
    onToolSelect(type, info);
  };

  return (
    <aside className="container right-aside">
      <div className="right-aside__content">
        <div className="tab-buttons">
          {tabs.map(({ icon, type, title }) => (
            <ExtraShapeTabButton
              key={icon}
              currentToolId={currentToolId}
              onSelect={onSelect}
              icon={icon}
              type={type}
              title={title}
            />
          ))}
        </div>
        <div className="tab-contents" data-isactive={isAnyActive}>
          {tabs.map(({ picker: Picker, type }) =>
            Picker ? (
              <Picker
                key={type}
                onToolSelect={onSelect}
                isActive={currentToolId === type}
              />
            ) : null
          )}
        </div>
      </div>
    </aside>
  );
}

export default ExtraShapeTabs;
export * from "./ExtraShapeTabButton";

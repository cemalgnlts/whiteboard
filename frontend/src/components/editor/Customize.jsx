function Customize() {
  return (
    <div className="container customize">
      <button className="material-symbols-rounded">settings</button>
      <ul className="customize__content">
        <li className="btn">
          <span className="material-symbols-rounded">dark_mode</span>
          Change theme
        </li>
        <li className="btn">
          <span className="material-symbols-rounded">grid_on</span>
          Toggle grid mode
        </li>
        <li className="btn">
          <span className="material-symbols-rounded">dark_mode</span>
          Toggle snap mode
        </li>
      </ul>
    </div>
  );
}

export default Customize;

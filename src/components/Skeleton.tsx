import './Skeleton.css';

function Skeleton({ width = '100%', height = '100%', ...props }) {
  return (
    <div
      className="rect skeleton-content"
      style={{ width, height, ...props.style }}
    ></div>
  );
}

export default Skeleton;

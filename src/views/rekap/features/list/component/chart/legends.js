export const Legends = ({ items, large }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'center'
      }}
    >
      {items?.map((item) => (
        <div key={item.label} className="d-flex align-items-center gap-1 justify-content-center">
          <span
            style={{
              width: large ? 25 : 10,
              height: large ? 25 : 10,
              background: item.color,
              flexShrink: 0,
            }}
          />
          <span className="fw-bold lh-1 text-primary" style={{fontSize: large ? 13 : 10}}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
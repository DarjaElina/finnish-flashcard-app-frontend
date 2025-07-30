export default function Moose({
  text,
  hasBg,
}: {
  text: string;
  hasBg?: boolean;
}) {
  return (
    <div className="moose-helper">
      <img src="moose.png" alt="moose" className="moose-slide-img" />
      <p className={`moose-text ${hasBg ? "light" : "dark"}`}>{text}</p>
    </div>
  );
}

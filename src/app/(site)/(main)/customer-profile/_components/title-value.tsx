export default function TitleValue<IsA extends "p" = "p">(props: {
  title: string;
  value?: string | number | null;
  isA?: IsA;
}) {
  if (!props.value) return <></>;

  const Elem = props.isA ?? "p";

  return (
    <Elem className="flex">
      <span className="text-sm font-semibold">{props.title}:</span>
      <span className="text-sm">{props.value}</span>
    </Elem>
  );
}

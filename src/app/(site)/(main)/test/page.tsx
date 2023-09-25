import Screen from "./screen";

export default function page() {
  return (
    <Screen
      data={"_"
        .repeat(1000)
        .split("")
        .map((_, itemIndex) => {
          const id = crypto.randomUUID();
          return {
            id,
            name: itemIndex,
            description: id.replaceAll("-", "\n"),
          };
        })}
    />
  );
}

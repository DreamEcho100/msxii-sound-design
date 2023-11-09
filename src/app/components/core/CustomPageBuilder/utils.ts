import customPgClasses from "~/app/styles/custom-page.module.css";

export function createBxTypeClass(type: string) {
  return `${customPgClasses[`${type}-BOX`]} ${customPgClasses.BOX} bx ${
    customPgClasses.bx
  }`;
}

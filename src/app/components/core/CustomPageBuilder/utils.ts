import customPageClasses from "~/app/styles/custom-page.module.css";

export function createBoxTypeClass(type: string) {
  return `${customPageClasses[`${type}-BOX`]} ${customPageClasses.BOX} box ${
    customPageClasses.box
  }`;
}


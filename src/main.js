import template from "./template.json";

class LaboratoriaFaqs extends HTMLElement {
  constructor() {
    super();

    const styleElement = document.createElement("style");
    styleElement.textContent = template.styles;

    const bodyElement = document.createElement("body");
    bodyElement.innerHTML = template.body;

    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(styleElement);
    shadow.appendChild(bodyElement);
  }
}

customElements.define("laboratoria-faqs", LaboratoriaFaqs);

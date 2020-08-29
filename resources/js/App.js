// Style
import "../sass/app.scss";

// FormPostalCode
import FormPostalCode from "./components/FormPostalCode";

/**
 * Form 1
 */
const form_1 = document.getElementById("form_1");

if (form_1) {
  const formPostalCode = new FormPostalCode("#form_1");

  formPostalCode.create();
}

/**
 * Form 2
 */
const form_2 = document.getElementById("form_2");

if (form_2) {
  const formPostalCode2 = new FormPostalCode(form_2);

  formPostalCode2.create();
}

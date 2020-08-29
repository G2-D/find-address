// Style
import '../sass/App.scss';

// FormPostalCode
import FormPostalCode from './components/FormPostalCode';

/**
 * Form 1
 */
const form = document.getElementById('form_postal_code');
const formPostalCode = new FormPostalCode(form);

formPostalCode.create();

/**
 * Form 2
 */
const formPostalCode2 = new FormPostalCode('#form_postal_code_2');

formPostalCode2.create();
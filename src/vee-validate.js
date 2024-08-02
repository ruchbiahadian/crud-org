import { defineRule, configure } from 'vee-validate';
import { required, email, min} from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

configure({
  generateMessage: localize('id', { 
    messages: {
      required: 'Kolom ini wajib diisi.',
      email: 'Format email tidak valid.',
      min: ({ rule }) => {
        const minLength = rule.params[0];
        return `Minimal ${minLength} karakter.`;
      },
    },
  }),
  validateOnInput: true,
});
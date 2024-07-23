import { defineRule, configure } from 'vee-validate';
import { required, email, min, confirmed } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('confirmed', confirmed);

configure({
  generateMessage: localize('id', { 
    messages: {
      required: 'Kolom ini wajib diisi.',
      email: 'Format email tidak valid.',
      min: 'Kolom ini harus memiliki setidaknya {min} karakter.',
      confirmed: 'Konfirmasi kolom ini tidak cocok.',
    },
  }),
  validateOnInput: true,
});
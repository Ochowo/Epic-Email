const isIncorrect = value => (
  value === 'read'
      || value === 'draft'
       || value === 'sent'
);
export default isIncorrect;

const validEmail = (email) => {
  const atSymbol = email.indexOf('@');
  if (atSymbol < 1) return false;

  const dot = email.indexOf('.');
  if (dot <= atSymbol + 1) return false;
  console.log('Long enough after dot');
  console.log(dot === email.length - 2);
  if (dot === email.length - 2) return false;

  if (email.length > dot + 4) return false;

  return true;
};

export default validEmail;

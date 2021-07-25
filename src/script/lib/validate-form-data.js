module.exports = (data, expectedData) => {
  const errors = {};
  const strings = [];
  
  expectedData.forEach(field => {
    if (data[field.name]){
      switch (field.validation && field.validation.type){
        case 'email':
          if (!data[field.name].match(/.*@.*\..*/))
          errors[field.name] = field.validation.error
          break;
        case undefined:
          break;
        default:
          throw(`Validation type '${field.validation}' not defined`)
      };
      strings.push(`${field.niceName || field.name} : ${data[field.name]}`);
    } else if (field.required){
      errors[field.name] = field.required
    }
  })
  return [strings, errors];
}
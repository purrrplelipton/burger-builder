export function objectMapper(source, target) {
  const output = {};
  Object.keys(source).forEach((key) => {
    if (Object.hasOwnProperty.call(source[key], target)) {
      output[key] = source[key][target];
    } else {
      output[key] = objectMapper(source[key], target);
    }
  });
  return output;
}

export function changeHandler(path, setter, value) {
  const checkValidity = (rules, initialValidity) => {
    let updatedValidity = initialValidity;
    if (rules.required) {
      updatedValidity = value.trim() !== "";
    }
    if (rules.minLength && !Number.isNaN(rules.minLength)) {
      const parsedLength = parseInt(rules.minLength, 10);
      updatedValidity = value >= parsedLength;
    }
    if (rules.maxLength && !Number.isNaN(rules.maxLength)) {
      const parsedLength = parseInt(rules.maxLength, 10);
      updatedValidity = value <= parsedLength;
    }
    if (rules.exp && rules.exp instanceof RegExp) {
      const regExp = new RegExp(rules.exp);
      updatedValidity = regExp.test(value);
    }

    return updatedValidity;
  };
  if (path.length === 1) {
    setter((prv) => ({
      ...prv,
      [path[0]]: {
        ...prv[path[0]],
        value,
        valid: checkValidity(prv[path[0]].rules, prv[path[0]].valid),
      },
    }));
    return;
  }
  const [key, ...subKeys] = path;
  if (subKeys[0] === subKeys[subKeys.length - 1]) {
    setter((prv) => ({
      ...prv,
      [key]: {
        ...prv[key],
        [subKeys[0]]: {
          ...prv[key][subKeys[0]],
          value,
          valid: checkValidity(
            prv[key][subKeys[0]].rules,
            prv[key][subKeys[0]].valid
          ),
        },
      },
    }));
  } else {
    setter((prv) => ({
      ...prv,
      [key]: {
        ...prv[key],
        [subKeys[0]]: changeHandler(subKeys, setter, value),
      },
    }));
  }
}

export function valuesMapper(source) {
  const values = [];
  function getValue(clone) {
    Object.keys(clone).forEach((key) => {
      if (typeof clone[key] === "object" && clone[key] !== null) {
        getValue(clone[key]);
      } else values.push(clone[key]);
    });
  }
  getValue(source);
  return values;
}

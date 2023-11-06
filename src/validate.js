export const validate = (input) => {
  input = input.replace(/\s+/g, '');

  const splitInput = input.split(/(while|cycle|when|fn|_|run)/);
  let result = [];
  for (let i = 1; i < splitInput.length; i += 2) {
    result.push(splitInput[i] + (splitInput[i + 1] || ''));
}

  const grammar = [
    /^_(\w+):((int|boolean|string|float)|(int=([0-9]+|array.length)|boolean=(true|false)|string=["'][^"']*["']|float=\d+(\.\d+)));$/,
    /^while\((\w+)(<|>|<=|>=|==|!=)(\w+)\){INST}$/,
    /^cycle\(i:int=[0-9]+;i(<|>|<=|>=|==|!=)(\w+);i(\+\+|--)\){INST}$/,
    /^(when\(((\w+)|[0-9]+)(<|>|<=|>=|==|!=)((\w+)|[0-9]+|true|false)\){INST}|when\((\w+)(<|>|<=|>=|==|!=)(\w+)\){INST}so{INST})$/,
    /^fn(\w+)\(((\w+)(int|boolean|string|float)|(\w+)(int|boolean|string|float),(\w+)(int|boolean|string|float))\)(int{return([0-9]+|(\w+)|null)|boolean{return(true|false|(\w+)|null)|string{return(["'][^"']*["']|(\w+)|null)|float{return(\d+(\.\d+)|(\w+)|null));}$/,
    /^run\(\){INST}$/
  ]

  console.log(input)
  console.log(result)

  for (let i = 0; i < result.length; i++) {
    if (!checkGrammar(result[i], grammar)) {
      return {success: false, msg: `Error en el bloque de codigo ${result[i]}`};
    }
  }


  return {success: true, msg: 'Codigo valido'};
}

const checkGrammar = (input, grammar) => {
  for (let i = 0; i < grammar.length; i++) {
    if (grammar[i].test(input)) {
      return true;
    }
  }

  return false;
}

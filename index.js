exports.getCX = () => {	
    var elements = {
      elements: [
      { data: { id: 'a' } },
      { data: { id: 'b' } },
      {
        data: {
          id: 'ab',
          source: 'a',
          target: 'b'
        }
      }]
    }
    return elements 
}

exports.sayHello = (name) => {
  console.log(buildSentence(name)) 
}


var buildSentence = function(name) {
  return 'Hello ' + name + '!'
}


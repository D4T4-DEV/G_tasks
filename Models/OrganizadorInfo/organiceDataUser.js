function organizeByAlphabet(data) {
    var organizedData = {};
    data.forEach(user => {
        var firstLetter = user.username[0].toUpperCase();
        // Verificar si firstLetter es una letra
        if (/^[A-Z]$/.test(firstLetter)) {
            // Si no existe este medio lo crea
            if (!organizedData[firstLetter]) {
                organizedData[firstLetter] = [];
            }
            organizedData[firstLetter].push(user);
        } else {
            // Si no existe este medio lo crea
            if (!organizedData['Others']) {
                organizedData['Others'] = [];
            }
            organizedData['Others'].push(user);
        }
    });

    // Obtenemos la referencia del objeto que hemos procesado anteriormente ej. [ 'A', 'C', 'M', 'Others', 'B' ], etc
    var keyObjeto = Object.keys(organizedData);

    // Organizacion de las keys en modo alfabetico [ 'A', 'B', 'C', 'M', 'Others']
    keyObjeto.sort();

    // Movimiento de la clave Others, ya que este no pertenece al abecedario
    if (keyObjeto.includes('Others')) {
        keyObjeto = keyObjeto.filter(key => key !== 'Others');
        keyObjeto.push('Others');
    }

    var dataOrgaAlfabe = {};

    // Organizamos la presentacion de los datos de modo alfabetico en otro json
    keyObjeto.forEach(key => {
        dataOrgaAlfabe[key] = organizedData[key];
    });

    return dataOrgaAlfabe;
}



module.exports={
    organizeByAlphabet
}
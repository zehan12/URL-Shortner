function generateUID() {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = Date.now()
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

const regUrl = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/

module.exports = { generateUID, regUrl }
let logArray = [];

logFunc = (req, res, next) => {
    let logMessage = "API accessed path:[ " + req.path + " ]   Method:[ " + req.method + " ]   @:[ " + new Date() + " ]";
    console.log(logMessage);
    logArray.push(logMessage);

    // console.log(logArray);
    next();
}

module.exports = logFunc;
const mongooseErrHandler = (err) => {
    const errs = [];

    if (err.name === 'ValidationError') {
        Object.keys(err.errors).forEach(key => {
            console.log(err.errors[key].message);
            errs.push(err.errors[key].message);
        });
    } else {
        errs.push(err.message);
    }

    return errs;
}

const errHandler = (res, err, code) => {
    code = code || 500;

    const errs = mongooseErrHandler(err);

    res.status(code).json(errs);
}

module.exports = errHandler;
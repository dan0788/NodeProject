const joi = require('joi');

const idFunction = (id) => {
    const schemaId = joi.object({//crear un objeto joi
        id: joi.number().required().min(1).max(5)
        //pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))//
    });
    const { error, value } = schemaId.validate({ id: id });
    if (!error) {
        return value['id'];
    } else {
        return error.details[0].message;
    }
};

const nameFunction = (name) => {
    const schemaName = joi.object({
        nombre: joi.string().required().min(3).max(8)
    });

    const { error, value } = schemaName.validate({ nombre: name });
    if (!error) {
        return `Su nombre es ${value['nombre']}`;
    } else {
        return error.details[0].message;
    }
};

const passFunction = (pass, repeatPass) => {
    const schema = joi.object({
        password: joi.string().pattern(new RegExp('[a-z,A-Z]{3,8}')),//pattern define los caracteres permitidos en la contraseña
        repeat_password: joi.ref('password')
    });
    const { error, value } = schema.validate({ password: pass, repeat_password: repeatPass });
    if (!error) {
        return {password:value['password'],repeat_password:value['repeat_password']};
    } else {
        return error.details[0].message;
    }
};

const emailFunction = (email) => {
    const schema = joi.object().keys({
        email: joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'ec', 'edu'] } })
    });
    const { error, value } = schema.validate({ email: email });
    if (!error) {
        return value['email'];
    } else {
        return error.details[0].message;
    }
};

const dateFunction = (date) => {
    const schema = joi.object().keys({
        date: joi.date().greater('1-1-1800')
        //greater significa que la fecha debe ser mayor a la designada en el parentesis
    });
    const { error, value } = schema.validate({ date: date });
    if (!error) {
        return value['date'];
    } else {
        return error.details[0].message;
    }
};

const fromFunction = (from, to) => {
    const schema = joi.object().keys({
        from: joi.date().required(),
        to: joi.date().greater(joi.ref('from')).required()
        //greater significa (fecha;+infinito)
        //less significa (-infinito;fecha)
        //también se puede utilizar max y min
    });
    const { error, value } = schema.validate({ from: from, to: to });
    if (!error) {
        return `Desde ${value['from']} Hasta ${value['to']}`;
    } else {
        return error.details[0].message;
    }
};

module.exports = {
    idFunction: idFunction,
    nameFunction: nameFunction,
    passFunction: passFunction,
    emailFunction: emailFunction,
    dateFunction: dateFunction,
    fromFunction: fromFunction
};
/* console.log(idFunction(55555));
nameFunction("Daniel");
passFunction("H1", "H1");
emailFunction("danielayala1793@hotmail.edu.ec");
dateFunction('1-1-1993');
fromFunction('5-4-1994', '6-19-2022'); */
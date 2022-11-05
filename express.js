const express=require('express');
const joi=require('./joi');

const app=express();

app.use(express.json());

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Conectado al puerto ${port}`);
});

app.get("/:id/:name/:pass&:rePass/:email/:date/:from&:to",(request,response)=>{
    response.send({
        id:joi.idFunction(request.params.id),
        name:joi.nameFunction(request.params.name),
        pass:joi.passFunction(request.params.pass,request.params.rePass),
        email:joi.emailFunction(request.params.email),
        date:joi.dateFunction(request.params.date),
        range:joi.fromFunction(request.params.from,request.params.to)
    });
});
var compiler = require("compilex");
var options = {stats : true};
compiler.init(options);

exports.compiler = async(req, res)=>{
    let code = req.body.code;
    // console.log(code)
    let input = req.body.input;
    let inputRadio = req.body.inputRadio; //made diff here
    let lang = req.body.language; //made diff here
    // console.log(code, input, inputRadio, lang)

    if(lang==="cpp"){
        if(inputRadio == true){
            var envData = { OS : "windows" , cmd : "g++", options: {timeout:10000}};
            compiler.compileCPPWithInput(envData , code , input , function (data) {
                if(data.error){
                    // console.log(data.error)
                    res.status(400).send(data.error)

                }
                else{
                    res.send({data : data.output});
                }
            });
        }
        else{
            var envData = { OS : "windows" , cmd : "g++", options: {timeout:10000}};
            compiler.compileCPP(envData , code , function (data) {
                if(data.error){
                    res.status(400).send(data.error)
                }
                else{
                    console.log(data)
                    res.send({data : data.output});
                }
            });
        }
    }

    if(lang==="python"){
        // console.log("kjn")
        if(inputRadio == true){
            var envData = { OS : "windows"};
            compiler.compilePythonWithInput(envData , code , input , function (data) {
                if(data.error){
                    res.status(400).send(data.error)
                }
                else{
                    res.send({data : data.output});
                }
            });
        }
        else{
            var envData = { OS : "windows"};
            compiler.compilePython(envData , code , function (data) {
                if(data.error){
                    res.status(400).send(data.error)
                }
                else{
                    // console.log("data: ", data.output)
                    res.send({data : data.output});
                }
            });
        }
    }

    if(lang === "java"){
        if(inputRadio == true){
            var envData = { OS : "windows"};
            compiler.compileJavaWithInput(envData , code , input , function (data) {
                if(data.error){
                    res.status(400).send(data.error)
                }
                else{
                    res.send({data : data.output});
                }
            });
        }
        else{
            var envData = { OS : "windows"};
            compiler.compileJava(envData , code , function (data) {
                if(data.error){
                    res.status(400).send(data.error)
                }
                else{
                    res.send({data : data.output});
                }
            });
        }
    }
};
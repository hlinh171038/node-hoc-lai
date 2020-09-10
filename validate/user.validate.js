module.exports.postCreate = function(req,res,next){
    var value = req.body;
    var error = [];
    if(req.body.name ==="" )
    {
        error.push('Name is require !!!');
    }
    if(req.body.phone ==="")
    {
        error.push('Phone is require !!!');
    }
    if(req.file.path ==="")
    {
        req.file.path = "uploads/1298352ff3059f6c04528cec1c19e241";
    }
    if(error.length)
    {
        res.render('create',
            {
                error:error,
                value:value
            }
        );
        return;
    }
   res.locals.sucess = true;
    next();
}
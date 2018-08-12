exports.render = function(req, res) {
    if (req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }
    
    let time = new Date();
    req.session.lastVisit = 'Last Visit : ' + time.getFullYear()
    + '-' + (time.getMonth() +1) + '-' + time.getDate() + ' .. '
    + time.getHours() + '-' + time.getMinutes() + '-'
    + time.getSeconds();

    res.render('index', {title : 'First Study nodejs'});
};
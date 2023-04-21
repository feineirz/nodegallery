exports.getHome = (req, res) => {
    res.render('index', {
        pageName: 'home',
        pageTitle: 'Home',
    })
}

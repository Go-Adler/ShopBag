const userLoad = (req, res) => {
  res.render('admin/users')
}

const homeLoad = (req, res) => {

  res.render('admin/home')
}

module.exports = {
  userLoad,
  homeLoad
}
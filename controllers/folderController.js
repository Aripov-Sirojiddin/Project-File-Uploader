async function getCreateView(req, res) {
  res.render("pages/logedin", { name: req.user.name, createFolder: true });
}

module.exports = {
  getCreateView,
};

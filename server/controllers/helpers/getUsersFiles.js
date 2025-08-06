const folderModel = require("../models/folders");

async function getUserFiles(user)
 await folderModel.getAllByParentId(
    global.folderId,
    req.user.id
  );
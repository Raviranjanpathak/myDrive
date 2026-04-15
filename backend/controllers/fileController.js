const File = require("../models/File");

exports.uploadFile = async (req, res) => {
  const file = new File({
    name: req.file.originalname,

   
    path: req.file.filename,

    size: req.file.size,
    folder: req.body.folder ? req.body.folder : null,
    user: req.user.id
  });

  await file.save();
  res.json(file);
};
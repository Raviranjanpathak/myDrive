const Folder = require("../models/Folder");
const File = require("../models/File");

exports.createFolder = async (req, res) => {
  const { name, parent } = req.body;

  const folder = new Folder({
    name,
    parent: parent && parent !== "" ? parent : null,
    user: req.user.id
  });

  await folder.save();
  res.json(folder);
};

// Recursive size calculation
async function calculateSize(folderId) {
  const files = await File.find({ folder: folderId });
  let total = files.reduce((sum, f) => sum + f.size, 0);

  const subfolders = await Folder.find({ parent: folderId });
  for (let sub of subfolders) {
    total += await calculateSize(sub._id);
  }

  return total;
}

exports.getFolders = async (req, res) => {
  const folders = await Folder.find({ user: req.user.id });

  const result = [];
  for (let folder of folders) {
    const size = await calculateSize(folder._id);
    result.push({ ...folder.toObject(), size });
  }

  res.json(result);
};
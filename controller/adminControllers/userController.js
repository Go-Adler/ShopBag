const userSevices = require("../../services/userServices")

const block = async (req, res) => {
  try {
    const block = await userSevices.blockUser(req.body.userId);

    if (!block) {
      console.log('Error blocking user');
      return res.status(404).send('Error blocking user');
    }

    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

const unblock = async (req, res) => {
  try {
    const block = await userSevices.unblockUser(req.body.userId);

    if (!block) {
      console.log('Error blocking user');
      return res.status(404).send('Error blocking user');
    }

    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  block,
  unblock
}
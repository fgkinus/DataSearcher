/* eslint-disable no-param-reassign,null */
import keystone from "keystone";

const Item = keystone.list("Items");

// eslint-disable-next-line consistent-return
export const create = async (req, res) => {
  const payload = req.body;
  payload.data.forEach(item => {
    item.dateAdded = Date.now();
    item.dateModified = Date.now();
  });

  try {
    await Item.model
      .insertMany(payload.data)
      .then(response => {
        return res.status(201).send({
          message: "New item successfully added",
          details: response
        });
      })
      .catch(e => {
        throw e;
      });
  } catch (e) {
    return res.status(500).send({
      error: "error adding the entry",
      details: e.message
    });
  }
};

// eslint-disable-next-line consistent-return
export const list = async (req, res) => {
  try {
    const { query } = req;
    if (query.q === undefined) {
      return res.status(400).send({
        error: "The search query provided is invalid"
      });
    }
    await Item.model
      .find({
        $text: { $search: query.q }
      })
      .lean()
      .then(docs => {
        return res.status(200).send({
          message: "search successful",
          data: docs
        });
      })
      .catch(e => {
        throw e;
      });
  } catch (e) {
    return res.status(500).send({
      error: "error fetching the search results",
      details: e.message
    });
  }
};

// eslint-disable-next-line consistent-return
export const search = async (req, res) => {
  try {
    const { query } = req;
    if (query.q === undefined) {
      return res.status(400).send({
        error: "The search query provided is invalid"
      });
    }

    await Item.model.search(
      {
        match: { itemDescription: query.q }
      },
      (err, results) => {
        if (err) {
          throw err;
        }
        return res.status(200).send({
          message: "search successful",
          data: results
        });
      }
    );
  } catch (e) {
    return res.status(500).send({
      error: "error fetching the search results",
      details: e.message
    });
  }
};

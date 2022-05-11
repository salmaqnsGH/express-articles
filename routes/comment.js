const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

router.post("/list", async (req, res) => {
  const queries = req.body.queries;
  const searchQueryRegex = [];
  for (const s of queries.search) {
    searchQueryRegex.push({ [s.by]: { $regex: s.query, $options: "i" } });
  }

  const filterQueryRegex = [];
  for (const f of queries.filter) {
    filterQueryRegex.push({ [f.by]: { $in: f.options } });
  }

  const matchQuery = {
    $match: {
      is_active: true,
      $or:
        searchQueryRegex.length > 0 ? searchQueryRegex : [{ is_active: true }],
      ...filterQueryRegex[0],
    },
  };

  const condQuery = [
    { $sort: { [queries.sort.by]: queries.sort.to } },
    { $skip: queries.skip },
    { $limit: queries.limit },
  ];

  const comment = await Comment.aggregate([
    {
      $facet: {
        collection_count: [{ $count: "size" }],
        active_count: [{ $match: { is_active: true } }, { $count: "size" }],
        paging_active_count: [matchQuery, ...condQuery, { $count: "size" }],
        items: [matchQuery, ...condQuery],
      },
    },
    {
      $project: {
        collectionCount: {
          $ifNull: [{ $arrayElemAt: ["$collectionCount.size", 0] }, 0],
        },
        active_count: {
          $ifNull: [{ $arrayElemAt: ["$active_count.size", 0] }, 0],
        },
        paging_active_count: {
          $ifNull: [{ $arrayElemAt: ["$paging_active_count.size", 0] }, 0],
        },
        itemsCount: { $size: "$items" },
        items: 1,
      },
    },
  ]);

  return res.status(200).send(comment);
});

router.get("/:id", async (req, res) => {
  const _id = req.params.id;
  await Comment.findOne({ is_active: true, _id })
    .then((result) => {
      if (result != null) res.status(200).send(result);
      else res.status(400).send({ message: "no result!" });
    })
    .catch((exception) => {
      res.status(500).send(exception);
    });
});

router.get("/article/:id", async (req, res) => {
  const article_id = req.params.id;
  await Comment.find({ is_active: true, article_id })
    .then((result) => {
      if (result != null) res.status(200).send(result);
      else res.status(400).send({ message: "no result!" });
    })
    .catch((exception) => {
      res.status(500).send(exception);
    });
});

router.post("/", async (req, res) => {
  const input = req.body;

  await Comment.create(input)
    .then(() => {
      res.status(200).send({ message: "data has been saved!" });
    })
    .catch((exception) => {
      res.status(500).send(exception);
    });
});

router.put("/:id", async (req, res) => {
  const _id = req.params.id;
  const updatePayload = req.body;
  await Comment.updateOne({ is_active: true, _id }, { $set: updatePayload })
    .then((result) => {
      if (result.modifiedCount == 1)
        res
          .status(200)
          .send({ message: "data has been updated!", detail: result });
      else
        res
          .status(400)
          .send({ message: "data is not updated", detail: result });
    })
    .catch((exception) => {
      res.status(500).send(exception);
    });
});

router.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  await Comment.updateOne(
    { is_active: true, _id },
    { $set: { is_active: false } }
  )
    .then((result) => {
      if (result.modifiedCount == 1)
        res
          .status(200)
          .send({ message: "data has been deleted!", detail: result });
      else
        res
          .status(400)
          .send({ message: "cannot delete data!", detail: result });
    })
    .catch((exception) => {
      res.status(500).send(exception);
    });
});

router.delete("/permanent/:id", async (req, res) => {
  const _id = req.params.id;
  await Comment.deleteOne({ _id })
    .then((result) => {
      if (result.deletedCount == 1)
        res.status(200).send({
          message: "data has been permanently deleted!",
          detail: result,
        });
      else
        res
          .status(400)
          .send({ message: "cannot delete data!", detail: result });
    })
    .catch((exception) => {
      res.status(500).send(exception);
    });
});

module.exports = router;

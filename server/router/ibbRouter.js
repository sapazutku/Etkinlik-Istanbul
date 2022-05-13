import express from "express";
import axios from "axios";

const ibbRouter = express.Router();

//
ibbRouter.get("/:search", async (req, res) => {
  try {
    const { search } = req.params;
    const api =
      "https://data.ibb.gov.tr/api/3/action/datastore_search?q=" +
      search +
      "&resource_id=d588f256-2982-43d2-b372-c38978d7200b";
    axios
      .get(encodeURI(api))
      .then((response) => res.json(response.data.result.records));
  } catch (error) {
    console.log(error);
  }
});

export default ibbRouter;

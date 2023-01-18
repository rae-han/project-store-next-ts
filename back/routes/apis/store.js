const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:storeId", async (req, res, next) => {
  const { storeId } = req.params;

  if (!storeId) {
    return res.status(412).json(new Error("not found storeId"));
  }

  try {
    const options = {
      method: "POST",
      url: `${process.env.API_URL}/store/info`,
      data: {
        store_id: storeId,
      },
    };

    const result = await axios(options);
    return res.status(200).json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:storeId/settings", async (req, res, next) => {
  const storeId = req.params.storeId;

  const options = {
    method: "POST",
    url: `${process.env.API_URL}/store/setting`,
    data: {
      store_id: storeId,
    },
  };

  try {
    const result = await axios(options);
    return res.status(200).json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:storeId/banners", async (req, res, next) => {
  const storeId = req.params.storeId;

  const options = {
    method: "GET",
    url: `${process.env.API_URL}/store/${storeId}/banners`,
    data: {
      store_id: storeId,
    },
  };

  try {
    const result = await axios(options);
    return res.status(200).json(result.data.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:storeId/categories", async (req, res, next) => {
  const storeId = req.params.storeId;

  const options = {
    method: "POST",
    url: `${process.env.API_URL}/category/list`,
    data: {
      store_id: storeId,
    },
  };

  try {
    const result = await axios(options);
    return res.status(200).json(result.data.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:storeId/category/:categoryId/menus", async (req, res, next) => {
  const storeId = req.params.storeId;
  const categoryId = req.params.categoryId;

  const options = {
    method: "POST",
    url: `${process.env.API_URL}/menu/list`,
    data: {
      store_id: storeId,
      category_id: categoryId,
    },
  };

  try {
    const result = await axios(options);
    return res.status(200).json(result.data.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

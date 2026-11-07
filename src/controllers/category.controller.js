import mongoose from "mongoose";
import { CategoryModel } from "../models/category.model.js";
import { EventModel } from "../models/event.model.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = matchedData(req);

    const categoryId = new mongoose.Types.ObjectId();

    const category = await CategoryModel.create([
      {
        _id: categoryId,
        name,
        description,
      },
    ]);

    return res.status(201).json({ data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
export const getCategoriesAll = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
export const getCategoryById = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const category = await CategoryModel.findById({ _id: id }).populate(
      "events",
    );
    if (!category) {
      return res.status(404).json({ msg: "Category no encontrado." });
    }

    return res.status(200).json({ data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const { name, description } = matchedData(req, {
      locations: ["body"],
    });

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      { _id: id },
      {
        name,
        description,
      },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedCategory) {
      return res.status(404).json({ msg: "Category no encontrado." });
    }

    return res.status(200).json({ data: updatedCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ msg: "Category no encontrado." });
    }

    await EventModel.updateMany(
      { categories: id },
      { $pull: { categories: id } },
    );
    await CategoryModel.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Category eliminada correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

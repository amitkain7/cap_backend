import Board from "../models/board.model.js";
import Class from "../models/class.model.js";
import User from "../models/user.model.js";
export const createBoard = async (req, res, next) => {
  try {
    const { name } = req.body;
    const isExist = await Board.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (isExist) {
      throw new Error("Board Name Already Exists", {
        cause: { status: 400 },
      });
    }

    const user = await User.findById(req.user._id);
    const newBoard = await Board.create({
      name,
      status: "Active",
      createdByName: `${user.fName} ${user.lName}`,
      createdBy: req.user._id,
    });
    res.status(201).json({
      status: "success",
      message: " Board created successfully",
      newBoard,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchBoard = async (req, res, next) => {
  try {
    const boards = await Board.find();
    res.status(200).json({
      status: "success",
      message: " Boards fetched successfully",
      boards,
    });
  } catch (error) {
    next(error);
  }
};
export const updateBoard = async (req, res, next) => {
  try {
    const { name, totalStudents, status } = req.body;
    const id = req.params.id;
    const isExist = await Board.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (isExist && !isExist._id.equals(id)) {
      throw new Error("Board Name Already Exists", {
        cause: { status: 400 },
      });
    }

    const updatedBoard = await Board.findByIdAndUpdate(
      id,
      { name, status, totalStudents },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Board updated successfully",
      updatedBoard,
    });
  } catch (error) {
    next(error);
  }
};
export const inactiveStatus = async (req, res, next) => {
  const id = req.params.id;
  try {
    let status = req.body.status;
    if (status === "Active") {
      status = "Inactive";
    } else if (status === "Inactive") {
      status = "Active";
    }
    const board = await Board.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Board updated successfully",
      board,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteBoard = async (req, res, next) => {
  try {
    const id = req.params.id;

    const hasClasses = await Class.find({ boardId: id }).countDocuments();

    if (hasClasses) {
      throw new Error("Unable to delete board, contains classes", {
        cause: { status: 400 },
      });
    }

    await Board.findByIdAndDelete(id);
    res.status(201).json({
      status: "success",
      message: "Board deleted successfully",
      total: hasClasses,
    });
  } catch (error) {
    next(error);
  }
};

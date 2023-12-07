import SubTopicTab from "../models/sub-topic-tab.model.js";

export const addTab = async (req, res, next) => {
  try {
    const { subTopicId, name } = req.body;
    const createdBy = req?.user?._id;
    const tab = await SubTopicTab.create({ subTopicId, name, createdBy });
    res.status(201).json({ status: "success", message: "tab added", tab });
  } catch (err) {
    next(err);
  }
};
export const editTab = async (req, res, next) => {
  try {
    const { tabId, name } = req.body;
    const tab = await SubTopicTab.findByIdAndUpdate(tabId, {
      ...(name && { name }),
    });
    res.status(200).json({ status: "success", message: "tab updated", tab });
  } catch (err) {
    next(err);
  }
};

export const fetchTabs = async (req, res, next) => {
  try {
    const { subTopicId } = req.params;
    const tabs = await SubTopicTab.find({ subTopicId });
    res.status(200).json({ status: "success", message: "tabs fetched", tabs });
  } catch (err) {
    next(err);  
  }
};

export const errorHandler = (err, _, res, next) => {
    if (!err) return;
    return res.status(err?.cause?.status || 500).json({
      status: "error",
      message: err?.message || "😐 something went wrong",
    });
  };
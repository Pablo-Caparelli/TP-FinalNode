export const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  });
};

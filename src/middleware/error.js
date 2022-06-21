module.exports = (erro, _req, res, _next) => {
  if (erro.code) {
    const statusCode = erro.code || 500;
    return res.status(statusCode).json({ message: erro.message });
  }
  return res
    .status(500)
    .json({
      error: {
        code: 'internal',
        message: 'Tivemos um erro Interno, aguarde um tempo e recarregue a página!',
      },
    });
};

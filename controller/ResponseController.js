function createResponse(data, status, error) {
  return {
    data: data,
    status: status,
    error: error
  };
}

module.exports = createResponse;

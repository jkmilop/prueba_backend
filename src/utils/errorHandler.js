function errorHandler(res, error) {
    console.error('Error:', error);
    
    let statusCode = 500;
    let message = 'Error interno del servidor';
  
    // Handle specific error cases and set appropriate status code and message
    if (error.name === 'SequelizeValidationError') {
      statusCode = 400;
      message = 'Error de validación de Sequelize: ' + error.message;
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      statusCode = 400;
      message = 'Error de restricción única de Sequelize: ' + error.message;
    } else if (error.name === 'SequelizeDatabaseError') {
      statusCode = 500;
      message = 'Error de la base de datos: ' + error.message;
    }
    
    // Send response with the appropriate status code and message
    return res.status(statusCode).json({ message });
  }
  
  module.exports = errorHandler;
  
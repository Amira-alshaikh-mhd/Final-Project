
const bookModel = require('../Models/bookModel');

const checkHostAvailability = async (hostId, startDate, endDate) => {
  try {
    const existingBookings = await bookModel.find({
      hostId,
      $or: [
        {
          startDate: { $gte: startDate, $lt: endDate }
        },
        {
          endDate: { $gt: startDate, $lte: endDate }
        },
        {
          startDate: { $lte: startDate },
          endDate: { $gte: endDate }
        }
      ]
    });

    if (existingBookings.length > 0) {
      // Host is not available for the given date range
      return false;
    } else {
      // Host is available for the given date range
      return true;
    }
  } catch (err) {
    console.log("error ", err);
    throw err;
  }
};


module.exports = {
  checkHostAvailability
};
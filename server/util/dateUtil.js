const getCurrentDate = async (db) => {
  return db.collection('system-data').aggregate([
    {
      $project: {
        '_id': 0,
        'currentDate': 1,
      }
    }
  ]).next();
};

module.exports = getCurrentDate;
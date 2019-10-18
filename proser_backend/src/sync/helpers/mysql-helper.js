function removeRowDataPacket (myResult) {
  let result = myResult;

  if(myResult){
    result = JSON.parse(JSON.stringify(myResult));
  }

  return result;
}

function removeRowDataPacketArray (myResult) {
  let result = myResult;

  if(myResult){
    result = myResult
      .map(x => {
        return x.RowDataPacket;
      });
  }

  return result;
}

module.exports = {
  removeRowDataPacket,
  removeRowDataPacketArray
};

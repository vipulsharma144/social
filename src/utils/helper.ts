// function to check if valid mongo id
export function isValidObjectId(id: string) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    // it's an ObjectID
    return true;
  } else {
    // nope
    return false;
  }
}

function findAccountById(accounts, id) {
  return accounts.find((account) => {
    return account.id === id;
  });
}

function sortAccountsByLastName(accounts) {
  const result = accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1
  );
  return result;
}

function getTotalNumberOfBorrows(account, books) {
  const { id: accId } = account;

  return books.reduce((accumulator, book) => {
    return (
      accumulator +
      book.borrows
        .filter((borrow) => borrow.id === accId)
        .reduce((accumulatorBorrows, borrow) => accumulatorBorrows + 1, 0)
    );
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksPossessed = [];
  books.forEach((book) => {
    let borrowArray = book.borrows;
    if (
      borrowArray.find(
        (borrow) => borrow.id === account.id && borrow.returned === false
      )
    ) {
      booksPossessed.push(book);
    }
  });

  booksPossessed.forEach((book) => {
    let author = authors.find((person) => person.id === book.authorId);
    book["author"] = author;
  });
  console.log(booksPossessed);
  return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

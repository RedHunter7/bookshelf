import renderNotificationMessage from '../component/notification-message.js'

const localStorageKey = 'BOOK_DATA'

const getAllBookData = () => {
  const serializedData = localStorage.getItem(localStorageKey)
  const data = JSON.parse(serializedData)
  return data
}

const insertBookData = bookData => {
  const idx = Date.now()
  const idy = Math.floor(1000000000000 + Math.random() * 9000000000000)
  const bookId = idx + '-' + idy

  const submitData = {
    id: bookId,
    title: bookData.title,
    author: bookData.author,
    year: bookData.year,
    isComplete: bookData.isComplete
  }

  let allBookData = getAllBookData()
  if (allBookData == null) {
    allBookData = []
  }

  const messageText = `Insert "${bookData.title}" Book Success`

  // show notification message while insert process is complete
  renderNotificationMessage(messageText)

  // scroll to the top of the page
  window.scrollTo(0, 0)

  allBookData.push(submitData)

  localStorage.setItem(localStorageKey, JSON.stringify(allBookData))
}

const changeBookStatus = bookId => {
  const allBookData = getAllBookData()
  allBookData.every(book => {
    if (bookId === book.id) {
      book.isComplete = !book.isComplete

      let bookStatus = 'finished'
      if (book.isComplete === false) bookStatus = 'unfinished'
      const messageText = `Mark "${book.title}" Book as ${bookStatus} Success`
      renderNotificationMessage(messageText)
      window.scrollTo(0, 0)

      return false
    }

    return true
  })

  localStorage.setItem(localStorageKey, JSON.stringify(allBookData))
}

const deleteBookData = bookId => {
  const allBookData = getAllBookData()
  const slicedBookData = allBookData.filter(book => {
    if (bookId === book.id) {
      const messageText = `Delete "${book.title}" Book Success`
      renderNotificationMessage(messageText)
      window.scrollTo(0, 0)
    }

    return bookId !== book.id
  })

  localStorage.setItem(localStorageKey, JSON.stringify(slicedBookData))
}

const editBookData = submitData => {
  const allBookData = getAllBookData()
  allBookData.every(book => {
    if (submitData.id === book.id) {
      book.title = submitData.title
      book.author = submitData.author
      book.year = submitData.year

      const messageText = `Edit "${book.title}" Book Success`

      renderNotificationMessage(messageText)
      window.scrollTo(0, 0)

      return false
    }
    return true
  })

  localStorage.setItem(localStorageKey, JSON.stringify(allBookData))
}

export { getAllBookData, insertBookData, changeBookStatus, editBookData, deleteBookData }

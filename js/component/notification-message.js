import bulmaNotificationManager from '../bulma/bulma-notification.js'

const renderNotificationMessage = (text, dangerMessage = false) => {
  let notificationType = 'is-success'
  if (dangerMessage === true) {
    notificationType = 'is-danger'
  }

  const columns = document.createElement('div')
  columns.classList.add('columns')

  const column = document.createElement('div')
  column.classList.add('column')
  column.classList.add('is-half')
  column.classList.add('is-offset-one-quarter')

  columns.appendChild(column)

  const notification = document.createElement('div')
  notification.classList.add('notification')
  notification.classList.add(notificationType)

  column.appendChild(notification)

  const deleteBtn = document.createElement('button')
  deleteBtn.classList.add('delete')

  const deleteSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  deleteSvg.setAttributeNS(null, 'viewBox', '0 0 320 512')

  const deletePath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  deletePath.setAttributeNS(null, 'd', 'M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z')

  deleteSvg.appendChild(deletePath)
  deleteBtn.appendChild(deleteSvg)

  const textMessage = document.createTextNode(text)

  notification.appendChild(deleteBtn)
  notification.appendChild(textMessage)

  document.getElementById('notification-section').appendChild(columns)
  bulmaNotificationManager()

  return columns
}

export default renderNotificationMessage

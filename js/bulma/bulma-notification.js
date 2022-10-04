const bulmaNotificationManager = () => {
  (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
    const $notification = $delete.parentNode

    $delete.addEventListener('click', () => {
      const $notificationSection = document.getElementById('notification-section')
      $notificationSection.removeChild($notification.parentNode.parentNode)
    })
  })
}

export default bulmaNotificationManager

import swal from 'sweetalert2'

function showSwalLoading(text) {
  swal({
    text,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  })

  swal.showLoading()
}

function closeSwal() {
  swal.close()
}

/* function showSwalConfirmation(settings) {
  let dataSet = settings
  if (dataSet === null) {
    dataSet = {}
  }
  swal({
    title: dataSet.title,
    text: dataSet.text,
    type: 'question',
    confirmButtonColor: '#d33',
    confirmButtonText: dataSet.confirmText,
    cancelButtonColor: '#3085d6',
    cancelButtonText: dataSet.cancelText,
    showCancelButton: true
  })
  .then(result => {
    if (result.value) {
      if (dataSet.confirmCallback) {
        dataSet.confirmCallback()
      }
    }
    else if (!result.value) {
      if (dataSet.cancelCallback) {
        dataSet.cancelCallback()
      }
    }
  })
} */

function showSwalConfirmation({ text, title, confirmText, cancelText }) {
  let confirm = confirmText || 'Ok'
  let cancel = cancelText || 'Cancel'
  return new Promise((resolve, reject) => {
    swal({
      title,
      text,
      type: 'warning',
      confirmButtonColor: '#d33',
      confirmButtonText: confirm,
      cancelButtonColor: '#3085d6',
      cancelButtonText: cancel,
      showCancelButton: true,
    })
      .then((res) => resolve(res.value))
      .catch((err) => reject(err))
  })
}

const Dialogs = {
  showSwalLoading,
  closeSwal,
  showSwalConfirmation,
}

export default Dialogs

export { showSwalLoading, closeSwal, showSwalConfirmation }

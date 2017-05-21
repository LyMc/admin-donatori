import { call } from 'redux-saga/effects'

function * upload (path, file, metadata) {
  const ref = this.app.storage().ref(path)
  const task = yield call([ref, ref.put], file, metadata)

  return task
}

function * uploadString (path, string, format, metadata) {
  const ref = this.app.storage().ref(path)
  const task = yield call([ref, ref.putString], string, format, metadata)

  return task
}

function * getDownloadURL (path) {
  const ref = this.app.storage().ref(path)
  const url = yield call([ref, ref.getDownloadURL])

  return url
}

function * getFileMetadata (path) {
  const ref = this.app.storage().ref(path)
  const metadata = yield call([ref, ref.getMetadata])

  return metadata
}

function * updateFileMetadata (path, newMetadata) {
  const ref = this.app.storage().ref(path)
  const metadata = yield call([ref, ref.updateMetadata], newMetadata)

  return metadata
}

function * deleteFile (path) {
  const ref = this.app.storage().ref(path)
  yield call([ref, ref.delete])
}

export default {
  upload,
  uploadString,
  getDownloadURL,
  getFileMetadata,
  updateFileMetadata,
  deleteFile
}

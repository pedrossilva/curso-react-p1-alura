import PubSub from 'pubsub-js'

class ErrorHandle {
  publish(res) {
    (res.errors || []).forEach(e => PubSub.publish('validation-error', e))
    // console.log('>>> res', res.data)
  }
}

export default ErrorHandle

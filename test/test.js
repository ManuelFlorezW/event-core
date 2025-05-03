const { User } = require('../dist/index.js')

class UserTest {
  constructor() {
    this.user = new User()
    this.testEventUndefined()
  }

  testEventUndefined() {
    const result = this.user.getDecide()
    console.log(result)
    console.assert(true === result.isOk, 'When the event is undefined')
  }

}

new UserTest()

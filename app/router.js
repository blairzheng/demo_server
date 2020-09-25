module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);
  // router.get('/getName/:id', controller.test.getName);
  // router.post('/addName', controller.test.addName);
  // router.post('/update', controller.test.updateName);
  // router.post('/delete', controller.test.deleteName);
  // router.post('/upload', controller.test.upload);
  router.post('/login',controller.user.login)
  router.post('/logout',controller.user.logout)
  router.post('/mail',controller.mail.sendMail)
  router.post('/verify',controller.verifyCode.verify)
  router.post('/user/add',controller.user.adduser)
  router.post('/user/update',controller.user.updateuser)
  router.post('/user/delete',controller.user.deleteuser)
  router.post('/user/updateMail',controller.user.bindMail)
  router.post('/user/list',controller.user.userList)
  router.post('/user/status',controller.user.changeUserState)
  router.post('/user/getPassByMail',controller.user.updatePassByMail)
  router.post('/warnset/info',controller.warnSet.info)
  router.post('/warnset/updateinfo',controller.warnSet.updateInfo)
  router.post('/devices/list',controller.devices.list)
  router.post('/devices/update',controller.devices.update)
  router.post('/devices/allice',controller.devices.allDeviceIce)
  router.post('/devices/deviceIceGroup',controller.devices.deviceIceGroup)
  router.post('/devices/info',controller.devices.device)
  router.post('/mqtt/list',controller.mqtt.list)
  router.post('/mqtt/cur',controller.mqtt.cur)
  router.post('/warn/info',controller.warnInfo.list)
  router.post('/warn/times',controller.warnInfo.warnTimes)
  router.post('/system/info',controller.systemSet.getInfo)
  router.post('/system/update',controller.systemSet.updateInfo)
  router.post('/dashboard/info',controller.dashboard.dashboard)
};
// module.exports = app => {
//   app.router.resources('topics', '/api/v2/topics', app.controller.topics);
// };
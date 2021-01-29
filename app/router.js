module.exports = app => {
  const { router, controller } = app;
  router.post('/user/add', controller.user.addUser); //添加用户
  router.post('/user/delete', controller.user.deleteUser); //删除用户
  router.post('/user/update', controller.user.updateUser); //修改用户
  router.post('/user/list', controller.user.listUser); //获取用户列表

  router.post('/permission/add', controller.permission.addPermission); //添加权限
  router.post('/permission/detele', controller.permission.deletePermission); //删除权限
  router.post('/permission/update', controller.permission.updatePermission); //修改权限信息
  router.post('/permission/listPermission', controller.permission.listPermission); //获取权限列表
  router.post('/role/add', controller.role.addRole); //添加角色
  router.post('/role/detele', controller.role.deleteRole);//删除角色
  router.post('/role/updateRoleName', controller.role.updateRoleName);//修改角色名
  router.post('/role/maintainPermission', controller.role.maintainPermission);//维护权限
  router.post('/role/listRole', controller.role.listRole);//获取角色列表
  router.post('/role/getPermissionByRoleId', controller.role.getPermissionByRoleId);//通过角色获取权限列表
};
// module.exports = app => {
//   app.router.resources('topics', '/api/v2/topics', app.controller.topics);
// };
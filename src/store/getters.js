const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  phone: state => state.user.phone,
  tenantId: state => state.user.tenantId,
  openId: state => state.user.openId,
  avatar: state => state.user.avatar,
  companyId: state => state.user.companyId,
  changeMeunStatus:state=>state.user.changeMeunStatus
}
export default getters 

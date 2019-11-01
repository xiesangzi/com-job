<template>
	<div class="header">
		<Row  align="middle" >
			<Col :xs="5" :sm="5" :md="7" :lg="6" :xl="10" class="logoBox">
				<div class="imgLogo deCursor" @click="toIndex(1)" :class="{maxmeun:$store.getters.changeMeunStatus==1}">
					1+X就业协同服务平台
				</div>
			</Col>
			
			<div class="mdWidth">
				<Col :xs="2" :sm="3" :md="3" :lg="3" :xl="2"><div @click="toIndex(1)" class="deCursor" :class="{maxmeun:$store.getters.changeMeunStatus==1}">首页</div> </Col>
				<Col :xs="2" :sm="3" :md="3" :lg="3" :xl="2"><div @click="toqiye(2)" class="deCursor" :class="{maxmeun:$store.getters.changeMeunStatus==2}">企业招聘</div> </Col>
				<Col :xs="2" :sm="3" :md="3" :lg="3" :xl="2"><div @click="toCooperate(3)" class="deCursor" :class="{maxmeun:$store.getters.changeMeunStatus==3}">校企合作</div> </Col>
				<!-- <Col :xs="2" :sm="3" :md="3" :lg="3" :xl="2"><div @click="toResources(4)" class="deCursor" :class="{maxmeun:$store.getters.changeMeunStatus==4}">人才资源</div></Col> -->
				<Col :xs="2" :sm="3" :md="3" :lg="3" :xl="2"><div @click="toSetting(5)" class="deCursor" :class="{maxmeun:$store.getters.changeMeunStatus==4}">企业设置</div></Col>
				<Col :xs="2" :sm="2" :md="2" :lg="3" :xl="2"><div @click="exits(6)" class="deCursor" :class="{maxmeun:$store.getters.changeMeunStatus==5}">退出</div></Col>
			</div>
			<div class="smWidth">
				<div class="meunBtn" @click="showMeun=!showMeun">
					<Icon type="md-menu" size='40' color='black'/>
				</div>
				<div class="minMeun" v-show="showMeun">
					<Col :xs="24" :sm="24"><div @click="toIndex(1)" class="deCursor" :class="{maxmeun:$store.getters.changeMeunStatus==1}">首页</div> </Col>
					<Col :xs="24" :sm="24"><div @click="toqiye(2)" class="deCursor" :class="{maxmeun:$store.getters.changeMeunStatus==2}">企业招聘</div>  </Col>
					<Col :xs="24" :sm="24"><div @click="toCooperate(3)" class="deCursor" :class="{maxmeun:$store.getters.changeMeunStatus==3}">校企合作</div> </Col>
					<!-- <Col :xs="24" :sm="24"><div @click="toResources(4)" class="deCursor" :class="{maxmeun:$store.getters.changeMeunStatus==4}">人才资源</div></Col> -->
					<Col :xs="24" :sm="24"><div @click="toSetting(5)" class="deCursor" :class="{maxmeun:$store.getters.changeMeunStatus==4}">企业设置</div></Col>
					<Col :xs="24" :sm="24"><div @click="exits(6)" class="deCursor" :class="{maxmeun:$store.getters.changeMeunStatus==5}">退出</div></Col>
				</div>
			</div>
		</Row>
		<Modal
			v-model="modal1"
			title="提示"
			@on-ok="ok"
			@on-cancel="cancel">
			<p>确认退出？</p>
			<p></p>
			<p></p>
		</Modal>
	</div>
</template>

<script>
	import { exitLogin } from '@/api/company'
	export default{
		data(){
			return{
				showMeun:false,
				maxIndex:1,
				mIndex:0,
				arrmeun:['职位发布','应聘管理'],
				modal1: false
			};
		}, 
		created(){
			console.log(this.$store.getters.changeMeunStatus)
		},
		methods: {
			ok () {
				var that = this;
				this.$store.dispatch('logout').then(res => {
					console.log(res)
					that.$Message.success('退出成功');
					that.$router.push({ path: this.redirect || '/login' });
				})
				.catch(err => {
					console.log(err);
					that.$Message.error(err.msg);
				});
			},
			cancel () {
				
			},
			itemTo(index){
				console.log(index)
				switch (index){
					case 0:
					this.mIndex=index
					this.mIndex=index
					this.toInvite()
						break;
					case 1:
					this.mIndex=index
					this.mIndex=index
					this.toInviteManger()
						break;
					default:
						break;
				}
			},
			toIndex(index){
				this.maxIndex=index
				this.$router.push({
					path: '/index',
				});
			},
			toqiye(index){
				this.maxIndex=index
				this.$router.push({
					path: '/invite',
					
				});
			},
			
			toWriteInfo(index){
				this.$router.push({
					path:"/writeinfo"
				})
			},
			toCooperate(index){
				this.maxIndex=index
				this.$router.push({
					path:"/cooperate"
				})
			},
			toResources(index){
				this.maxIndex=index
				this.$router.push({
					path:"/resources"
				})
			},
			toSetting(index){
				this.maxIndex=index
				this.$router.push({
					path:"/setting"
				})
			},
			exits(index){
				this.maxIndex=index
				this.modal1=true
			}
		},
	}
</script>

<style scoped>
	
	
	.maxmeun{
		background-color: #45beff;
	}
	.MeunActive{
		background: #f3f3f3;
	}
	.colors{
		color: #515a6e !important;
	}
	.ivu-row{
		text-align: center;
		height: 70px;
		line-height: 70px;
		position: relative;
		
	}
	.header{
		height: 70px;
		line-height: 70px;
		padding: 0 40px;
		box-sizing: border-box;
		position: relative;
		background-color: #fff;
		box-shadow: 0 2px 6px #d9d9d9;
		margin-bottom: 20px;
	}
	.imgLogo{
		position: relative;
		top: 10px;
		width: 180px;
		min-width: 180px;
		height: 50px;
		line-height: 50px;
		border-radius: 4px;
		color: white;
		background-color: #fff;
		color: #353535;
		font-size: 22px;
		font-weight: bold;
		text-align: left;
		white-space: nowrap;
	}
	.logoBox{
		display: flex;
		align-items: center;
	}
	.smWidth{
		display: none;
	}
	
	.ivu-dropdown-rel a{
		width: 100%;
		display: inline-block;
	}
	.meunBtn{
		line-height: normal;
	}
	.mdWidth{
		font-size: 16px;
	}
	.smWidth{
		position: absolute;
		right: 0px;
		top: 0;
		bottom: 0;
		margin: auto 0;
		width: 60px;
		height: 40px;
	}
	.minMeun{
		position: absolute;
		width: 200px;
		background-color: #F7F9FC;
		border-radius: 8px;
		right: 0;
		z-index: 999;
		top: 50px;
		line-height: 45px;
		display: inline-block;
	}
	@media screen and (min-width:1200px) {
		.imgLogo{
			width: 300px;
			min-width: 300px;
		}
	}
	@media screen and (max-width:992px) {
		.header{
			padding: 0 30px;
		}
	}
	@media screen and (max-width:768px) {
		.mdWidth{
			display: none;
		}
		.smWidth{
			display: block;
		}
	}
</style>

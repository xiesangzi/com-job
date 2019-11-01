<template>
	<div class="cooperate">
		<tops  :content="{title:'校企合作'}"></tops>
		<div class="main">
			<div class="tops">
				<div class="addBtn" @click="toAddcoop()">+ 添加
				</div>
			</div>
			<div class="cooperateBody">
				<div class="coopList" v-for="(item,index) in coopList" :key="index">
					<div class="mainItem order">
						<div class="titItem">序号</div>
						<div>{{index+1}}</div>
					</div>
					<div class="mainItem schoolname">
						<div class="titItem">学校名称</div>
						<div>{{item.name}}</div>
					</div>
					<div class="mainItem address">
						<div class="titItem">学校地址</div>
						<div>{{item.address}}</div>
					</div>
					<div class="userinfo">
						<div class="mainItem">
							<div class="titItem user">联系人</div>
							<div>{{item.contact}}</div>
						</div>
						<div class="mainItem tel">
							<div class="titItem">联系电话</div>
							<div>{{item.tel}}</div>
						</div>
						<div class="mainItem email">
							<div class="titItem">邮箱</div>
							<div>{{item.email}}</div>
						</div>
					</div>
					<div class="mainItem do">
						<div class="titItem">操作</div>
						<div class="handle">
							<Button type="primary" @click="editInfo(item)">编辑</Button>
							<Button type="error" @click="delInfo(item.id)">删除</Button>
						</div>
					</div>
				</div>
			</div>
			
			<div class="popbg" v-show="popbgShow" @click="closePop()"></div>
			<div class="addcoop" v-show="popContShow">
				<div class="closepop" @click="closePop()">
					X
				</div>
				<Form label-position="top" ref="formValidate" :model="formValidate" :rules="ruleValidate">
					<FormItem label="学校名称" prop="name">
						<Input v-model="formValidate.name" size="large" placeholder="请输入学校名称"></Input>
					</FormItem>
					
					<FormItem label="学校地址" prop="address">
						<Input v-model="formValidate.address" size="large" placeholder="请输入学校地址"></Input>
					</FormItem>
					<FormItem label="联系人" prop="contact">
						<Input v-model="formValidate.contact" size="large" placeholder="请输入您的姓名" style="width: auto"></Input>
					</FormItem>
					<FormItem label="联系电话" prop="tel">
						<Input v-model="formValidate.tel" size="large" placeholder="请输入您的手机号"></Input>
					</FormItem>
					<FormItem label="邮箱" prop="email">
						<Input v-model="formValidate.email" size="large" placeholder="请输入您的邮箱"></Input>
					</FormItem>
					<FormItem>
						<Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
					</FormItem>
				</Form>
			</div>
		</div>
		<Modal
			v-model="modal1"
			title="提示"
			@on-ok="ok"
			@on-cancel="cancel">
			<p>确认删除？</p>
		</Modal>
	</div>
</template>

<script>
	import { cooperationList,addCooper,editCooper,delCooper } from '@/api/company'
	import tops from '../../components/top.vue'
	export default{
		components: {
			tops
		},
		data() {
			return {
				modal1: false,
				popId:'',
				popbgShow:false,
				popContShow:false,
				btnStatus:true,
				objId:'',
				curPage:1,
				curLimit:20,
				coopList:[],
				formValidate: {
						"contact": "",
						"name": "",
						"address": "",
						"tel": "",
						"email": ""
					},
				ruleValidate: {
					contact: [
						{ required: true, message: '名字不能为空', trigger: 'blur' }
					],
					email: [
						{ required: true, message: '邮箱不能为空', trigger: 'blur' },
						{ type: 'email', message: '格式不正确', trigger: 'blur' }
					],
					address: [
						{ required: true, message: '请填写所在城市', trigger: 'change' }
					],
					
					name: [
						{ required: true, message: '请输入学校名称', trigger: 'blur' }
					],
					
					tel: [
						{ required: true, message: '请输入您的手机号', trigger: 'blur' },
					],
					
				},
			}
		},
		created(){
			this.getEmployList()
		},
		methods: {
			getEmployList(){
				cooperationList({
					page:this.curPage,
					limit:this.curLimit
				}).then(res=>{
					if(res.success){
						console.log(res)
						if(res.data.rows&&res.data.rows.length>0){
							this.coopList=res.data.rows
						}
						
					}else{
						this.$Message['error']({
							background: true,
							content: res.msg
						});
					}
				})
			},
			toAddcoop(){
				this.popbgShow=true;
				this.popContShow=true;
				this.btnStatus=true;
			},
			closePop(){
				this.popbgShow=false;
				this.popContShow=false;
				this.btnStatus=false
				this.handleReset()
			},
			handleSubmit (name,) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						let tel=this.formValidate.tel
						var regphone=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
						var zuoji=/^([0-9]{3,4}-)?[0-9]{7,8}$/
						if(regphone.test(tel)||zuoji.test(tel)){
							console.log(999)
							if(this.btnStatus){
								addCooper(this.formValidate).then(res=>{
									if(res.success){
										console.log(res)
										this.$Message.success('添加成功');
										this.popbgShow=false;
										this.popContShow=false
										this.handleReset()
										this.getEmployList()

									}else{
										this.$Message['error']({
											background: true,
											content: res.msg
										});
									}
								})
							}else{
								console.log("xia")
								let objValue={
									contact:this.formValidate.contact,
									name:this.formValidate.name,
									address:this.formValidate.address,
									tel:this.formValidate.tel,
									email:this.formValidate.email,
									id:this.objId
								}
								console.log(objValue)
								editCooper(objValue).then(res=>{
									if(res.success){
										console.log(res)
										this.$Message.success('编辑成功');
										this.popbgShow=false;
										this.popContShow=false
										this.handleReset()
										this.getEmployList()
									}else{
										this.$Message['error']({
											background: true,
											content: res.msg
										});
									}
								})
							}
								
							
						}else{
							this.$Message.error('电话号码格式不正确！');
						}
					}
				})
			},
			editInfo(info){
				console.log(info)
				this.formValidate.contact=info.contact
				this.formValidate.name=info.name
				this.formValidate.address=info.address
				this.formValidate.tel=info.tel
				this.formValidate.email=info.email
				
				
				this.objId=info.id
				this.popbgShow=true;
				this.popContShow=true;
				this.btnStatus=false;
				
			},
			delInfo(id){
				this.modal1=true
				this.popId=id
			},
			ok () {
				delCooper({
					id:this.popId
				}).then(res=>{
					console.log(88888)
					if(res.success){
						console.log(res)
						this.$Message.success('删除成功');
						this.popbgShow=false;
						this.popContShow=false
						this.popId=''
						this.handleReset()
						this.getEmployList()
					}else{
						this.$Message['error']({
							background: true,
							content: res.msg
						});
					}
				})
			},
			cancel () {
				
			},
			handleReset (name) {
				this.formValidate={
						"contact": "",
						"name": "",
						"address": "",
						"tel": "",
						"email": ""
					}
			},
			
		},
	}
</script>

<style scoped>
	.cooperate{
		min-height: 1000px;
		background-color: #F2F2F2;
		min-width: 768px;
		padding-bottom: 50px;
	}
	
	.tops{
		border-bottom: 1px solid #F2F2F2;
		margin-bottom: 20px;
	}
	.cooperateBody{
		padding:  0 30px;
		
	}
	.addBtn{
		background-color: #62D4C9;
		padding: 0px 10px;
		text-align: center;
		height: 40px;
		width: 150px;
		line-height: 40px;
		border-radius: 6px;
		margin-bottom: 20px;
		margin-left: 30px;
		cursor: pointer;
	}
	.main{
		width: 90%;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 10px;
		padding: 20px 0px;
	}
	.coopList{
		display: flex;
		justify-content: space-between;
		padding-bottom: 10px;
		margin-bottom: 20px;
		border-bottom: 1px solid #F2F2F2;
	}
	.coopList >div{
		padding: 0 5px;
		box-sizing: border-box;
		
	}
	
	.coopList .user{
		min-width: 70px;
	}
	.coopList .schoolname{
		min-width: 90px;
	}
	.coopList >div:nth-of-type(1){
		width: 5%;
		min-width: 60px;
	}
	.coopList >div:nth-of-type(2){
		width: 15%;
	}
	.coopList >div:nth-of-type(3){
		width: 25%;
	}
	.coopList >div:nth-of-type(4){
		width: 40%;
	}
	.coopList >div:nth-of-type(5){
		width: 10%;
	}
	.address{
		min-width: 210px;
	}
	.tel{
		min-width: 110px;
	}
	.coopList .do{
		padding-right: 0;
	}
	.userinfo{
		display: flex;
	}
	.mainItem .titItem{
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10px;
	}
	.userinfo .mainItem{
		padding: 0 5px;
	}
	.handle{
		display: flex;
		justify-content: space-between;
		
	}
	.handle button{
		margin-bottom: 10px;
	}
	.handle button:first-of-type{
		margin-right: 8px;
	}
	.addcoop{
		position: fixed;
		width: 60%;
		height: 520px;
		min-width: 450px;
		top: 50%;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		padding: 20px 30px;
		border-radius: 10px;
		box-sizing: border-box;
		transform: translateY(-60%);
		background-color: #F7F9FC;
	}
	.popbg{
		width: 100%;
		min-width: 768px;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,0.4);
	}
	.closepop{
		position: absolute;
		top: 10px;
		right: 15px;
		width: 30px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		cursor: pointer;
	}
	.telphnoe{
		width: 100%;
		font-size: 16px;
		padding: 6px 7px;
		height: 40px;
	}
	.telphnoe:hover {
    border-color: #ed4014;
}
	@media (max-width:1460px) {
		.handle{
			display: inherit
		}
	}
	@media screen and (max-width:1200px) {
		.userinfo{
			display: block;
		}
		.coopList >div:nth-of-type(1){
			width: 5%;
		}
		.coopList >div:nth-of-type(2){
			width: 20%;
		}
		.coopList >div:nth-of-type(3){
			width: 30%;
		}
		.coopList >div:nth-of-type(4){
			width: 30%;
		}
		.coopList >div:nth-of-type(5){
			width: 15%;
		}
		.coopList .userinfo .titItem{
			margin-bottom: 0;
		}
		.coopList .userinfo .mainItem{
			margin-bottom: 10px;
		}
	}
	
</style>

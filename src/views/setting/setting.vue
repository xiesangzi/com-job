<template>
	<div class="settingBox">
		<tops :content="{title:'企业招聘'}"></tops>
		<div class="settingTop">
			<div v-for="(item,index) in childerMeun" :class="{childerMeunActive: index==childerMeunIndex}" @click="changeIndex(index)" :key="index" >{{item}}</div>
		</div>
		<div class="setting">
			<div class="meun1" v-show="meun1">
				<div class="showTop">
					<div class="top_l">基本信息</div>
					<div>
						<Button type="info" class="top_r" @click="toEditInfo()">编辑</Button>
					</div>
				</div>
				<div class="showList">
					<ul>
						<li>
							<div>
								<div class="title">姓名：</div>
								<div class="desc"><span>{{companyInfo.crtUserName}}</span><span v-show="companyInfo.tel">{{companyInfo.tel?companyInfo.tel:''}}</span>
								</div>
							</div>
						</li>
						<li>
							<div>
								<div class="title">团队介绍：</div>
								<div class="desc">
									{{companyInfo.introduction}}
								</div>
							</div>
						</li>
						<li>
							<div>
								<div class="title">公司名称：</div>
								<div class="desc">
									{{companyInfo.name}}
								</div>
							</div>
							
						</li>
					</ul>
					<div class="photo">
						<img :src="companyInfo.logo" />
					</div>
				</div>
				<div class="showTop">
					<div class="top_l">联系方式</div>
				</div>
				<div class="showList">
					<ul>
						<li>
							<div>
								<div class="title">微信：</div>
								<div class="desc"></div>
							</div>
						</li>
						<li>
							<div>
								<div class="title">常用邮箱：</div>
								<div class="desc">{{companyInfo.email}}</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="meun2" v-show="meun2">
				<div class="pop1"  v-show="showpop1">
					<div class="popcontent">
						<Form :model="formPassw" label-position="top" ref="formPassw" :rules="ruleformPassw">
							<Form-item label="当前密码:" prop="input1">
								<Input v-model="formPassw.input1" size="large" placeholder="请输入原密码"></Input>
							</Form-item>
							<Form-item label="新密码:" prop="input2">
								<Input v-model="formPassw.input2" size="large" placeholder="请输入新密码"></Input>
							</Form-item>
							<Form-item label="确认密码:" prop="input3">
								<Input v-model="formPassw.input3" size="large" placeholder="请输入再次输入密码">
								</Input>
							</Form-item>
						</Form>
						<div class="nextbootm">
							<Button type="primary" @click="handleformPassw('formPassw')">确定</Button>
						</div>
					</div>
				</div>
			</div>
			<div class="meun3" v-show="meun3">
				<div class="pop1"  v-show="showpop1">
					<div class="popcontent">
						<Form :model="formTop1" label-position="top" ref="formTop1" :rules="ruleformTop1">
							<Form-item label="当前主管理员" prop="input1">
								<Input v-model="formTop1.input1" disabled size="large" placeholder="请输入当前管理员"></Input>
							</Form-item>
							<Form-item label="手机号" prop="input2">
								<Input v-model="formTop1.input2" disabled size="large" placeholder="请输入手机号码"></Input>
							</Form-item>
							<Form-item label="验证码" prop="input3">
								<Input v-model="formTop1.input3" size="large" placeholder="请输入验证码">
									<span slot="append" class="getCodeBtn" @click="getCodes()" style="cursor: pointer;">获取验证码</span>
								</Input>
							</Form-item>
						</Form>
						<div class="nextbootm">
							<Button type="primary" @click="handleSubmit1('formTop1')">下一步</Button>
						</div>
					</div>
				</div>
				<div class="pop1" v-show="showpop2">
					<div class="popcontent">
						<Form :model="formTop2" label-position="top" ref="formTop2" :rules="ruleformTop2">
							<Form-item label="更换主管理员" prop="input1">
								<Input v-model="formTop2.input1" disabled size="large" placeholder="新管理员名称"></Input>
							</Form-item>
							<Form-item label="手机号" prop="input2">
								<Input v-model="formTop2.input2" size="large" placeholder="新手机号码"></Input>
							</Form-item>
							<Form-item label="验证码" prop="input3">
								<Input v-model="formTop2.input3" size="large" placeh请输入验证码>
									<span slot="append" class="getCodeBtn" @click="againCode()">获取验证码</span>
								</Input>
							</Form-item>
						</Form>
						<div class="nextbootm">
							<Button type="primary" @click="handleSubmit2('formTop2')">确认更换</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="popbg"  v-show="edit">
			<div class="editinfo" v-show="edit">
				<div class="iconClose" @click="closeEdit()">X</div>
				<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
					<FormItem label="企业logo：" prop="companylogo">
						<div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
							<template v-if="item.status === 'finished'">
								<img :src="item.url">
								<div class="demo-upload-list-cover">
									<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
									<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
								</div>
							</template>
							<template v-else>
								<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
							</template>
						</div>
						<Upload
							ref="upload"
							:show-upload-list="false"
							:default-file-list="defaultList"
							:on-success="handleSuccess"
							:format="['jpg','jpeg','png']"
							:max-size="2048"
							:on-format-error="handleFormatError"
							:on-exceeded-size="handleMaxSize"
							:before-upload="handleBeforeUpload"
							multiple
							type="drag"
							action="//jsonplaceholder.typicode.com/posts/"
							style="display: inline-block;width:58px;">
							<div style="width: 58px;height:58px;line-height: 58px;">
								<Icon type="camera" size="20"></Icon>
							</div>
						</Upload>
						<Modal title="查看图片" v-model="visible">
							<img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
						</Modal>
					</FormItem>
					
					<FormItem label="企业简介：" prop="companydesc">
						<Input v-model="formValidate.companydesc" maxlength="1600" :rows='10'
						show-word-limit type="textarea" placeholder="请输入企业简介..." />
					</FormItem>
					<FormItem>
						<Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
					</FormItem>
					
				</Form>
			</div>
		</div>
		
	</div>
</template>

<script>
	import store from "@/store"
	import { getCompany,getCode,checkCode,changeAdmin,getAdmin,editCompany } from '@/api/company'
	import tops from '../../components/top.vue'
	export default{
		components: {
			tops
		},
		data() {
			return {
				childerMeun:["企业简介","修改密码","变更管理员账号"],
				childerMeunIndex:0,
				edit:false,
				mainUser:{},
				meun1:true,
				meun2:false,
				meun3:false,
				companyInfo:'',
				formTop1: {
					input1: '',
					input2: '',
					input3: ''
				},
				formTop2: {
					input1: '',
					input2: '',
					input3: ''
				},
				formPassw: {
					input1: '',
					input2: '',
					input3: ''
				},
				ruleformTop1:{
					input1: [
						{ required: true, message: '请输入当前管理员', trigger: 'blur' }
					],
					input2: [
						{ required: true, message: '请输入手机号码', trigger: 'blur' }
					],
					input3: [
						{ required: true, message: '请输入验证码', trigger: 'change' }
					]
				},
				ruleformTop2:{
					input1: [
						{ required: true, message: '请输入新管理员名称', trigger: 'blur' }
					],
					input2: [
						{ required: true, message: '请输入手机号码', trigger: 'blur' }
					],
					input3: [
						{ required: true, message: '请输入验证码', trigger: 'change' }
					]
				},
				ruleformPassw:{
					input1: [
						{ required: true, message: '请输入原密码', trigger: 'blur' }
					],
					input2: [
						{ required: true, message: '请输入新密码', trigger: 'blur' }
					],
					input3: [
						{ required: true, message: '请输入再次输入密码', trigger: 'change' }
					]
				},
				showpop1:true,
				showpop2:false,
				
				defaultList: [],
				imgName: '',
				visible: false,
				uploadList: [],
				formValidate:{
					companyname:'',
					companydesc:'',
				},
				ruleValidate:{
					companydesc:[
						{ required: true, message: '请填写企业描述', trigger: 'blur' }
					]
				},
				maxdesc:1600, 
			}
		},
		created(){
			this.mainUserInfo()
			this.$store.commit("companyInfo",sessionStorage.getItem('companyId'))
		},
		mounted(){
			this.getCompanyInfo()
			this.uploadList = this.$refs.upload.fileList;
		},
		methods: {
			mainUserInfo(){
				getAdmin().then(res=>{
					if(res.success){
						console.log(res)
						this.formTop1.input1=res.data.admin
						this.formTop1.input2=res.data.phone
						this.formTop2.input1=res.data.admin
						this.mainUser=res.data
					}else{
						this.$Message['error']({
							background: true,
							content: res.msg
						});
					}
				})
			},
			changeIndex(index){
				console.log(index)
				if (index==0) {
					this.meun1=true
					this.meun2=false
					this.meun3=false
				} else if(index==1){
					this.meun1=false
					this.meun2=true
					this.meun3=false
					
				} else if(index==2){
					this.meun1=false
					this.meun2=false
					this.meun3=true
					this.showpop1=true
					this.showpop2=false
				}
				this.childerMeunIndex=index
			},
			toEditInfo(){
				this.edit=true;
				
				// this.$router.push({
				// 	path: '/editinfo',
				// 	
				// });
			},
			getCompanyInfo(){
				getCompany().then(res=>{
					if(res.success){
						this.companyInfo = res.data
						console.log(this.companyInfo)
						this.formValidate.companydesc=res.data.introduction
						sessionStorage.setItem('companyId', res.data.id);
						// sessionStorage.setItem('companytotal', res.data);
						this.$store.commit("companyInfo",sessionStorage.getItem('companyId'))
					}else{
						this.$Message['error']({
							background: true,
							content: res.msg
						});
					}
					
				})
			},
			getCodes(){
				let tel=this.formTop1.input2
				var regphone=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
				var zuoji=/^([0-9]{3,4}-)?[0-9]{7,8}$/
				if(regphone.test(tel)||zuoji.test(tel)){
					getCode({
						phoneNo:this.formTop1.input2
					}).then(res=>{
						if(res.success){
							console.log(res)
							this.$Message.success(res.msg);
						}else{
							this.$Message['error']({
								background: true,
								content: res.msg
							});
						}
					})
				}else{
					this.$Message.error('电话号码格式不正确！');
				}
			},
			againCode(){
				let tel=this.formTop1.input2
				var regphone=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
				var zuoji=/^([0-9]{3,4}-)?[0-9]{7,8}$/
				if(regphone.test(tel)||zuoji.test(tel)){
					getCode({
						phoneNo:this.formTop2.input2
					}).then(res=>{
						if(res.success){
							this.$Message.success(res.msg);
							console.log(res)
						}else{
							this.$Message['error']({
								background: true,
								content: res.msg
							});
						}
					})
				}else{
					this.$Message.error('电话号码格式不正确！');
				}
			},
			handleSubmit1 (name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						let tel=this.formTop1.input2
						var regphone=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
						var zuoji=/^([0-9]{3,4}-)?[0-9]{7,8}$/
						if(regphone.test(tel)||zuoji.test(tel)){
							checkCode({
								phoneNo:this.formTop1.input2,
								smsCode:this.formTop1.input3
							}).then(res=>{
								console.log(99999)
								if(res.success){
									this.showpop1=false
									this.showpop2=true
									console.log(res,"校验成功")
									
								}else{
									this.$Message['error']({
										background: true,
										content: res.msg
									});
								}
							})
						}else{
							this.$Message.error('电话号码格式不正确！');
						}
						
					} else {
						this.$Message.error('Fail!');
					}
				})
			},
			handleSubmit2 (name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						let tel=this.formTop2.input2
						var regphone=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
						var zuoji=/^([0-9]{3,4}-)?[0-9]{7,8}$/;
						if(regphone.test(tel)||zuoji.test(tel)){
							changeAdmin({
								openId:this.mainUser.openId,
								phoneNo:this.formTop2.input2,
								smsCode:this.formTop2.input3
							}).then(minres=>{
								if(minres.success){
									this.$Message.success('修改成功！');
								}else{
									this.$Message.error(minres.msg);
								}
							})
						}else{
							this.$Message.error('电话号码格式不正确！');
						}
					} else {
						this.$Message.error('Fail!');
					}
				})
			},
			handleformPassw(name){
				this.$refs[name].validate((valid) => {
					if (valid) {
						console.log(1)
					} else {
						this.$Message.error('Fail!');
					}
				})
			},
			// 编辑
			handleSubmit (name) {
				console.log( this.$refs[name])
				this.$refs[name].validate((valid) => {
					console.log(valid)
					if (valid) {
						editCompany({
							"id":this.$store.getters.companyId,
							"logo":"123",
							"introduction":this.formValidate.companydesc
						}).then(res=>{
							if(res.success){
								this.edit=false
								console.log(res)
							}else{
								this.$Message['error']({
									background: true,
									content: res.msg
								});
							}
						})
					}
				})
			},
			closeEdit(){
				this.edit=false
			},
			handleReset (name) {
				this.$refs[name].resetFields();
			},
			handleView (name) {
				this.imgName = name;
				this.visible = true;
			},
			handleRemove (file) {
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
			},
			handleSuccess (res, file) {
				file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
				file.name = '7eb99afb9d5f317c912f08b5212fd69a';
			},
			handleFormatError (file) {
				this.$Notice.warning({
					title: 'The file format is incorrect',
					desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
				});
			},
			handleMaxSize (file) {
				this.$Notice.warning({
					title: 'Exceeding file size limit',
					desc: 'File  ' + file.name + ' is too large, no more than 2M.'
				});
			},
			handleBeforeUpload () {
				const check = this.uploadList.length < 5;
				if (!check) {
					this.$Notice.warning({
						title: 'Up to five pictures can be uploaded.'
					});
				}
				return check;
			}
			
			
			
		},
	}
</script>

<style scoped>
	.popcolor{
		background-color: rgba(0,0,0,0.4);
	}
	.settingTop{
		text-align: center;
	}
	.settingTop >div{
		display: inline-block;
		margin: 0 25px;
		padding: 15px 0;
		cursor: pointer;
	}
	.childerMeunActive{
		color: #1890ff;
		border-bottom: 2px solid #1ba5fa;
	}
	.pop1{
		width: 650px;
		background-color: #fff;
		border-radius: 15px;
		padding: 10px;
		margin: 0 auto;
	}
	.popcontent{
		height: 100%;
		width: 100%;
		background-color: #fff;
		border-radius: 15px;
		padding: 20px;
	}
	
	/* 主体 */
	.settingBox{
		background-color: #f5f5f5;
		padding-bottom: 50px;
		min-height: 1000px;
	}
	.setting{
		width: 90%;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 10px;
		padding-bottom: 30px;
	}
	.showTop{
		height: 70px;
		line-height: 70px;
		border-bottom: 1px solid #CCCCCC;
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		padding: 0 10px;
		box-sizing: border-box;
	}
	.showList{
		margin-bottom: 25px;
		position: relative;
	}
	.photo{
		position: absolute;
		top: 5px;
		right: 30px;
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}
	.photo img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	li{
		padding: 0 20px;
		margin-bottom: 15px;
		width: 88%;
	}
	li >div{
		display: flex;
	}
	li .title{
		color: grey;
		width: 100px;
		min-width: 100px;
	}
	.welfare{
		
	}
	li .desc{
		color: #353535;
	}
	.desc >span{
		display: inline-block;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		/* background-color: #F2F2F2; */
		border-radius: 15px;
		margin-right: 10px;
		margin-bottom: 10px;
	}
	.comImg{
		width: 100px;
		height: 100px;
		border-radius: 10px;
		margin-right: 20px;
	}
	.comImg img{
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}
	.descText{
		color: grey;
	}
	.descTit span{
		padding-right: 15px;
		border-right: 1px solid grey;
		margin-right: 15px;
	}
	.descTit span:last-of-type{
		padding-right: 0;
		margin-right: 0;
		border-right: none;
		
	}
	li .comDesc{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 10px 0;
		box-sizing: border-box;
	}
	.comBox{
		padding-bottom: 35px;
	}
	.nextbootm{
		text-align: right;
	}
	.getCodeBtn{
		padding: 0 10px;
		cursor: pointer;
	}
	.popbg{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.4);
	}
	.editinfo{
		width: 80%;
		height: 400px;
		border-radius: 10px;
		padding: 10px;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		background-color: #F5F5F5;
		max-width: 800px;
	}
	.iconClose{
		width: 30px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		position: absolute;
		top: 10px;
		right:15px;
		cursor: pointer;
		z-index: 10;
	}
</style>

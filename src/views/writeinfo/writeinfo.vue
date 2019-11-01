<template>
	<div class="writeInfo">
		<!-- <tops :content="{title:'企业认证'}"></tops> -->
		<div class="infoMain">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
				<FormItem label="企业名称：" prop="name">
					<Input v-model="formValidate.name" size="large" placeholder="请输入职位名称"></Input>
				</FormItem>
				<FormItem label="企业logo：" prop="logo"> 
					<div class="demo-upload-list" v-for="(item,index) in uploadList" v-bind:key="index">
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
				
				<FormItem label="企业简介：" prop="introduction">
		<Input type="textarea" placeholder="请输入内容..." :rows='10'  maxlength="maxdesc" v-model="formValidate.introduction"
		></Input>
						<span class="num">{{formValidate.introduction.length}}/{{maxdesc}}</span>
				</FormItem>
				<FormItem label="法人代表：" prop="legal">
					<Input v-model="formValidate.legal" size="large" placeholder="请输入法人姓名"></Input>
				</FormItem>
				<FormItem label="营业执照：" prop="permit">
					<Input v-model="formValidate.permit" size="large" placeholder="请输入营业执照"></Input>
				</FormItem>
				<FormItem label="详细地址：" prop="address">
					<Input v-model="formValidate.address" size="large" placeholder="请输入企业地址"></Input>
				</FormItem>
				
				
				<FormItem label="企业邮箱：" prop="email">
					<Input v-model="formValidate.email" size="large" placeholder="请输入您的邮箱"></Input>
				</FormItem>
				<FormItem label="联系电话：" prop="tel">
					<Input v-model="formValidate.tel" size="large" placeholder="请输入您的手机号"></Input>
				</FormItem>
				<FormItem label="所在城市：" prop="city">
					<Input v-model="formValidate.city" size="large" placeholder="请选择所在城市"></Input>
				</FormItem>
				
				<FormItem>
					<Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
				</FormItem>
			</Form>
			
			
			<Modal
				v-model="modal1"
				title="Common Modal dialog box title"
				@on-ok="ok"
				@on-cancel="cancel">
				<p>Content of dialog</p>
				<p>Content of dialog</p>
				<p>Content of dialog</p>
			</Modal>
		</div>
	</div>
</template>

<script>
	import { submitCompany } from '@/api/company'

	export default{
		components: {
		},
		data () {
			
			return {
				animal: '爪哇犀牛', modal1: false,
				formValidate: {
						"id":'',
						"type":"企业",
						"name":"",
						"logo":"",
						"permit":"",
						"legal":"",
						"city":"",
						"email":"",
						"tel":"",
						"address":"",
						"introduction":"",
					},
				ruleValidate: {
					legal: [
						{ required: true, message: '法人不能为空', trigger: 'blur' }
					],
					email: [
						{ required: true, message: '邮箱不能为空', trigger: 'blur' },
						{ type: 'email', message: '格式不正确', trigger: 'blur' }
					],
					city: [
						{ required: true, message: '请填写所在城市', trigger: 'change' }
					],
					gender: [
						{ required: true, message: '请选择性别', trigger: 'change' }
					],
					name: [
						{ required: true, message: '请输入职业名称', trigger: 'blur' }
					],
					
					introduction: [
						{ required: true, message: '请输入企业简介', trigger: 'blur' }
					],
					tel: [
						{ required: true, message: '请输入您的手机号', trigger: 'blur' },
					],
					permit:[
						{ required: true, message: '请输入营业执照', trigger: 'blur' }
					],
					address:[
						{ required: true, message: '请填写详细地址', trigger: 'blur' }
					]
				},
				defaultList: [
					{
						'name': 'a42bdcc1178e62b4694c830f028db5c0',
						'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
					}
				],
				imgName: '',
				visible: false,
				uploadList: [],
				txtVal: 0,
				desc:'',
				maxdesc:1600

			}
			
		},
		methods: {
			handleSubmit (name) {
				this.$refs[name].validate((valid) => {
					console.log(valid)
					if (valid) {
						submitCompany(this.formValidate).then(res=>{
							if(res.success){
								console.log(res)
								this.$Message.success('认证成功！');
								this.$router.go(-1)
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
			handleReset (name) {
				this.$refs[name].resetFields();
			},
			backBefore(){
				this.$router.go(-1)
			},
			handleView (name) {
				this.imgName = name;
				this.visible = true;
			},
			handleRemove (file) {
				// 从 upload 实例删除数据
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
			},
			handleSuccess (res, file) {
				// 因为上传过程为实例，这里模拟添加 url
				file.url = 'https://zdqxx.hungekeji.com/api/v1/common/uploadfile';
				file.name = '7eb99afb9d5f317c912f08b5212fd69a';
			},
			handleFormatError (file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
				});
			},
			handleMaxSize (file) {
				this.$Notice.warning({
					title: '超出文件大小限制',
					desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
				});
			},
			handleBeforeUpload () {
				const check = this.uploadList.length < 5;
				if (!check) {
					this.$Notice.warning({
						title: '最多只能上传 5 张图片。'
					});
				}
				return check;
			},
			ok () {
				
			},
			cancel () {
				this.$Message.info('Clicked cancel');
			}
			
		},
		created(){
			this.$store.commit("companyInfo",sessionStorage.getItem('companyId'))
			console.log(this.$store.getters.companyId)
			this.formValidate.id=this.$store.getters.companyId

		},
		mounted () {
			
		}
	}
</script>

<style scoped>
	.writeInfo{
		min-height: 1000px;
		background-color: #F2F2F2;
		padding: 30px 0;
	}
	.infoMain{
		width: 80%;
		margin: 0 auto;
		min-width: 996px;
		background-color: #fff;
		padding: 30px 30px;
		box-sizing: border-box;
		border-radius: 10px;
		padding-top: 45px;
	}
	
	
	/* 上传图片 */
	.demo-upload-list{
		display: inline-block;
		width: 100px;
		height: 60px;
		text-align: center;
		line-height: 60px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0,0,0,.2);
		margin-right: 4px;
	}
	.demo-upload-list img{
		width: 100%;
		height: 100%;
	}
	.demo-upload-list-cover{
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0,0,0,.6);
	}
	.demo-upload-list:hover .demo-upload-list-cover{
		display: block;
	}
	.demo-upload-list-cover i{
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;
	}
	/* 动态文本框 */
	
.letter_wirter{
	position: relative;
	width: 100%;
	height: auto;
	overflow: hidden;
}
textarea {
	width: 100%;
	height: 10rem;
	padding: 5px;
	padding-bottom: 30px;
	box-sizing: border-box;
}
.num {
	position: absolute;
	bottom: 0px;
	right: 10px;
}
</style>

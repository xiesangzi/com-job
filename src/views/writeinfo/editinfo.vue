<template>
	<div class="editinfo">
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
				<Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
			</FormItem>
			
		</Form>
	</div>
</template>

<script>
	import store from "@/store"
	import { getCompany,editCompany } from '@/api/company'
	export default{
		data() {
			return {
				defaultList: [
				],
				imgName: '',
				visible: false,
				uploadList: ['https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=vue%E5%9B%BE%E7%89%87&hs=2&pn=1&spn=0&di=3630&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=133741278%2C446040173&os=3932280503%2C1443184643&simid=3527356129%2C464672558&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=vue%E5%9B%BE%E7%89%87&objurl=http%3A%2F%2Fimgup04.iefans.net%2Fiefans%2F2019-03%2F07%2F13%2F15519377783670_1.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Btjuwgf_z%26e3BgjpAzdH3FwAzdH3Fend0c9c_z%26e3Bip4s&gsm=&islist=&querylist='],
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
				companyInfo:{}
			}
		},
		methods: {
			handleSubmit (name) {
				console.log( this.$refs[name])
				this.$refs[name].validate((valid) => {
					console.log(valid)
					if (valid) {
						editCompany({
							"id":this.$store.getters.companyId,
							"logo":"",
							"introduction":this.formValidate.companydesc
						}).then(res=>{
							if(res.success){
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
		mounted () {
			this.uploadList = this.$refs.upload.fileList;

		},
		created(){
			this.$store.commit("companyInfo",sessionStorage.getItem('companyId'))

		}
		
	}
</script>

<style scoped>
	.editinfo{
		width: 80%;
		margin: 0 auto;
		padding-top: 50px;
	}
	.demo-upload-list{
		display: inline-block;
		width: 60px;
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
	.num {
		position: absolute;
		bottom: 0px;
		right: 10px;
	}
</style>

<template>
	<div class="addBox">
		<tops :content="{title:'职位发布'}"></tops>
		<div class="Top">
			<Button type="info">请添加职位信息：</Button>
			<Button @click="backup()">返回</Button>
		</div>
		<div class="main">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="left">
				<div class="addTop">
					<div class="num">1</div>
					<div class="desc">
						<div class="descTit">职位基本信息</div>
						<div class="descText">加*内容，在确认发布成功后，将无法修改</div>
					</div>
				</div>
				<div class="addMain">
					<Form-item label="公司：" prop="companyName">
						<Input v-model="formValidate.companyName" size="large" placeholder="请输入公司名称" value="无·互联网·个人开发团队"></Input>
					</Form-item>
					<Form-item label="职位名称：" prop="jobTitle">
						<Input v-model="formValidate.jobTitle" size="large" placeholder="请输入职位名称"></Input>
					</Form-item>
					<FormItem label="工作城市：" prop="workCity">
						<Select v-model="formValidate.workCity" placeholder="请选择工作城市" size="large">
							<Option value="贵阳市">贵阳市</Option>
							<Option value="上海">上海</Option>
						</Select>
					</FormItem>
					<FormItem label="工作地点：" prop="workPlace">
						<Select v-model="formValidate.workPlace" placeholder="请选择工作地点" size="large">
							<Option value="观山湖区滨湖俊园">观山湖区滨湖俊园</Option>
							<Option value="shanghai">London</Option>
							<Option value="shenzhen">Sydney</Option>
						</Select>
					</FormItem>
				</div>
				<div class="addTop">
					<div class="num">2</div>
					<div class="desc">
						<div class="descTit">职位要求</div>
						<div class="descTit">我们将通过以下条件，为您精确推荐合适的牛人，请尽量详细填写</div>
					</div>
				</div>
				<div class="addMain">
					<FormItem label="经验：" prop="workExperience">
						<Row>
							<Col span="12">
								<Select v-model="formValidate.workExperience" filterable size="large">
									<Option v-for="item in workExperience_v" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</Select>
							</Col>
						</Row>
					</FormItem>
					<FormItem label="学历：" prop="education">
						<Row>
							<Col span="12">
								<Select v-model="formValidate.education" filterable size="large">
									<Option v-for="item in education_v" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</Select>
							</Col>
						</Row>
					</FormItem>
					
					<FormItem label="薪资范围：" prop="salary">
						<Row>
							<Col span="12">
								<Select v-model="salary" @on-change="salaryChange" placeholder="请选择薪资范围" size="large">
									<Option value="1-3K">1-3K</Option>
									<Option value="4-6K">4-6K</Option>
									<Option value="8-10K">8-10K</Option>
									<Option value="10K以上">10K以上</Option>
								</Select>
							</Col>
						</Row>
						
					</FormItem>
					<Form-item label="职位描述：" prop="jobDescription">
						<Input v-model="formValidate.jobDescription" maxlength="1600" show-word-limit type="textarea" :rows="12" placeholder="请输入职位描述" size="large" />
					</Form-item>
					<Form-item label="日期：" prop="date">
						<DatePicker type="date" format="yyyy-MM-dd"  @on-change='releaseDateChange' size="large" v-model="formValidate.releaseDate" show-week-numbers placeholder="请选择发布日期" style="width: 200px"></DatePicker>
						-
						<DatePicker type="date" format="yyyy-MM-dd" @on-change='closedDateChange' v-model="formValidate.closedDate" size="large" show-week-numbers placeholder="请选择关闭日期" style="width: 200px"></DatePicker>
					</Form-item>
				</div>
				<div class="addMain">
					<div class="tips">
						简历将发送到<span>12432323445@qq.com</span>,如需更改邮箱，请在『<span>个人资料</span>』中修改
					</div>
					<div class="submitBox">
						<Button v-if="!queryData" class="submit" @click="handleSubmit('formValidate')">发布</Button>
						<Button v-else class="submit" @click="handleSubmit('formValidate')">提交修改</Button>
					</div>
				</div>
			</Form>
		</div>
	</div>
</template>

<script>
	
	import { addJob,editJob } from '@/api/company'
	import tops from '../../components/top.vue'
	export default{
		components: {
			tops
		},
		data(){
			return{
				salary:'',
				formValidate:{
					"companyName":"",
					"jobTitle":"",
					"workCity":"",
					"workPlace":"",
					"workExperience":"",
					"education":"",
					"salaryMin":"",
					"salaryMax":"",
					"jobDescription":"",
					"releaseDate":"",
					"closedDate":"",
					// "typePosition":''
				},
				ruleValidate:{
					companyName: [
						{ required: true, message: '请输入公司名称', trigger: 'blur' }
					],
					jobTitle: [
						{ required: true, message: '请输入职位名称', trigger: 'blur' }
					],
					workCity:[
						{required:true,message:'请选择工作城市',trigger:'change'}
					],
				},
				workExperience_v: [
					{
						value: '无经验',
						label: '无经验'
					},
					{
						value: '1-3年',
						label: '1-3年'
					},
					{
						value: '4-6年',
						label: '4-6年'
					},
					{
						value: '7-10年',
						label: '7-10年'
					}
				],
				education_v: [
					
					{
						value: '高中',
						label: '高中'
					},
					{
						value: '中专',
						label: '中专'
					},
					{
						value: '大专',
						label: '大专'
					},
					{
						value: '本科',
						label: '本科'
					},
					{
						value: '研究生',
						label: '研究生'
					},
					{
						value: '博士',
						label: '博士'
					}
				],
				model11: '',
				model12: [],
				queryData:{}
			}
		},
		created(){

		},
		mounted() {
			if(this.$route.query.item){
				let item=JSON.parse(this.$route.query.item)
				console.log(item)
				this.queryData=item
				this.wacthQuery(item)
			}
			
		},
		methods: {
			wacthQuery(item){
				this.formValidate.companyName=item.companyName
				this.formValidate.jobTitle=item.jobTitle
				this.formValidate.workCity=item.workCity
				this.formValidate.workPlace=item.workPlace
				this.formValidate.workExperience=item.workExperience
				this.formValidate.education=item.education
				this.formValidate.salaryMin=item.salaryMin
				this.formValidate.salaryMax=item.salaryMax
				this.formValidate.jobDescription=item.jobDescription
				this.formValidate.releaseDate=item.releaseDate
				this.formValidate.closedDate=item.closedDate;
				this.salary=item.salaryMin/1000+"-"+item.salaryMax/1000+"K";
				console.log(this.salary)
			},
			handleSubmit (name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						if(!this.$route.query.item){
							addJob(this.formValidate).then(res=>{
								if(res.success){
									console.log(res)
									this.$Message.success('添加成功');
									this.$router.go(-1)
								}else{
									this.$Message['error']({
										background: true,
										content: res.msg
									});
								}
							})
						}else{

							editJob(
							{
								"id":this.queryData.id,
								"companyName":this.formValidate.companyName,
								"jobTitle":this.formValidate.jobTitle,
								"workCity":this.formValidate.workCity,
								"workPlace":this.formValidate.workPlace,
								"workExperience":this.formValidate.workExperience,
								"education":this.formValidate.education,
								"salaryMin":this.formValidate.salaryMin,
								"salaryMax":this.formValidate.salaryMax,
								"jobDescription":this.formValidate.jobDescription,
								"releaseDate":this.formValidate.releaseDate,
								"closedDate":this.formValidate.closedDate,
								
							}).then(res=>{
								if(res.success){
									console.log(res)
									this.$Message.success('编辑成功');
									this.$router.go(-1)

								}else{
									this.$Message['error']({
										background: true,
										content: res.msg
									});
								}
								
							})
						}
						
					}else{
						this.$Message['error']({
							background: true,
							content: "信息未填写完整"
						});
					}
				})
			},
			handleReset (name) {
				this.$refs[name].resetFields();
			},
			releaseDateChange(e){
				console.log(e)
				this.formValidate.releaseDate=e
				console.log(this.formValidate)

			},
			closedDateChange(e){
				this.formValidate.closedDate=e
			},
			salaryChange(e){
				console.log(e)
				let arr=e.replace("K",'').split('-')
				console.log(arr)
				this.formValidate.salaryMin= parseInt(arr[0])*1000
				this.formValidate.salaryMax= parseInt(arr[1])*1000
			},
			backup(){
				this.$router.go(-1)
			}
			
			
		},
	}
</script>

<style scoped>
	
	.Top{
		width: 80%;
		margin: 0 auto;
		height: 60px;
		line-height: 60px;
		background-color:  #F7F9FC;
		padding: 0 20px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0px;
		border-bottom: 1px solid #DDDDDD;
	}
	.addBox{
		background-color: #F2F2F2;
		padding-bottom: 50px;
	}
	.main{
		width: 80%;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 10px;
		padding: 0 20px;
	}
	.addTop{
		display: flex;
		align-items: center;
		margin-bottom: 30px;
		padding-top: 20px;
	}
	.addMain{
		padding: 0 30px;
		box-sizing: border-box;
	}
	.num{
		color: #62D4C9;
		font-size: 60px;
		padding-right: 15px;
	}
	.descTit{
		color: #353535;
		font-weight: bold;
	}
	.descText{
		color: #666666;
	}
	
	
	
	
	.tips{
		color: #666666;
		font-size: 15px;
	}
	.tips span{
		color: #353535;
		font-weight: bold;
		padding: 0 5px;
	}
	.submitBox{
		padding-top: 20px;
		padding-right: 15%;
		padding-bottom: 100px;
		text-align: right;
	}
	.submit{
		width: 120px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		background-color: #62D4C9;
		color: #fff;
		border: none;
		outline: none;
	}
	.submit:hover{
		background-color: #62D4C8;
		color: white;
	}
	
	.ivu-form-item{
		margin-bottom: 30px !important;
	}
</style>

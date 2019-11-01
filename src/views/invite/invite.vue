<template>
	<div class="inviteBox">
		<tops :content="{title:'企业招聘'}"></tops>
		<div class="settingTop">
			<div v-for="(item,index) in arrmeun" :class="{childerMeunActive: index==childerMeunIndex}" @click="changeIndex(index)" :key="index" >{{item}}</div>
		</div>
		<div class="main">
			<div class="inviteTop">
				<div class="addBtn" @click="toAddinvite()">+ 发布职位</div>
			</div>
			<div class="inviteBody">
				<ul>
					<li v-for="(item,index) in jobListInfo" v-bind:key="index">
						<div class="jobBox">
							<div class="jobLeft">
								<div class="myOrder">{{index+1}}</div>
								<div class="orderItem">
									<div class="title">{{item.jobTitle}} <span></span> </div>
									<div class="minInfo"><span>{{item.workCity}}</span><span>{{item.workExperience}}</span>
									<span>{{item.education}}</span><span>{{item.salaryMin/1000}}-{{item.salaryMax/1000}}K</span> </div>
								</div>
							</div>
							<div class="jobRight">
								<div class="r_item3">
									<div class="timer">{{item.releaseDate.split(" ")[0]}} 发布</div>
									
									<div class="editmsg" @click="toItemAddinvite(item)"><Button type="info">编辑</Button></div>
									<i-switch size="large"  v-model="item.status" @on-change="change(item.id,$event)" style="min-width: 56px;">
										<span slot="open">ON</span>
										<span slot="close">OFF</span>
									</i-switch>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		
	</div>
</template>

<script>
	import { jobList,jobStatus } from '@/api/company'

	import tops from '../../components/top.vue'
	export default{
		components: {
			tops
		},
		data() {
			return {
				arrmeun:['职位发布','应聘管理','我的收藏'],
				childerMeunIndex:0,
				curPage:1,
				curLimit:20,
				jobListInfo:[],
				statusSwitch:false
			}
		},
		
		methods: {
			toAddinvite() {
				this.$router.push({
					path:"/addinvite"
				})
			},
			toItemAddinvite(item){
				this.$router.push({
					path:"/addinvite",
					query: {
						item: JSON.stringify(item)
					}
				})
			},
			changeIndex(index){
				console.log(index)
				if (index==0) {
					this.$router.push({
						path: '/invite'
					});
				} else if(index==1){
					this.$router.push({
						path:'/invitemanger'
					})
				}else if(index==2){
					this.$router.push({
						path:'/resumecollect'
					})
				}
				this.childerMeunIndex=index
			},
			getJobList(){
				jobList({
					page:this.curPage,
					limit:this.curLimit
				}).then(res=>{
					if(res.success){
						console.log(res)
						let arr=res.data.rows;
						for (let i=0;i<arr.length;i++) {
							if(arr[i].status==0){
								arr[i].status=false
							}else{
								arr[i].status=true
							}
						}
						this.jobListInfo=arr
					}else{
						this.$Message['error']({
							background: true,
							content: res.msg
						});
					}
				})
			},
			change (id,event) {
				console.log(id)
				console.log(event)
				let status=0;
				if(event){
					status=1
				}
				jobStatus({
					id:id
				},{
					status:status
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
		},
		created(){
			this.getJobList()
		},
		computed: {
			name() {
				return false
			}
		},
		
	}
</script>

<style scoped>
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
	li{
		list-style: none;
	}
	.main{
		padding: 0 20px;
	}
	.inviteBox{
		min-height: 1000px;
		background-color: #F2F2F2;
		padding-bottom: 50px;
		box-sizing: border-box;
	}
	.inviteTop{
		height: 60px;
		line-height: 60px;
		background-color:  #F7F9FC;
		padding: 0 20px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.addBtn{
		background-color: #62D4C9;
		padding: 0px 35px;
		height: 40px;
		line-height: 40px;
		border-radius: 6px;
		cursor: pointer;
	}
	.jobLeft{
		display: flex;
		align-items: center;
	}
	.myOrder{
		font-size: 20px;
		padding-right: 25px;
		display: inline-block;
	}
	.rightInfo{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.rightInfo>div{
		margin-right: 30px;
	}
	.inputBox{
		width: 260px;
		height: 30px;
		position: relative;
	}
	.inputBox input{
		width: 100%;
		height: 30px;
		padding: 5px 10px;
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 0;
	}
	.inputBox i{
		position: absolute;
		width: 12px;
		height: 12px;
		top: 0;
		bottom: 0;
		right: 10px;
		margin:  0 auto;
		
	}
	.classes,.status{
		color: #353535;
		padding-right: 10px;
	}
	.status{
		margin-right: 0;
	}
	.inviteBody ul{
		padding-bottom: 10px;
	}
	.inviteBody li{
		border-bottom: 2px solid #F2F2F2;
	}
	.inviteBody .jobBox{
		padding: 20px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
	}
	
	.title{
		font-size: 22px;
		color: #353535;
		margin-bottom: 8px;
	}
	.minInfo span{
		font-size: 16px;
	}
	.minInfo span{
		color: #666666;
		font-size: 16px;
		margin-top: 10px;
		padding-left: 10px;
		margin-left: 10px;
		border-left: 1px solid #CAD3E1;
	}
	.minInfo span:first-of-type{
		padding-left: 0px;
		margin-left: 0px;
		border: none;
	}
	.jobRight{
		display: flex;
		color: #666666;
		text-align: right;
	}
	.r_item3{
		display: flex;
		justify-content: space-between;
		align-items: center;
		
	}
	.r_item3 div:not(.timer){
		color: #62D4C9;
	}
	.r_item3 >div{
		padding-left: 15px;
		font-size: 16px;
	}
	.timer{
		color: #666666;
	}
	.editmsg{
		margin-right: 15px;
	}
</style>

<template>
	<div class="inviteBox">
		<tops :content="{title:'企业招聘'}"></tops>
		<div class="settingTop">
			<div v-for="(item,index) in arrmeun" :class="{childerMeunActive: index==childerMeunIndex}" @click="changeIndex(index)" :key="index" >{{item}}</div>
		</div>
		<div class="main">
			<div class="inviteTop">
				<div class="addBtn">应聘管理列表</div>
			</div>
			<div class="inviteBody">
				<ul>
					<li v-for="(item,index) in employListInfo" v-bind:key="index">
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
								<div class="r_item1">
									{{item.applicantTotal}}人查看我的岗位 
								</div>
								<div class="r_item2">
									{{item.waitingTotal}}待处理 
								</div>
								<div class="r_item3">
									<div class="timer">{{item.releaseDate.split(" ")[0]}} 发布</div>
								</div>
								<div class="edits">
									<Button type="info" @click="toUserList(item.id)">查看投简人</Button>
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
	import { employList,employUserList } from '@/api/company'

	import tops from '../../components/top.vue'
	export default{
		components: {
			tops
		},
		data() {
			return {
				arrmeun:['职位发布','应聘管理','我的收藏'],
				childerMeunIndex:1,
				curPage:1,
				curLimit:20,
				employListInfo:[],
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
			toUserList(id){
				this.$router.push({
					path:"/queryuser",
					query:{
						id:id
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
				employList({
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
						this.employListInfo=arr
					}else{
						this.$Message['error']({
							background: true,
							content: res.msg
						});
					}
				})
			},
			
			
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
		padding: 30px 20px;
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
		justify-content: space-between;
		align-items: center;
		color: #666666;
	}
	.jobRight >div{
		padding: 0 12px;
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
		font-size: 16px;
	}
	.timer{
		color: #666666;
	}
	.editmsg{
		margin-right: 15px;
	}
</style>

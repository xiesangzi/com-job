<template>
	<div class="indexBox">
		<tops :content="{title:'首页'}"></tops>
		<div class="body">
			<div class="bodyLeft">
				<div class="comIconBox">
					<div class="item1">
						<div class="comimg">
							<img :src="companyInfo.permit" />
						</div>
						<div class="comname">{{companyInfo.name}}</div>
					</div>
					<div class="item2">
						<div class="infoList">
							
							<div class="before">所在城市：</div>
							<div class="after">{{companyInfo.city}}</div>
						</div>
						<div class="infoList">
							<div>联系电话：</div>
							<div>+{{companyInfo.tel}}</div>
						</div>
						<div class="infos">
							<div>企业简介：</div>
							<div>{{companyInfo.introduction}}</div>
						</div>
					</div>
					<div class="item3">
						<div class="submitbox">
							<div class="submit" @click="toWriteInfo(companyInfo.status)">
								<span v-if="companyInfo.status==0">企业认证</span>
								<span v-else>已认证</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="bodyRight">
				<div class="innerBox">
					<div class="showImg">
						<img :src="logoName" />
					</div>
					<div class="detailsBox">
						<div class="detLeft">
							<div class="sendTop" @click="toInvite()">
								<div>我发布的</div>
								<div>查看更多 >></div>
							</div>
							<ul class="workItem">
								<li v-for="(item,index) in jobListInfo" :key="index">
									<div class="workContent">
										<div class="worktit">
											<div>{{item.jobTitle}}</div>
											<div>{{item.companyName}}</div>
										</div>
										<div class="limit">
											<div>{{item.salaryMin/1000}}-{{item.salaryMax/1000}}K</div>
											<div>
												<span>{{item.workCity}}</span>
												<span>{{item.workExperience}}</span>
												<span>{{item.education}}</span>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div class="detRight">
							<div class="sendTop">
								<div>我收到的</div>
								<div>查看更多 >></div>
							</div>
							<ul class="workItem">
								<li v-for="(item,index) in rightList" :key="index">
									<div class="workContentRight">
										<div class="touxiang">
											<img :src="item.headPortrait" v-if="item.headPortrait"/>
											<img :src="man" v-else-if="item.sex=='男'"/>
											<img :src="famle" v-else/>
										</div>
										<div class="rightBox">
											<div class="worktitright">
												<div class="bold hieght1">{{item.name}}</div>
												<div class="height1">
													<span>{{item.sex}}</span>
													<span>{{item.age}}</span>
													<span>{{item.workYears}}年</span>
													<span>{{item.education}}</span>
												</div>
													
											</div>
											<div class="limitRight">
												<div class="colorNone">{{item.jobPost}}</div>
												<div class="size">
													{{item.graduatedUniversity}}
												</div>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="copy"></div>
		</div>
	</div>
</template>

<script>
	import { getCompany,jobList,employUserList } from '@/api/company'
	import tops from '../../components/top.vue'
	export default{
		components: {
			tops
		},
		data(){
			return{
				logoName: require('../../assets/logoName.png'),
				man: require('../../assets/man.png'),
				famle: require('../../assets/famle.png'),
				showMeun:false,
				companyInfo:{},
				curPage:1,
				curLimit:20,
				curPage2:1,
				curLimit2:20,
				jobListInfo:[],
				rightList:[],
				workIndex:0
			}
		}, 
		created(){
			this.getCompanyInfo()
			this.getJobList()
			
		},
		mounted(){
			
		},
		methods: {
			getCompanyInfo(){
				getCompany().then(res=>{
					if(res.success){
						this.companyInfo = res.data
						console.log(this.companyInfo)
						sessionStorage.setItem('companyId', res.data.id);
						sessionStorage.setItem('companyInfo', res.data);
						this.$store.commit("companyInfo",sessionStorage.getItem('companyId'))
					}else{
						this.$Message['error']({
							background: true,
							content: res.msg
						});
					}
					
				})
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
						this.jobListInfo=arr.splice(0,3)
						this.getEmployList()
					}else{
						this.$Message['error']({
							background: true,
							content: res.msg
						});
					}
				})
			},
			getEmployList(){
				if(this.jobListInfo.length>0){
					employUserList(
					{
						id:this.jobListInfo[this.workIndex].id
					},
					{
						page:this.curPage2,
						limit:this.curLimit2
					}).then(res=>{
						if(res.success){
							console.log(res)
							if(res.data.rows&&res.data.rows.length>0){
								let arr=res.data.rows;
								for(let i=0;i<arr.length;i++){
									arr[i].showdo=true
								}
								console.log(arr)
								this.rightList=arr
							}
						}else{
							this.$Message['error']({
								background: true,
								content: res.msg
							});
						}
					})
				}
				
			},
			toEditInfo(){
				this.$router.push({
					path:"/writeinfo"
				})
			},
			toInvite() {
				this.$router.push({
					path: '/invite',
					
				});
			},
			toInviteManger(){
				this.$router.push({
					path:'/invitemanger'
				})
			},
			toWriteInfo(status){
				// if (status==0) {
					this.$router.push({
						path:"/writeinfo"
					})
				// } else{
					// this.$Message.warning("你已认证！")
				// }
			},
			toCooperate(){
				this.$router.push({
					path:"/cooperate"
				})
			},
			toResources(){
				this.$router.push({
					path:"/resources"
				})
			},
			toSetting(){
				this.$router.push({
					path:"/setting"
				})
			},
		},
	}
</script>

<style scoped>
	li{
		list-style: none;
	}
	
	
	.indexBox{
		background-color: #F2F2F2;
		padding-bottom: 30px;
	}
	
	.body{
		width: 90%;
		margin: 0 auto;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}
	.bodyLeft{
		padding: 0 30px;
		padding-top: 50px;
		display: inline-block;
		width: 25%;
		min-width: 260px;
		height: 700px;
		background-color: #fff;
		box-sizing: border-box;
		border-radius: 4px;
	}
	
	.bodyRight{
		width: 73%;
	}
	.comIconBox .comimg{
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin: 0 auto;
	}
	.comimg img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.comIconBox .comname{
		text-align: center !important;
		font-size: 16px;
		color: rgba(53,53,53,1);
		padding: 20px 0;
		margin-bottom: 20px;
		border-bottom: 1px solid #F2F2F2;
	}
	.infoList{
		font-size: 14px !important;
		display: flex;
		margin-bottom: 8px;
		justify-content: space-between;
	}
	.infoList div:first-of-type{
		color: #888888;
		font-size: 14px;
	}
	.infoList div:last-of-type{
		font-size: 14px;
	}	
	.infos div:first-of-type{
		color: #888888;
		font-size: 14px;
	}
	.infos div:last-of-type{
		font-size: 14px;
		text-indent: 28px;
		padding-bottom: 60px;
		border-bottom: 1px solid #F2F2F2;
		text-align: justify;
	}
	.comfirm{
		margin-top: 20px;
		margin-bottom: 10px;
	}
	.imgList{
		display: flex;
		justify-content: space-between;
		
	}
	.imgList div{
		width: 40px;
		height: 40px;
		border-radius: 4px;
		background-color: cadetblue;
	}
	.submitbox{
		text-align: center;
	}
	.submit{
		width: 140px;
		height: 40px;
		margin: auto;
		line-height: 40px;
		text-align: center;
		margin-top: 30px;
		margin-bottom: 16px;
		color: #fff;
		font-size: 14px;
		border-radius: 20px;
		display: inline-block;
		cursor: pointer;
		background: linear-gradient(to right, #138dee 0%, #a4c9fd 100%);
	}
		
	.showImg{
		width: 100%;
		height: auto;
		min-height: 300px;
		margin: 0 auto;
		margin-bottom: 20px;
	}
	.showImg img{
		width: 100%;
		height: 100%;
	}
	.innerBox{
		min-height: 900px;
	}
	/* 发布 */
	.detailsBox{
		display: flex;
		justify-content: space-between;
	}
	.detailsBox >div{
		width: 49%;
		padding: 30px 20px;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 4px;
		margin-bottom: 20px;
	}
	.sendTop{
		display: flex;
		justify-content: space-between;
		font-size: 16px;
		margin-bottom: 20px;
		cursor: pointer;
	}
	.sendTop >div:first-of-type{
		font-weight: bold;
		color: #353535;
	}
	.sendTop >div:last-of-type{
		font-size: 14px;
		color: #4EA3FF;
	}
	.workItem li{
		margin-bottom: 10px;
		border-radius: 6px;
		background-color: #F7F9FC;
		border-radius: 4px;
		padding: 20px 15px;
		box-sizing: border-box;
		height: auto;
	}
	.workItem li:last-of-type{
		margin-bottom: 0;
	}
	
	.workContent >div{
		display: flex;
		justify-content: space-between;
	}
	.worktit{
		margin-bottom: 10px;
	}
	.worktit >div:first-of-type{
		font-weight: bold;
	}
	.limit{
		text-align: right;
	}
	.limit >div:first-of-type{
		color: #FF753B;
	}
	.limit >div:last-of-type span{
		color: #666666;
		font-size: 12px;
		margin-top: 10px;
		padding-left: 10px;
		margin-left: 10px;
		border-left: 1px solid #CAD3E1;
	}
	.limit >div span:first-of-type{
		padding-left: 0px;
		margin-left: 0px;
		border: none;
	}
	/* 右边 */
	.workContentRight{
		display: flex;
		justify-content: space-between;
	}
	.rightBox{
		width: 100%;
	}
	.worktitright,.limitRight{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.touxiang{
		
	}
	.touxiang img{
		width: 50px;
		height: 50px;
		border-radius: 4px;
		margin-right: 10px;
	}
	.worktitright{
		display: flex;
		
	}
	.bold{
		font-weight: bold;
	}
	.colorNone{
		font-size: 14px;
	}
	
	.height1 span{
		color: #666666;
		font-size: 12px;
		margin-top: 10px;
		padding-left: 10px;
		margin-left: 10px;
		border-left: 1px solid #CAD3E1;
	}
	.height1 span:first-of-type{
		padding-left: 0px;
		margin-left: 0px;
		border: none;
	}
	.size{
		font-size: 12px;
	}
	.ivu-dropdown-rel a{
		width: 100%;
		display: inline-block;
	}
	
	@media (min-width:1080px) and (max-width:1200px){
		.body{
			width: 95%;
		}
		.bodyLeft{
			padding: 0 20px;
			padding-top: 50px;
			width: 25%;
			min-width: 260px;
			height: 700px;
		}
		
		.bodyRight{
			width: 73%;
		}
		.detailsBox{
			display: block;
			width: 100%;
		}
		.detailsBox >div{
			width: 100%;
		}
	}
	@media (max-width:1080px){
		
		.body{
			width: 95%;
			display: block;
		}
		.comIconBox{
			display: flex;
			justify-content: space-between;
			width: 100%;
		}
		.bodyLeft{
			width: 100%;
			padding-right: 20px;
			padding-left: 20px;
			height: auto;
			margin-bottom: 30px;
			display: flex;
			justify-content: space-between;
		}
		
		.bodyRight{
			width: 100%;
		}
		.item1{
			width: 30%;
		}
		.item2{
			width: 40%;
			padding: 0 30px;
			box-sizing: border-box;
		}
		.item3{
			width: 30%;
		}
		.infoList{
			justify-content: initial;
		}
		.infos div:last-of-type,.comIconBox .comname{
			border-bottom: none;
			margin-bottom: 0;
		}
		.detailsBox{
			display: block;
			width: 100%;
		}
		.detailsBox >div{
			width: 100%;
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
			position: absolute;
			right: 0px;
			top: 0;
			bottom: 0;
			margin: auto 0;
			width: 60px;
			height: 40px;
			display: block;
			background-color: coral;
		}
		.minMeun{
			position: absolute;
			width: 200px;
			background-color: #F2F2F2;
			border-radius: 8px;
			right: 0;
			top: 50px;
			line-height: 45px;
			display: inline-block;
		}
		.meunBtn{
			line-height: normal;
		}
	}
</style>

<template>
	<div class="inviteManger">
		<div class="invimangerBox">
			<tops name="collect"></tops>
			<div class="settingTop">
				<div v-for="(item,index) in arrmeun" :class="{childerMeunActive: index==childerMeunIndex}" @click="changeIndex(index)" :key="index" >{{item}}</div>
			</div>
			<div class="invimangerMain">
				<div class="inviteTop">
					<div class="addBtn">收藏列表</div>
				</div>
				<div class="resourcesItem" v-for="(item,index) in collectInfo" :key="index">
					<div class="resourceLeft">
						<div class="headerInfo">
							<div class="info1">
								姓名：<span class="name">{{item.name}}</span>
							</div>
							<div class="info1">
								性别：<span>{{item.sex}}</span>
							</div>
							<div>
								电话：<span>{{item.phone}}</span>
							</div>
							<div class="info2">
								出生日期：<span>{{item.birthday?item.birthday.split(" ")[0]:""}}</span>
								<span>{{item.education}}</span>
							</div>
							<div>
								地址：<span>{{item.address}}</span>
							</div>
							<div>
								邮箱：<span>{{item.email}}</span>
							</div>
						</div>
					</div>
					<div class="resourceCenter">
						<div>学校：{{item.graduatedUniversity}}</div>
						<div>学历：{{item.highestEducational}}</div>
						<div>城市：{{item.liveCity}} </div>
						<div>城市：{{item.wechatNumber}} </div>
									
					</div>
					
				</div>
			</div>
		</div>
		
	</div>
	
</template>

<script>
	import tops from '../../components/top.vue'
	import { collectList } from '@/api/company'

	export default{
		components: {
			tops,
		},
		data() {
			return {
				collectInfo:[],
				arrmeun:['职位发布','应聘管理','我的收藏'],
				childerMeunIndex:2,
			}
		},
		created(){
			this.getCollect()
		},
		methods: {
			getCollect() {
				collectList({
					page:this.collectPage,
					limit:this.collectLimit
				}).then(res=>{
					if(res.success){
						console.log(res)
						this.collectInfo=res.data.rows
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
			backup(){
				this.$router.go(-1)
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
	.inviteManger{
		min-height: 1000px;
		background-color: #F2F2F2;
		padding-bottom: 50px;
		box-sizing: border-box;
	}
	.resumecollect {
		height: 100%;
		background-color: #F2F2F2;
		min-height: 1000px;
		padding-top: 50px;
		padding-bottom: 50px;
	}
	.invimangerMain{
		width: 80%;
		margin: 0 auto;
		border-radius: 10px;
		background-color: #F2F2F2;
	}
	.Top{
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
	.resourcesItem{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20px 30px;
			margin-bottom: 10px;
			background-color: #fff;
			position: relative;
		}
		
		.resourceLeft{
			display: flex;
			align-items: flex-start;
		}
		.header{
			padding-right: 5%;
			box-sizing: border-box;
			text-align: center;
			min-width: 100px;
		}
		
		.imgBox{
			width: 80px;
			height: 80px;
			border-radius: 50%;
			margin-bottom: 10px;
			position: relative;
		}
		.imgBox img{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		.gender{
			position: absolute;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			top: -6px;
			right: -6px;
			background-color: cadetblue;
		}
		.money{
			display: inline-block;
			padding: 3px 10px;
			font-size: 16px;
			border-radius: 6px;
			background-color: #FF673D;
			color: #fff;
		}
		.headerInfo{
			color: #353535;
		}
		.headerInfo >div{
			margin-bottom: 5px;
		}
		.info1 .name{
			padding-right: 15px;
		}
		.info1 .statusTimer{
			color: grey;
		}
		.info2 span{
			padding-right: 10px;
			margin-right: 10px;
		}
		.info2 span:last-of-type{
			padding-right: 0;
			margin-right: 0;
			border-right: none;
		}
		.info3 span{
			padding-right: 12px;
			color: grey;
		}
		.info3 span:last-of-type{
			padding-right: 0;
		}
		.info4 span{
			padding-right: 12px;
		}
		.info4 span:first-of-type{
			color: grey;
		}
		
		.resourceRight .lookBtn{
			display: inline-block;
			min-width: 90px;
			text-align: center;
			height: 35px;
			line-height: 35px;
			background-color: #62D4C9;
			border-radius: 6px;
			color: #fff;
			cursor: pointer;
		}
		.lookBtn span{
			margin-right: 10px;
		}
		.resourceLeft{
			width: 40%;
		}
		.resourceCenter{
			padding-left: 20px;
			box-sizing: border-box;
			width: 42%;
			position: relative;
		}
		.grade{
			display: flex;
			align-items: center;
		}
		.scoreOne{
			margin-right: 10px;
		}
		.scoreNum{
			min-width: 60px;
			display: inline-block;
		}
		.inputScore{
			border-radius: 4px;
			outline: none;
			border: 1px solid #dcdee2 ;
			color: #515a6e;
			padding: 3px 7px;
			width: 150px;
			
		}
		.resourceRight{
			width: 18%;
			text-align: right;
		}
</style>

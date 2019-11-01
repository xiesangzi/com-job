<template>
	<div class="resources">
		<tops :content="{title:'人才资源'}"></tops>
	
		<!-- <div class="resourcesBox">
			<div class="resourcesItem" v-for="(item,index) in employInfoList" :key="index">
				<div class="resourceLeft">
					<div class="header">
						<div class="imgBox">
							<img src="../../assets/logo.png" />
							<div class="gender">{{item.sex}}</div>
							<div class="gender"></div>
						</div>
						<div class="money">8-12k</div>
					</div>
					<div class="headerInfo">
						<div class="info1">
							<span class="name">{{item.crtUserName}}</span>
							<span class="statusTimer">刚刚活跃</span>
						</div>
						<div class="info2">
							<span>{{item.workYears}}年</span>
							<span>{{item.education}}</span>
							<span>在职-月内到岗</span>
						</div>
						<div class="info3">
							<span>求职期望</span>
							<span>{{item.city}}</span>
							<span>{{item.jobPost}}</span>
						</div>
						
					</div>
				</div>
				<div class="resourceRight">
					<div class="lookBtn">查看简历</div>
				</div>
			</div>
			
			
			<div class="resourcesItem">
				<div class="resourceLeft">
					<div class="header">
						<div class="imgBox">
							<img src="../../assets/logo.png" />
							<div class="gender"></div>
							<div class="gender"></div>
						</div>
						<div class="money">8-12k</div>
					</div>
					<div class="headerInfo">
						<div class="info1">
							<span class="name">王某</span>
							<span class="statusTimer">刚刚活跃</span>
						</div>
						<div class="info2">
							<span>4年</span>
							<span>本科</span>
							<span>在职-月内到岗</span>
						</div>
						<div class="info3">
							<span>求职期望</span>
							<span>贵阳</span>
							<span>产品经理</span>
						</div>
						<div class="info4">
							<span>现任</span>
							<span>某某公司-XX职位</span>
						</div>
					</div>
				</div>
				<div class="resourceCenter">
					<div class="centerItem">
						<div class="centerTime">2017-03-至今</div>
						<div class="timerDo">贵州紫光-产品经理</div>
					</div>
					<div class="centerItem">
						<div class="centerTime">2017-03-至今</div>
						<div class="timerDo">贵州紫光-产品经理</div>
					</div>
					<div class="centerItem">
						<div class="centerTime">2015-03-2018-08</div>
						<div class="timerDo">贵州紫光-产品经理</div>
					</div>
					<div class="line"></div>
					<div class="startBall"></div>
					<div class="endBall"></div>
				</div>
				<div class="resourceRight">
					<div class="lookBtn">查看简历</div>
				</div>
			</div>
			<div class="resourcesItem">
				
				<div class="resourceLeft">
					<div class="header">
						<div class="imgBox">
							<img src="../../assets/logo.png" />
							<div class="gender"></div>
							<div class="gender"></div>
						</div>
						<div class="money">8-12k</div>
					</div>
					<div class="headerInfo">
						<div class="info1">
							<span class="name">王某</span>
							<span class="statusTimer">刚刚活跃</span>
						</div>
						<div class="info2">
							<span>4年</span>
							<span>本科</span>
							<span>在职-月内到岗</span>
						</div>
						<div class="info3">
							<span>求职期望</span>
							<span>贵阳</span>
							<span>产品经理</span>
						</div>
						<div class="info4">
							<span>现任</span>
							<span>某某公司-XX职位</span>
						</div>
					</div>
				</div>
				<div class="resourceCenter">
					<div class="centerItem">
						<div class="centerTime">2017-03-至今</div>
						<div class="timerDo">贵州紫光-产品经理</div>
					</div>
					
					
					<div class="line"></div>
					<div class="start">
						<div class="startBall"></div>
					</div>
					<div class="end">
						<div class="endBall"></div>
					</div>
				</div>
				<div class="resourceRight">
					<div class="lookBtn">查看简历</div>
				</div>
			</div>
		</div> -->
	</div>
</template>

<script>
	import { employList } from '@/api/company'
	import tops from '../../components/top.vue'
	export default{
		components: {
			tops
		},
		// data() {
		// 	return {
		// 		curPage:1,
		// 		curLimit:20,
		// 		employInfoList:[]
		// 	}
		// },
		// created(){
		// 	this.getEmployList()
		// },
		// methods: {
		// 	getEmployList(){
		// 		employList({
		// 			page:this.curPage,
		// 			limit:this.curLimit
		// 		}).then(res=>{
		// 			if(res.success){
		// 				console.log(res)
		// 				if(res.data.rows&&res.data.rows.length>0){
		// 					this.employInfoList=res.data.rows
		// 				}
		// 				
		// 			}else{
		// 				this.$Message['error']({
		// 					background: true,
		// 					content: res.msg
		// 				});
		// 			}
		// 		})
		// 	}
		// },
	}
</script>

<style scoped>
	.resources{
		background-color: #F2F2F2;
		min-height: 1000px;
	}
	/* 
	.resourcesBox{
		width: 90%;
		margin: 0 auto;
		
	}
	
	.resourcesItem{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 30px;
		margin-bottom: 10px;
		background-color: #fff;
		border-radius: 10px;
		position: relative;
	}
	.resourcesItem:hover{
		background-color: #F5F6FA;
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
		border-right: 1px solid grey;
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
	.centerItem{
		display: flex;
		align-items: center;
	}
	.centerItem .centerTime{
		color: grey;
		padding-right: 3%;
		width: 40%;
		min-width: 166px;
		box-sizing: border-box;
	}
	.line{
		position: absolute;
		height:100%;
		width: 1px;
		background-color: #62D4C9;
		top: 0;
		bottom: 0;
		left: 0;
		margin: auto 0;
	}
	
	.startBall,.endBall{
		position: absolute;
		width: 15px;
		height: 15px;
		background-color: #62D4C9;
		border-radius: 50%;
		left: -7.5px;
	}
	.startBall{
		top: 0px;
	}
	.endBall{
		bottom: 0px;
	}
	.remove{
		position: absolute;
		width: 50px;
		height: 30px;
		line-height: 30px;
		color: #353535;
		text-align: center;
		top: 0;
		right: 20px;
		z-index: 10;
	}
	.resourceRight .lookBtn{
		display: inline-block;
		min-width: 120px;
		text-align: center;
		height: 45px;
		line-height: 45px;
		background-color: #62D4C9;
		border-radius: 6px;
		color: #fff;
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
	.resourceRight{
		width: 18%;
		text-align: right;
	}
	*/
	
</style>

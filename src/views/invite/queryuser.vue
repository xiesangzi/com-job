<template>
	<div class="inviteManger">
		<div class="invimangerBox">
			<tops :content="{title:'应聘管理'}"></tops>
			<div class="invimangerMain">
				<div class="Top">
					
					<div class="rightBtn">
						<Button  @click="backe()">返回</Button>
					</div>
				</div>
				<div class="resourcesItem" v-for="(item,index) in employInfoList" :key="index">
					<div class="resourceLeft">
						<div class="headerInfo">
							<div class="info1">
								<span class="name">{{item.crtUserName}}</span>
							</div>
							<div class="info1">
								<span class="name">{{item.sex}}</span>
								<span>{{item.age}}</span>
							</div>
							<div class="info2">
								<span>{{item.workYears}}年</span>
								<span>{{item.education}}</span>
							</div>
							<div class="info3">
								<span>求职期望</span>
								<span>{{item.city}}</span>
								<span>{{item.jobPost}}</span>
							</div>
						</div>
					</div>
					<div class="resourceCenter">
						<div class="grade">
							<div class="scoreOne">
								<span>分数：</span>
								<span class="scoreNum" v-show="item.showdo">{{item.resumeScore}}</span>
								<custom-input  v-show="!item.showdo" v-model="formValue.score"></custom-input>
							</div>
							<Button v-show="item.showdo" type="info"  @click="doScore(item.resumeScore,index)">评分</Button>
							<Button v-show="!item.showdo" type="info"  @click="setScore(item.id)">确定</Button>
						</div>
						
					</div>
					<div class="resourceRight">
						<div class="lookBtn" @click="docollect(item.storeId,item.tag)">
							<span>收藏</span>
							<Icon type="md-heart-outline" v-show="item.tag==0"/>
							<Icon type="md-heart"  v-show="item.tag==1"/>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script> 
	import tops from '../../components/top.vue'
	import { employUserList,resumeScore,resumecollect,collectList } from '@/api/company'

export default {
	
	components: {
		tops,
		'custom-input':{
			props: ['value'],
			template: `
			<input
				class="inputScore"
				type="number" placeholder="请评分"
				v-bind:value="value"
				v-on:input="$emit('input', $event.target.value)"
			>
			`
		}
	},
	data() {
		return {
			popbgShow:false,
			popContShow:false,
			curPage:1,
			curLimit:20,
			collectPage:1,
			collectLimit:20,
			employInfoList:[],
			scoreStatus:true,
			formValue:{
				score:''
			},
		}
	},
	created(){
		
		
	},
	mounted(){
		this.getEmployList()
	},
	methods: {
		getEmployList(){
			employUserList(
			{
				id:this.$route.query.id
			},
			{
				page:this.curPage,
				limit:this.curLimit
			}).then(res=>{
				if(res.success){
					console.log(res)
					if(res.data.rows&&res.data.rows.length>0){
						let arr=res.data.rows;
						for(let i=0;i<arr.length;i++){
							arr[i].showdo=true
						}
						console.log(arr)
						this.employInfoList=arr
					}
				}else{
					this.$Message['error']({
						background: true,
						content: res.msg
					});
				}
			})
		},
		doScore(score,index){
			// this.scoreStatus=false
			let arr=this.employInfoList;
			for(let i=0;i<arr.length;i++){
				if(index==i){
					this.employInfoList[i].showdo=false
				}else{
					this.employInfoList[i].showdo=true
				}
			}
			let newScore=0;
			if(score!==''){
				newScore=parseFloat(score)
			}
			this.formValue.score=newScore
		},
		setScore(id){
			console.log()
			this.formValue.score=parseFloat(this.formValue.score)
			if (this.formValue.score>=0) {
				
				resumeScore({id:id},this.formValue).then(res=>{
					if(res.success){
						console.log(res)
						this.$Message.success('打分成功');
						this.getEmployList()
					}else{
						this.$Message['error']({
							background: true,
							content: res.msg
						});
					}
				})
			}else{
				this.$Message.error("请填写有效分数")
			}
		},
		docollect(id,tag){
			console.log("当前简历id:",id)
			resumecollect({id:id}).then(res=>{
				if(res.success){
					console.log(res)
					if (tag==0) {
						this.$Message.success('收藏成功');
					} else if(tag==1){
						this.$Message.success('取消成功');
					}
					this.getEmployList()
				}else{
					this.$Message['error']({
						background: true,
						content: res.msg
					});
				}
			})
		},
		
		closePop(){
			this.popbgShow=false;
			this.popContShow=false;
		},
		backe(){
			this.$router.go(-1)
		}
		
	},
};
</script>

<style scoped>
.collectBox{
	width: 60%;
	min-width: 450px;
	position: fixed;
	height: 500px;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
	overflow: auto;
	background-color: #F7F9FC;
	border: 10px;
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
.inviteManger {
	height: 100%;
	background-color: #F2F2F2;
	min-height: 1000px;
	padding-bottom: 50px;
}
.invimangerMain{
	width: 80%;
	margin: 0 auto;
	border-radius: 10px;
	background-color: #F2F2F2;
}
.Top{
	text-align: right;
	height: 60px;
	line-height: 60px;
	background-color:  #F7F9FC;
	padding: 0 20px;
	box-sizing: border-box;
	margin-bottom: 0px;
	display: flex;
	justify-content: space-between;
	align-items: center;
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
	/* .doScore{
		width: 80px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		background-color: ;
	} */
	.resourceRight{
		width: 18%;
		text-align: right;
	}
</style>
